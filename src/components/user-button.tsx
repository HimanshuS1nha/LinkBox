"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { authClient } from "@/lib/auth-client";

const UserButton = ({
  user,
}: {
  user?: { name: string; image?: string | null; planName?: string };
}) => {
  const pathname = usePathname();

  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          My Account <Badge>{user?.planName ?? "Free"}</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!pathname.includes("dashboard") && (
          <>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/dashboard"}>My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/dashboard/analytics"}>My Analytics</Link>
            </DropdownMenuItem>
          </>
        )}
        {user?.planName && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              const { data, error } =
                await authClient.subscription.billingPortal();
              if (error || !data || !data.url) {
                toast.error("Some error occurred");
                return;
              }

              router.push(data.url);
            }}
          >
            Manage Subscription
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/pricing"}>Upgrade Plan</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-white cursor-pointer delay-100 transition-all"
          onClick={() => {
            authClient.signOut();
            router.push("/login");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
