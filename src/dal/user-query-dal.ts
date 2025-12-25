import "server-only";

import { db } from "@/lib/db";

import { userQueryTable } from "@/db/user-query-schema";

export const createUserQuery = async ({
  email,
  message,
  name,
  subject,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  await db.insert(userQueryTable).values({
    email,
    message,
    name,
    subject,
  });
};
