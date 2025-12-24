"use client";

import { ArrowRightIcon } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

import { conversionNumbers } from "@/constants/conversion-numbers";

const CallToActionBanner = () => {
  return (
    <section className="bg-green-100 py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 lg:gap-0">
          <div className="flex flex-col items-center lg:items-start gap-y-3 w-[98%] sm:w-[75%] lg:w-[45%]">
            <h2 className="text-3xl font-medium text-center lg:text-left">
              Adopt the better way{" "}
              <span className="text-primary font-semibold">
                of sharing links
              </span>
            </h2>
            <p className="text-gray-700 text-center lg:text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              quae similique deleniti sunt, quas perferendis id hic eligendi
              velit incidunt.
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

          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-10 w-[98%] sm:w-[75%] lg:w-[45%]">
            {conversionNumbers.map((item) => {
              return (
                <div
                  key={item.number}
                  className="flex gap-x-6 items-center w-50"
                >
                  <item.Icon size={50} className="text-primary" />

                  <div className="flex flex-col gap-y-1">
                    <p className="text-2xl font-bold">{item.number}</p>
                    <p className="text-gray-700 text-sm">Lorem, ipsum.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CallToActionBanner;
