"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const UpgradePlan = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mt-8">
      <div className="w-full lg:w-[48%] flex justify-center">
        <div className="relative w-[95%] sm:w-[75%] h-75 sm:h-125">
          <Image src="/upgrade-plan.png" alt="Upgrade Plan" fill />
        </div>
      </div>

      <div className="w-full lg:w-[48%] flex flex-col gap-y-4 items-center lg:items-start">
        <p className="text-4xl font-medium">Upgrade Plan!</p>
        <p className="text-destructive text-lg text-center lg:text-left">
          Upgrade your plan now to Basic/Pro to get access to Analytics
        </p>

        <div className="flex gap-x-4 items-center">
          <Button size={"lg"} asChild>
            <Link href={"/pricing"}>Upgrade Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlan;
