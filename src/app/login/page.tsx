"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect_to");
  return (
    <main className="w-full h-dvh relative flex justify-center items-center">
      <Image src={"/auth-bg.png"} alt="Auth BG" fill />

      <Card className="z-20 bg-white/90 border-none w-[90%] sm:w-[75%] md:w-[55%] lg:w-[45%] xl:w-[25%]">
        <CardContent className="flex flex-col items-center gap-y-6">
          <p className="font-medium text-xl">
            Link<span className="text-primary font-bold">Box</span>
          </p>

          <Button
            size={"lg"}
            className="w-full"
            onClick={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: redirectTo ? `/${redirectTo}` : "/dashboard",
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
              style={{ fill: "white" }}
            >
              <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
            </svg>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

const LoginPageSuspense = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default LoginPageSuspense;
