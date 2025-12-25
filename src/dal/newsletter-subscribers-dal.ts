import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { newsletterSubscribersTable } from "@/db/newsletter-subscribers-schema";

export const addSubscriber = async (email: string) => {
  const subscriber = await db
    .select()
    .from(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.email, email));
  if (subscriber.length !== 0) {
    throw new Error("Email is already subscribed to our newsletter", {
      cause: 409,
    });
  }

  await db.insert(newsletterSubscribersTable).values({ email });
};
