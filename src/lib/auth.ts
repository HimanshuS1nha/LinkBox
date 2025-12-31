import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";

import { db } from "@/lib/db";

import * as schema from "@/db/schema";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Latest API version as of Stripe SDK v20.0.0
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      description: {
        type: "string",
        required: false,
        fieldName: "description",
      },
    },
  },
  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "Basic",
            limits: {
              links: 5,
            },
            priceId: "price_1SgjaASGlVMbt46QisblRCu5",
          },
          {
            name: "Pro",
            limits: {
              links: 10,
            },
            priceId: "price_1SgjanSGlVMbt46QIfZ8Nqqx",
          },
        ],
      },
    }),
  ],
});
