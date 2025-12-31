"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkIcon from "@/components/link-icon";

import { trpc } from "@/trpc/client";

const UserLinksPageClient = ({
  user,
}: {
  user: {
    name: string;
    description?: string | null;
    image?: string | null;
    id: string;
  };
}) => {
  const [{ links }] = trpc.link.getLinksByUserId.useSuspenseQuery({
    userId: user.id,
  });

  // To prevent useEffect running twice in dev from inflating the analytics
  const visitRecorded = useRef<boolean>(false);

  const { mutate: handleRecordVisit } =
    trpc.analytics.recordVisit.useMutation();

  useEffect(() => {
    if (visitRecorded.current) {
      return;
    }

    visitRecorded.current = true;
    handleRecordVisit({ userId: user.id });
  }, []);
  return (
    <main className="flex flex-col w-full h-dvh items-center justify-center gap-y-6">
      <Card className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[25%]">
        <CardContent className="flex flex-col items-center gap-y-8">
          <Avatar className="size-32">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-y-2 items-center">
            <p className="text-3xl font-bold text-center">{user.name}</p>
            <p className="text-sm text-gray-700 w-[75%] text-center">
              {user.description}
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            {links.map((link) => {
              return (
                <Link
                  href={link.link}
                  target="_blank"
                  key={link.id}
                  onClick={() =>
                    navigator.sendBeacon(
                      "/api/trpc/analytics.recordClick",
                      new Blob([JSON.stringify({ linkId: link.id })], {
                        type: "application/json",
                      })
                    )
                  }
                >
                  <Card className="bg-gray-100 hover:bg-green-100 delay-100 transition-all py-4">
                    <CardContent className="flex gap-x-6 items-center">
                      <div className="p-1.5 rounded-lg bg-white shadow-sm shadow-white">
                        <LinkIcon icon={link.icon} />
                      </div>

                      <p className="font-medium text-lg">{link.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-x-2 items-center flex-wrap justify-center">
        The only link you will ever need.
        <Button variant={"link"} className="w-fit p-0 m-0 text-base" asChild>
          <Link href={"/"}>Try LinkBox now</Link>
        </Button>
      </div>
    </main>
  );
};

export default UserLinksPageClient;
