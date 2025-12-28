"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import UserButton from "@/components/user-button";
import Loading from "@/components/loading";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

import { dashboardLinks } from "@/constants/dashboard-links";

const DashboardNavbar = () => {
  const pathname = usePathname();

  const { data, isPending } = authClient.useSession();
  return (
    <nav className="flex justify-between items-center py-3">
      <Link href={"/"}>
        <p className="font-medium text-xl">
          Link<span className="text-primary font-bold">Tree</span>
        </p>
      </Link>

      <div className="flex gap-x-7 items-center">
        {dashboardLinks.map((link) => {
          return (
            <Link
              href={link.url}
              className={cn(
                "flex gap-x-2 items-center",
                pathname === link.url
                  ? "text-primary font-medium"
                  : "hover:text-primary delay-100 transition-all"
              )}
              key={link.name}
            >
              <link.Icon size={18} className="hidden sm:block" />
              {link.name}
            </Link>
          );
        })}
      </div>

      {isPending ? <Loading /> : <UserButton user={data?.user} />}
    </nav>
  );
};

export default DashboardNavbar;
