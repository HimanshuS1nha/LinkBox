import z from "zod";
import { TRPCError } from "@trpc/server";

import { tryCatch } from "@/helpers/try-catch";

import * as UserQueryDal from "@/dal/user-query-dal";

import { baseProcedure, createTRPCRouter } from "../init";

export const userQueryRouter = createTRPCRouter({
  createUserQuery: baseProcedure
    .input(
      z.object({
        message: z.string({ error: "Message is required" }),
        name: z.string({ error: "Name is required" }),
        subject: z.string({ error: "Subject is required" }),
        email: z.email({ error: "Email is required" }),
      })
    )
    .mutation(async (opts) => {
      const [createError] = await tryCatch(
        UserQueryDal.createUserQuery(opts.input)
      );
      if (createError) {
        console.error(createError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error occurred while submitting your query",
        });
      }

      return { message: "Form submitted successfully" };
    }),
});
