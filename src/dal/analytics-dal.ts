import "server-only";

import { eq, and, gt, sql, max, sum, count, countDistinct } from "drizzle-orm";

import { db } from "@/lib/db";

import { analyticsTable } from "@/db/analytics-schema";
import { linkTable } from "@/db/link-schema";

export const recordVisit = async (
  {
    browser,
    country,
    os,
  }: {
    browser: string;
    os: string;
    country: string;
  },
  userId: string
) => {
  await db.insert(analyticsTable).values({
    userId,
    type: "visit",
    browser,
    country,
    os,
  });
};

export const recordClick = async (
  { browser, country, os }: { browser: string; os: string; country: string },
  linkId: string
) => {
  await db.insert(analyticsTable).values({
    linkId,
    type: "click",
    browser,
    country,
    os,
  });
};

export const getAnalyticsForMonthForProfile = async (userId: string) => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const data = await db
    .select({
      numberOfVisits: sum(
        sql`${analyticsTable.type} = 'visit' AND ${analyticsTable.userId} = ${userId}`
      ),
      numberOfClicks: sum(
        sql`${analyticsTable.type} = 'click' AND ${linkTable.userId} = ${userId}`
      ),
      numberOfCountries: countDistinct(analyticsTable.country),
      lastActivity: max(analyticsTable.createdAt),
    })
    .from(analyticsTable)
    .leftJoin(linkTable, eq(analyticsTable.linkId, linkTable.id))
    .where(gt(analyticsTable.createdAt, date));

  return data.length > 0
    ? data[0]
    : {
        numberOfVisits: 0,
        numberOfClicks: 0,
        lastActivity: null,
        numberOfCountries: 0,
      };
};

export const getCountryWiseVisitsForMonthForProfile = async (
  userId: string
) => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const data = await db
    .selectDistinct({
      name: analyticsTable.country,
      count: count(),
    })
    .from(analyticsTable)
    .where(
      and(gt(analyticsTable.createdAt, date), eq(analyticsTable.userId, userId))
    )
    .groupBy(analyticsTable.country);

  return {
    countriesData: data,
    totalVisitsByCountry: data.reduce((acc, item) => acc + item.count, 0),
  };
};

export const getBrowserWiseVisitsForMonthForProfile = async (
  userId: string
) => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const data = await db
    .selectDistinct({
      name: analyticsTable.browser,
      count: count(),
    })
    .from(analyticsTable)
    .where(
      and(gt(analyticsTable.createdAt, date), eq(analyticsTable.userId, userId))
    )
    .groupBy(analyticsTable.browser);

  return {
    browsersData: data,
    totalVisitsByBrowser: data.reduce((acc, item) => acc + item.count, 0),
  };
};


export const getOsWiseVisitsForMonthForProfile = async (userId: string) => {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  const data = await db
    .selectDistinct({
      name: analyticsTable.os,
      count: count(),
    })
    .from(analyticsTable)
    .where(
      and(gt(analyticsTable.createdAt, date), eq(analyticsTable.userId, userId))
    )
    .groupBy(analyticsTable.os);

  return {
    osData: data,
    totalVisitsByOs: data.reduce((acc, item) => acc + item.count, 0),
  };
};

export const getLinkWiseDataForMonthForProfile = async (userId: string) => {
  const data = await db
    .select({
      name: linkTable.title,
      clicks: count(sql`${analyticsTable.type} = 'click'`),
    })
    .from(analyticsTable)
    .innerJoin(linkTable, eq(analyticsTable.linkId, linkTable.id))
    .groupBy(linkTable.title);

  return { linkWiseData: data };
};
