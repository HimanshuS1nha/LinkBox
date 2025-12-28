import "server-only";

import z from "zod";
import { TRPCError } from "@trpc/server";

import { tryCatch } from "@/helpers/try-catch";

import * as LinkDal from "@/dal/link-dal";
import * as UserDal from "@/dal/user-dal";

import { createTRPCRouter, protectedProcedure } from "../init";

export const linkRouter = createTRPCRouter({
  createOrUpdateLinks: protectedProcedure
    .input(
      z.object({
        links: z.array(
          z.object({
            link: z
              .url({ error: "Link is required and must be a valid URL" })
              .trim()
              .min(1, { error: "Link is required and must be a valid URL" }),
            title: z
              .string({ error: "Title is required" })
              .trim()
              .min(1, { error: "Title is required" }),
            icon: z.enum(
              ["instagram", "linkedin", "facebook", "twitter", "other"],
              { error: "Please select an icon" }
            ),
            isEnabled: z.boolean({ error: "isEnabled property is required" }),
            id: z.string().optional(),
          })
        ),
        userDetails: z.object({
          name: z.string({ error: "Name is required" }).optional(),
          image: z.string({ error: "Image is required" }).optional(),
          description: z
            .string({ error: "Description is required" })
            .optional(),
        }),
      })
    )
    .query(async (opts) => {
      const [dbError] = await tryCatch(
        Promise.all([
          LinkDal.createOrUpdateLinks(opts.input.links, opts.ctx.user.id),
          UserDal.updateUser(opts.input.userDetails, opts.ctx.user.id),
        ])
      );
      if (dbError) {
        console.error(dbError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error occurred while creating/updating links",
        });
      }

      return { message: "Links added/updated successfully" };
    }),
});
