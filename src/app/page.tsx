"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";

export default function Home() {
  const { data } = trpc.hello.useQuery({ text: "World" });
  return <Button className="m-4">{data?.greeting ?? "Loading..."}</Button>;
}
