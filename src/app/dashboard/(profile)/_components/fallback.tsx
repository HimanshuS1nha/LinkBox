"use client";

import { LinkIcon, MoveIcon, User2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/loading";

const Fallback = () => {
  return (
    <main className="flex flex-col 2xl:flex-row justify-between mt-8">
      <ScrollArea className="w-full 2xl:w-[55%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">My Links</CardTitle>
            <CardDescription>Configure your links here</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-8">
            <Separator />

            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-3 items-center">
                <div className="size-10 bg-primary rounded-full flex justify-center items-center">
                  <User2Icon size={22} color="white" />
                </div>
                <p className="text-lg font-medium">My Information</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">Name</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">URL</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">Description</Label>
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-y-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <div className="size-10 bg-primary rounded-full flex justify-center items-center">
                    <LinkIcon size={22} color="white" />
                  </div>
                  <p className="text-lg font-medium">My Links</p>
                </div>

                <Skeleton className="size-10 rounded-lg" />
              </div>

              {Array.from({ length: 3 })
                .map((_, i) => i)
                .map((i) => {
                  return (
                    <Card
                      className="flex flex-row gap-x-0 py-0 h-46.5"
                      key={i}
                    >
                      <div className="w-[15%] h-[186] flex justify-center items-center border-r border-r-gray-300 cursor-grab">
                        <MoveIcon size={20} />
                      </div>

                      <CardContent className="w-full p-6 flex flex-col gap-y-3">
                        <div className="flex justify-between items-center">
                          <Skeleton className="w-40 h-6" />

                          <Skeleton className="size-6" />
                        </div>

                        <div className="flex gap-x-2 items-center">
                          <Skeleton className="size-6" />

                          <Skeleton className="h-10 w-full" />

                          <Skeleton className="size-6" />
                        </div>

                        <div className="flex flex-col gap-y-4">
                          <p className="font-medium">Select Icon</p>

                          <div className="flex gap-x-5 items-center">
                            <Skeleton className="size-6" />
                            <Skeleton className="size-6" />
                            <Skeleton className="size-6" />
                            <Skeleton className="size-6" />
                            <Skeleton className="size-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            <Separator />
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      </ScrollArea>

      <ScrollArea className="w-full 2xl:w-[44%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Preview</CardTitle>
            <CardDescription>
              Get a preview of how your links will look
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-y-8">
            <div className="flex gap-x-2 items-center justify-center w-full">
              <Skeleton className="w-72 h-10" />
              <Skeleton className="size-8" />
            </div>

            <Loading size={40} />
          </CardContent>
        </Card>
      </ScrollArea>
    </main>
  );
};

export default Fallback;
