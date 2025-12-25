import {
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { user } from "./auth-schema";

export const linkTable = mysqlTable(
  "link",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(crypto.randomUUID),
    title: varchar("title", { length: 255 }).notNull(),
    link: varchar("link", { length: 255 }).notNull(),
    icon: mysqlEnum([
      "instagram",
      "facebook",
      "twitter",
      "linkedin",
      "other",
    ]).notNull(),
    isEnabled: boolean("is_enabled").notNull(),
    order: int("order").notNull(),
    userId: varchar("user_id", { length: 36 })
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => {
    return {
      titleIndex: index("title_index").on(t.title),
      uniqueUserTitle: unique("user_title_unique").on(t.userId, t.title),
    };
  }
);
