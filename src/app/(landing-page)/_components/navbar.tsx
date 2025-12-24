"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { navbarLinks } from "@/constants/navbar-links";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <MaxWidthWrapper>
      <nav className="flex justify-between items-center py-3">
        <Link href={"/"}>
          <p className="font-medium text-xl">
            Link<span className="text-primary font-bold">Box</span>
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
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
