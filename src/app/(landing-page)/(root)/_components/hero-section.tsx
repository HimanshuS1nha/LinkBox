"use client";

import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

const HeroSection = () => {
  return (
    <main className="bg-green-100 flex w-full lg:h-[calc(100dvh-100px)] items-center justify-center pt-10 lg:pt-0">
      <div className="flex flex-col lg:flex-row w-[95%] xl:w-[90%] justify-between items-center gap-y-5 lg:gap-y-0">
        <div className="flex flex-col gap-y-5 w-[98%] md:w-[75%] lg:w-[50%] items-center lg:items-start">
          <h1 className="text-7xl font-semibold text-center lg:text-left">
            The last link{" "}
            <span className="text-primary">you&apos;ll ever need</span>
          </h1>

          <p className="text-gray-700 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            vero laboriosam ad quas excepturi nemo perferendis explicabo,
            perspiciatis natus rem.
          </p>

          <Button
            size={"lg"}
            className="group w-fit"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
              })
            }
          >
            Try now{" "}
            <ArrowRightIcon className="group-hover:translate-x-1 delay-100 transition-all" />
          </Button>
        </div>

        <div className="w-[98%] md:w-150 h-auto md:h-100">
          <img
            src="/hero-img.png"
            alt=""
            className="w-full h-full rounded-lg rotate-360"
          />
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
