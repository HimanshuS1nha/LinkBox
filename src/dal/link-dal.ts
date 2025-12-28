import "server-only";

import { and, eq, notInArray } from "drizzle-orm";

import { db } from "@/lib/db";

import { linkTable } from "@/db/link-schema";

export const createOrUpdateLinks = async (
  links: {
    link: string;
    title: string;
    icon: "instagram" | "twitter" | "facebook" | "linkedin" | "other";
    id?: string;
    isEnabled: boolean;
  }[],
  userId: string
) => {
  await db.transaction(async (tx) => {
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      if (link.id) {
        await tx
          .update(linkTable)
          .set({
            link: link.link,
            title: link.title,
            icon: link.icon,
            isEnabled: link.isEnabled,
            order: i,
          })
          .where(eq(linkTable.id, link.id));
      } else {
        const [{ id }] = await tx
          .insert(linkTable)
          .values({
            link: link.link,
            title: link.title,
            icon: link.icon,
            userId,
            isEnabled: link.isEnabled,
            order: i,
          })
          .$returningId();

        links = links.map((item) => {
          if (item.title === link.title) {
            return {
              ...item,
              id,
            };
          } else {
            return item;
          }
        });
      }
    }
  });

  await db.delete(linkTable).where(
    and(
      eq(linkTable.userId, userId),
      notInArray(
        linkTable.id,
        links.flatMap((link) => link.id ?? [])
      )
    )
  );
};

export const getLinksByUserId = async (userId: string) => {
  const links = await db
    .select()
    .from(linkTable)
    .where(eq(linkTable.userId, userId))
    .orderBy(linkTable.order);

  return links;
};

export const getLinkByUserIdAndLinkId = async (
  userId: string,
  linkId: string
) => {
  const link = await db
    .select()
    .from(linkTable)
    .where(and(eq(linkTable.userId, userId), eq(linkTable.id, linkId)));

  return link.length > 0 ? link[0] : null;
};
