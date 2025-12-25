import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const newsletterSubscribersTable = mysqlTable("newsletter_subscribers", {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
  email: varchar({ length: 255 }).unique().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
