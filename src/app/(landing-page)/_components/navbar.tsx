"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import Loading from "@/components/loading";
import UserButton from "@/components/user-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { navbarLinks } from "@/constants/navbar-links";
import toast from "react-hot-toast";

const Navbar = () => {
  const pathname = usePathname();

  const { data, isPending } = authClient.useSession();
  return (
    <MaxWidthWrapper>
      <nav className="flex justify-between items-center py-3">
        <Link href={"/"}>
          <p className="font-medium text-xl">
            Link<span className="text-primary font-bold">Tree</span>
          </p>
        </Link>

        <div className="flex gap-x-12 items-center">
          <div className="hidden md:flex gap-x-7 items-center">
            {navbarLinks.map((link) => {
              return (
                <Link
                  href={link.url}
                  className={cn(
                    pathname === link.url
                      ? "text-primary font-medium"
                      : "hover:text-primary delay-100 transition-all"
                  )}
                  key={link.name}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {isPending ? (
            <Loading />
          ) : data && data.user ? (
            <UserButton user={data.user} />
          ) : (
            <Button
              onClick={() =>
                authClient.signIn
                  .social({
                    provider: "google",
                    callbackURL: "/dashboard",
                  })
                  .catch(() => {
                    toast.error("Some error occurred. Please try again later!");
                  })
              }
              className="hidden md:block"
            >
              Get Started
            </Button>
          )}

          <Drawer>
            <DrawerTrigger className="block md:hidden">
              <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col items-center">
              <div className="flex flex-col gap-y-7 justify-center py-4">
                {navbarLinks.map((link) => {
                  return (
                    <DrawerClose asChild key={link.name}>
                      <Link
                        href={link.url}
                        className={cn(
                          pathname === link.url
                            ? "text-primary font-medium"
                            : "hover:text-primary delay-100 transition-all"
                        )}
                      >
                        {link.name}
                      </Link>
                    </DrawerClose>
                  );
                })}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    onClick={() =>
                      authClient.signIn.social({
                        provider: "google",
                        callbackURL: "/dashboard",
                      })
                    }
                  >
                    Get Started
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
