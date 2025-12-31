import { ChromiumIcon, GlobeIcon, Grid2X2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Fallback = () => {
  return (
    <div className="flex flex-col gap-y-6 mt-8">
      <Card>
        <Skeleton className="h-5 w-20 ml-4" />

        <CardHeader>
          <Skeleton className="h-12 w-40" />
          <CardDescription>Last 30 days overview</CardDescription>
        </CardHeader>

        <CardContent className="flex gap-4 items-center flex-wrap justify-center md:justify-start">
          {Array.from({ length: 4 })
            .map((_, i) => i)
            .map((i) => {
              return <Skeleton className="w-52.5 h-37.5" key={i} />;
            })}
        </CardContent>
      </Card>

      <Card>
        <div className="flex gap-x-3 items-center px-6">
          <div className="p-2 rounded-md bg-emerald-600">
            <GlobeIcon size={18} color="white" />
          </div>

          <CardHeader className="w-full px-0 gap-y-0">
            <CardTitle className="text-xl">Countries</CardTitle>
            <CardDescription>Country wise distribution</CardDescription>
          </CardHeader>
        </div>

        <CardContent className="flex flex-col gap-y-5">
          {Array.from({ length: 3 })
            .map((_, i) => i)
            .map((i) => {
              return (
                <div className="flex items-center gap-x-12" key={i}>
                  <Skeleton className="w-4 h-7" />
                  <div className="flex flex-1 h-6 rounded-full">
                    <Skeleton className="size-full" />
                  </div>
                  <Skeleton className="w-4 h-7" />
                </div>
              );
            })}
        </CardContent>
      </Card>

      <Card>
        <div className="flex gap-x-3 items-center px-6">
          <div className="p-2 rounded-md bg-emerald-600">
            <ChromiumIcon size={18} color="white" />
          </div>

          <CardHeader className="w-full px-0 gap-y-0">
            <CardTitle className="text-xl">Browsers</CardTitle>
            <CardDescription>Browsers wise distribution</CardDescription>
          </CardHeader>
        </div>

        <CardContent className="flex flex-col gap-y-5">
          {Array.from({ length: 3 })
            .map((_, i) => i)
            .map((i) => {
              return (
                <div className="flex items-center gap-x-12" key={i}>
                  <Skeleton className="w-4 h-7" />
                  <div className="flex flex-1 h-6 rounded-full">
                    <Skeleton className="size-full" />
                  </div>
                  <Skeleton className="w-4 h-7" />
                </div>
              );
            })}
        </CardContent>
      </Card>

      <Card>
        <div className="flex gap-x-3 items-center px-6">
          <div className="p-2 rounded-md bg-emerald-600">
            <Grid2X2Icon size={18} color="white" />
          </div>

          <CardHeader className="w-full px-0 gap-y-0">
            <CardTitle className="text-xl">OS</CardTitle>
            <CardDescription>OS wise distribution</CardDescription>
          </CardHeader>
        </div>

        <CardContent className="flex flex-col gap-y-5">
          {Array.from({ length: 3 })
            .map((_, i) => i)
            .map((i) => {
              return (
                <div className="flex items-center gap-x-12" key={i}>
                  <Skeleton className="w-4 h-7" />
                  <div className="flex flex-1 h-6 rounded-full">
                    <Skeleton className="size-full" />
                  </div>
                  <Skeleton className="w-4 h-7" />
                </div>
              );
            })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Fallback;
