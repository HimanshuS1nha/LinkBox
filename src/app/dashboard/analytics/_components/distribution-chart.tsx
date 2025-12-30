"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";

const DistributionChart = ({
  data,
  total,
  Icon,
  title,
}: {
  data: { name: string; count: number }[];
  total: number;
  title: string;
  Icon: LucideIcon;
}) => {
  return (
    <Card>
      <div className="flex gap-x-3 items-center px-6">
        <div className="p-2 rounded-md bg-emerald-600">
          <Icon size={18} color="white" />
        </div>

        <CardHeader className="w-full px-0 gap-y-0">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{title} wise visits</CardDescription>
        </CardHeader>
      </div>

      <CardContent className="flex flex-col gap-y-5">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div key={item.name} className="flex items-center gap-x-12">
                <p className="font-medium w-20">{item.name}</p>

                <div className="flex-1 flex">
                  <div
                    style={{
                      width: `${Math.floor((item.count / total) * 100)}%`,
                    }}
                    className={cn(
                      "bg-emerald-600 rounded-full h-6",
                      item.count / total === 1 ? "" : "rounded-r-none"
                    )}
                  >
                    <p className="text-white pl-2 text-sm">
                      {Math.floor((item.count / total) * 100)}%
                    </p>
                  </div>
                  <div
                    style={{
                      width: `${100 - Math.floor((item.count / total) * 100)}%`,
                    }}
                    className="bg-gray-200 rounded-full rounded-l-none h-6"
                  />
                </div>

                <p className="font-medium w-6">{item.count}</p>
              </div>
            );
          })
        ) : (
          <p className="text-destructive text-center">No data to show</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DistributionChart;
