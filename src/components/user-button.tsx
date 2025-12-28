"use client";

import Link from "next/link";
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

import { authClient } from "@/lib/auth-client";

const UserButton = ({
  user,
}: {
  user?: { name: string; image?: string | null };
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
          My Account
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
