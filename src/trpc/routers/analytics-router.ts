import "server-only";

import { headers } from "next/headers";
import { userAgent } from "next/server";
import z from "zod";

import { tryCatch } from "@/helpers/try-catch";
import { getCountry } from "@/helpers/get-country";

import * as AnalyticsDal from "@/dal/analytics-dal";

import { createTRPCRouter, baseProcedure } from "../init";

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
});
