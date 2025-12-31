import "server-only";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import z from "zod";
import { TRPCError } from "@trpc/server";

import { tryCatch } from "@/helpers/try-catch";
import { getCountry } from "@/helpers/get-country";

import * as AnalyticsDal from "@/dal/analytics-dal";
import * as LinkDal from "@/dal/link-dal";

import { createTRPCRouter, baseProcedure, protectedProcedure } from "../init";

export const analyticsRouter = createTRPCRouter({
  recordVisit: baseProcedure
    .input(
      z.object({
        userId: z.string({ error: "User ID is required" }),
      })
    )
    .mutation(async (opts) => {
      const reqHeaders = await headers();

      const { browser, os } = userAgent({ headers: reqHeaders });

      const country = await getCountry(reqHeaders);

      const [createError] = await tryCatch(
        AnalyticsDal.recordVisit(
          {
            browser: browser.name ?? "Unknown",
            os: os.name ?? "Unknown",
            country,
          },
          opts.input.userId
        )
      );
      if (createError) {
        console.error(createError);
        // No need to show any errors to the user
      }

      return { message: "Visit recorded" };
    }),
  recordClick: baseProcedure
    .input(
      z.object({
        linkId: z.string({ error: "Link ID is required" }),
      })
    )
    .mutation(async (opts) => {
      const reqHeaders = await headers();
      const { browser, os } = userAgent({ headers: reqHeaders });

      const country = await getCountry(reqHeaders);

      const [createError] = await tryCatch(
        AnalyticsDal.recordClick(
          {
            browser: browser.name ?? "Unknown",
            os: os.name ?? "Unknown",
            country,
          },
          opts.input.linkId
        )
      );
      if (createError) {
        console.error(createError);
        // No need to show any errors to the user
      }

      return { message: "Click recorded" };
    }),
  getAnalyticsForMonthForUser: protectedProcedure.query(async (opts) => {
    const [error, data] = await tryCatch(
      Promise.all([
        AnalyticsDal.getAnalyticsForMonthForProfile(opts.ctx.user.id),
        AnalyticsDal.getCountryWiseVisitsForMonthForProfile(opts.ctx.user.id),
        AnalyticsDal.getBrowserWiseVisitsForMonthForProfile(opts.ctx.user.id),
        AnalyticsDal.getOsWiseVisitsForMonthForProfile(opts.ctx.user.id),
        AnalyticsDal.getLinkWiseDataForMonthForProfile(opts.ctx.user.id),
      ])
    );
    if (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error occurred while fetching your analytics",
      });
    }

    return data;
  }),
  getAnalyticsForMonthForLink: protectedProcedure
    .input(
      z.object({
        linkId: z.string({ error: "Link is required" }),
      })
    )
    .query(async (opts) => {
      // Checking that the link belongs to the user
      const [selectError, link] = await tryCatch(
        LinkDal.getLinkByUserIdAndLinkId(opts.ctx.user.id, opts.input.linkId)
      );
      if (selectError) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      if (!link) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [error, data] = await tryCatch(
        Promise.all([
          AnalyticsDal.getAnalyticsForMonthForLink(opts.input.linkId),
          AnalyticsDal.getCountryWiseVisitsForMonthForLink(opts.input.linkId),
          AnalyticsDal.getBrowserWiseVisitsForMonthForLink(opts.input.linkId),
          AnalyticsDal.getOsWiseVisitsForMonthForLink(opts.input.linkId),
        ])
      );
      if (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error occurred while fetching your analytics",
        });
      }

      return data;
    }),
});
