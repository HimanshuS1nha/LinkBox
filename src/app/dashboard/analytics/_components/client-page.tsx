"use client";

import Link from "next/link";
import {
  ClockIcon,
  GlobeIcon,
  MousePointerIcon,
  TrendingUpIcon,
  ChartLineIcon,
  EyeIcon,
  ChromiumIcon,
  Grid2X2Icon,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart } from "./bar-chart";
import DistributionChart from "./distribution-chart";
import LinkIcon from "@/components/link-icon";

import { trpc } from "@/trpc/client";

const AnalyticsPageClient = ({ userId }: { userId: string }) => {
  const [
    [
      { numberOfVisits, numberOfClicks, numberOfCountries, lastActivity },
      { countriesData, totalVisitsByCountry },
      { browsersData, totalVisitsByBrowser },
      { osData, totalVisitsByOs },
      { linkWiseData },
    ],
  ] = trpc.analytics.getAnalyticsForMonthForUser.useSuspenseQuery();

  const [{ links }] = trpc.link.getLinksByUserId.useSuspenseQuery({ userId });

  const data = [
    {
      title: "Total Visits",
      Icon: EyeIcon,
      count: numberOfVisits ?? 0,
      color: "#155dfc",
    },
    {
      title: "Countries",
      Icon: GlobeIcon,
      count: numberOfCountries ?? 0,
      color: "#00a63e",
    },
    {
      title: "Total Clicks",
      Icon: MousePointerIcon,
      count: numberOfClicks ?? 0,
      color: "#9810fa",
    },
    {
      title: "Last Activity",
      Icon: ClockIcon,
      count: lastActivity
        ? `${formatDistanceToNowStrict(
            new Date(lastActivity).toISOString().slice(0, 10)
          )} ago`
        : "NA",
      color: "#f54900",
    },
  ];
  return (
    <div className="flex flex-col gap-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Analytics Overview</CardTitle>
          <CardDescription>Last 30 days overview</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-4 items-center flex-wrap justify-center md:justify-start">
          {data.map((item) => {
            return (
              <Card key={item.title} className="w-52.5">
                <CardContent className="flex flex-col gap-y-3">
                  <div className="flex justify-between items-center w-full">
                    <div
                      className="p-2 rounded-md"
                      style={{ backgroundColor: item.color }}
                    >
                      <item.Icon size={18} color="white" />
                    </div>

                    <TrendingUpIcon size={16} color={item.color} />
                  </div>

                  <div className="flex flex-col gap-y-1.5">
                    <p className="font-medium" style={{ color: item.color }}>
                      {item.title}
                    </p>

                    <p className="text-lg font-semibold">{item.count}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      <DistributionChart
        title="Countries"
        data={countriesData}
        total={totalVisitsByCountry}
        Icon={GlobeIcon}
      />
      <DistributionChart
        title="Browsers"
        data={browsersData}
        total={totalVisitsByBrowser}
        Icon={ChromiumIcon}
      />
      <DistributionChart
        title="OS"
        data={osData}
        total={totalVisitsByOs}
        Icon={Grid2X2Icon}
      />

      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 lg:gap-0">
        <BarChart data={linkWiseData} />

        <Card className="w-full lg:w-[49%]">
          <CardHeader>
            <CardTitle>My Links</CardTitle>
            <CardDescription>The links that you have added</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-y-3">
              {links.length > 0 ? (
                links.map((link) => {
                  return (
                    <Link
                      href={`/dashboard/analytics/${link.id}`}
                      key={link.id}
                    >
                      <Card className="bg-gray-100 hover:bg-green-100 delay-100 transition-all py-4">
                        <CardContent className="flex justify-between items-center">
                          <div className="flex gap-x-6 items-center">
                            <div className="p-1.5 rounded-lg bg-white shadow-sm shadow-white">
                              <LinkIcon icon={link.icon} />
                            </div>

                            <p className="font-medium text-lg">{link.title}</p>
                          </div>

                          <ChartLineIcon className="text-primary" size={20} />
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              ) : (
                <p className="text-destructive text-center">No data to show</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPageClient;
