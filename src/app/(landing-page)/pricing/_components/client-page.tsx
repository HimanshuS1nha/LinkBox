"use client";

import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { pricingPlans } from "@/constants/pricing-plans";

const PricingPageClient = ({
  user,
}: {
  user?: { id: string; name: string; planName?: string | null };
}) => {
  const router = useRouter();

  const handleSubscribe = async (planName: "basic" | "pro") => {
    if (user) {
      await authClient.subscription.upgrade({
        plan: planName,
        successUrl: "/",
        cancelUrl: "/",
      });
    } else {
      router.push(`/login?redirect_to=pricing`);
    }
  };
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col gap-y-8 mt-6">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-3xl font-medium text-primary">Pricing</h2>
          <p className="text-gray-700 text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            deserunt.
          </p>
        </div>

        <div className="flex justify-center lg:justify-between flex-wrap items-center gap-5 lg:gap-0">
          {pricingPlans.map((plan) => {
            return (
              <Card
                key={plan.name}
                className={cn(
                  "w-[32%] flex flex-col items-center justify-center min-w-67.5",
                  plan.highlighted ? "border-2 border-primary" : ""
                )}
              >
                <CardHeader className="w-full">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-3xl font-bold">{plan.price}</p>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="w-full flex flex-col gap-y-4">
                  <p className="text-sm text-gray-700">Features:</p>

                  <div className="flex flex-col gap-y-2">
                    {plan.features.map((item) => {
                      return (
                        <div key={item} className="flex gap-x-2 items-center">
                          <CheckIcon className="text-primary" size={18} />
                          <p key={item} className="text-sm">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    size={"lg"}
                    onClick={() => {
                      if (plan.name !== "Free") {
                        handleSubscribe(
                          plan.name.toLowerCase() as "basic" | "pro"
                        );
                      } else {
                        if (user) {
                          router.push("/dashboard");
                        } else {
                          router.push("/login");
                        }
                      }
                    }}
                    disabled={
                      plan.name === "Free"
                        ? !!user
                        : user?.planName === plan.name
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default PricingPageClient;
