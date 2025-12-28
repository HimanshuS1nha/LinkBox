import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { user as userTable } from "@/db/auth-schema";

export const updateUser = async (
  {
    description,
    image,
    name,
  }: {
    description?: string;
    image?: string;
    name?: string;
  },
  userId: string
) => {
  if (!description && !name && !image) {
    return;
  }

  await db
    .update(userTable)
    .set({ description, name, image })
    .where(eq(userTable.id, userId));
};
