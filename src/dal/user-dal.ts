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

export const getUser = async (userId: string) => {
  const user = await db
    .select({
      name: userTable.name,
      id: userTable.id,
      image: userTable.image,
      description: userTable.description,
    })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);

  return user.length > 0 ? user[0] : null;
};
