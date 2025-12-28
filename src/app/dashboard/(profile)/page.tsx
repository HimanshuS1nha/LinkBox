import { headers } from "next/headers";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import DashboardPageClient from "./_components/client-page";
import Fallback from "./_components/fallback";
import ErrorFallback from "@/components/error-fallback";

import { auth } from "@/lib/auth";

import { HydrateClient, trpc } from "@/trpc/server";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  void trpc.link.getLinksByUserId.prefetch({ userId: session.user.id });

  return (
    <HydrateClient>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <DashboardPageClient user={session.user} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default DashboardPage;
