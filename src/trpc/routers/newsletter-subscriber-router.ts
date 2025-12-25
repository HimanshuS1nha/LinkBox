import z from "zod";
import { TRPCError } from "@trpc/server";

import { tryCatch } from "@/helpers/try-catch";

import * as NewsletterSubscribersDal from "@/dal/newsletter-subscribers-dal";

import { baseProcedure, createTRPCRouter } from "../init";

export const newsletterSubscribersRouter = createTRPCRouter({
  addSubscriber: baseProcedure
    .input(
      z.object({
        email: z.email({
          error: "Email is required and should be in proper format",
        }),
      })
    )
    .mutation(async (opts) => {
      const [createError] = await tryCatch(
        NewsletterSubscribersDal.addSubscriber(opts.input.email)
      );
      if (createError) {
        console.error(createError);

        if (createError.cause === 409) {
          throw new TRPCError({
            code: "CONFLICT",
            message: createError.message,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error occured while subscribing to the newsletter",
        });
      }

      return { message: "Subscribed successfully" };
    }),
});
