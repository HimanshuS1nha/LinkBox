"use client";

import {
  Bar,
  BarChart as RechartBarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart of link wise performance";

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export function BarChart({
  data,
}: {
  data: { name: string; clicks: number }[];
}) {
  return (
    <Card className="w-full lg:w-[49%]">
      <CardHeader>
        <CardTitle>Link Wise Performance</CardTitle>
        <CardDescription>Last 30 days data</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <RechartBarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="clicks" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="clicks"
                direction={"vertical"}
                fill="var(--color-clicks)"
                radius={4}
              >
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="clicks"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </RechartBarChart>
          </ChartContainer>
        ) : (
          <p className="text-destructive text-center">No data to show</p>
        )}
      </CardContent>
    </Card>
  );
}
