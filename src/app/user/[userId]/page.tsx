import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import UserLinksPageClient from "./_components/client-page";
import Fallback from "./_components/fallback";
import ErrorFallback from "@/components/error-fallback";

import { tryCatch } from "@/helpers/try-catch";

import { HydrateClient, trpc } from "@/trpc/server";

import * as UserDal from "@/dal/user-dal";

const UserLinksPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  // Get the user details by userId to show in the page
  const [userError, user] = await tryCatch(UserDal.getUser(userId));
  if (userError) {
    console.error(userError);
    notFound();
  }
  if (!user) {
    notFound();
  }

  void trpc.link.getLinksByUserId.prefetch({ userId });
  return (
    <HydrateClient>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <UserLinksPageClient user={user} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default UserLinksPage;
