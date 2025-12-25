import {
  timestamp,
  mysqlTable,
  varchar,
  index,
  mysqlEnum,
  check,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

import { linkTable } from "./link-schema";
import { user } from "./auth-schema";

export const analyticsTable = mysqlTable(
  "analytics",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(crypto.randomUUID),
    linkId: varchar("link_id", { length: 36 }).references(() => linkTable.id, {
      onDelete: "cascade",
    }),
    userId: varchar("user_id", { length: 36 }).references(() => user.id, {
      onDelete: "cascade",
    }),
    type: mysqlEnum("type", ["visit", "click"]).notNull(),
    country: varchar("country", { length: 255 }).notNull(),
    os: varchar("os", { length: 255 }).notNull(),
    browser: varchar("browser", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => {
    return {
      linkIndex: index("link_index").on(t.linkId),
      userIndex: index("user_index").on(t.userId),
      countryIndex: index("country_index").on(t.country),
      osIndex: index("os_index").on(t.os),
      browserIndex: index("browser_index").on(t.browser),
      typeCreatedIndex: index("type_created_index").on(t.type, t.createdAt),
      linkCreatedIndex: index("link_created_index").on(t.linkId, t.createdAt),
      userCreatedIndex: index("user_created_index").on(t.userId, t.createdAt),
      typeUserLinkCheck: check(
        "type_userid_linkid_check",
        sql`(type = 'visit' AND user_id IS NOT NULL AND link_id IS NULL)
  OR
  (type = 'click' AND link_id IS NOT NULL AND user_id IS NULL)` // User who are not logged in can also click the link, so making it null only
      ),
    };
  }
);
