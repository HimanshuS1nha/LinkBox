"use client";

import { notFound, useRouter } from "next/navigation";
import {
  ClockIcon,
  GlobeIcon,
  LinkIcon,
  MousePointerIcon,
  TrendingUpIcon,
  ChartColumnIcon,
  ArrowLeftIcon,
  ChromiumIcon,
  Grid2X2Icon,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DistributionChart from "../../_components/distribution-chart";

import { trpc } from "@/trpc/client";

const LinkAnalyticsPageClient = ({ linkId }: { linkId: string }) => {
  const [
    [
      { numberOfVisits, numberOfCountries, lastActivity },
      { countriesData, totalVisitsByCountry },
      { browsersData, totalVisitsByBrowser },
      { osData, totalVisitsByOs },
    ],
  ] = trpc.analytics.getAnalyticsForMonthForLink.useSuspenseQuery({
    linkId,
  });

  const [{ link }] = trpc.link.getLinkByUserIdAndLinkId.useSuspenseQuery({
    linkId,
  });

  const data = [
    {
      title: "Total Visits",
      Icon: MousePointerIcon,
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

  const router = useRouter();

  if (!link) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-y-6 mt-8">
      <Card>
        <Button
          onClick={router.back}
          className="text-primary w-fit mx-3 group"
          variant={"link"}
        >
          <ArrowLeftIcon
            size={16}
            className="group-hover:-translate-x-0.5 delay-100 transition-all"
          />
          Go back
        </Button>

        <CardHeader>
          <CardTitle className="text-3xl">{link.title}</CardTitle>
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
        Icon={GlobeIcon}
        data={countriesData}
        title="Countries"
        total={totalVisitsByCountry}
      />

      <DistributionChart
        Icon={ChromiumIcon}
        data={browsersData}
        title="Browsers"
        total={totalVisitsByBrowser}
      />

      <DistributionChart
        Icon={Grid2X2Icon}
        data={osData}
        title="OS"
        total={totalVisitsByOs}
      />
    </div>
  );
};

export default LinkAnalyticsPageClient;
