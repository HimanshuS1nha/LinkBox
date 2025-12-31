import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import AnalyticsPageClient from "./_components/client-page";
import Fallback from "./_components/fallback";
import ErrorFallback from "@/components/error-fallback";
import UpgradePlan from "./_components/upgrade-plan";

import { auth } from "@/lib/auth";

import { HydrateClient, trpc } from "@/trpc/server";

const AnalyticsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  if (!session.user.planName) {
    return <UpgradePlan />;
  }

  void trpc.analytics.getAnalyticsForMonthForUser.prefetch();
  void trpc.link.getLinksByUserId.prefetch({ userId: session.user.id });
  return (
    <HydrateClient>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <AnalyticsPageClient userId={session.user.id} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default AnalyticsPage;
