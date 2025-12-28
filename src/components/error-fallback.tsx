"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-8 gap-5 md:gap-0">
      <div className="w-[48%]">
        <img src="/oops.webp" alt="OOPS! Error occured" className="w-[75%]" />
      </div>

      <div className="w-[48%] flex flex-col gap-y-4 items-center md:items-start">
        <p className="text-4xl font-medium">Oh No!</p>
        <p className="text-destructive text-lg">{error.message}</p>

        <div className="flex gap-x-4 items-center">
          <Button variant={"secondary"} size={"lg"} asChild>
            <Link href={"/"}>Back to Homepage</Link>
          </Button>
          <Button size={"lg"} asChild>
            <Link href={"/contact"}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
