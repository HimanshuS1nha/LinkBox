import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { subscription as subscriptionTable } from "@/db/auth-schema";

export const getCurrentlyActiveSubscriptionForUser = async (userId: string) => {
  const subscriptions = await db
    .select({
      name: subscriptionTable.plan,
      status: subscriptionTable.status,
    })
    .from(subscriptionTable)
    .where(eq(subscriptionTable.referenceId, userId));

  if (subscriptions.length === 0) {
    return null;
  }

  const activeSubscription = subscriptions.find(
    (subcription) =>
      subcription.status === "active" || subcription.status === "trailing"
  );

  return activeSubscription?.name ?? null;
};
