import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const userQueryTable = mysqlTable("user_query", {
  id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }).notNull(),
  status: mysqlEnum(["pending", "resolved"]).notNull().default("pending"),
  createdAt: timestamp().notNull().defaultNow(),
});
