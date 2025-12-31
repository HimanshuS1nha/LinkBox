import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import LinkAnalyticsPageClient from "./_components/client-page";
import Fallback from "./_components/fallback";
import ErrorFallback from "@/components/error-fallback";

import { auth } from "@/lib/auth";

import { HydrateClient, trpc } from "@/trpc/server";

const LinkAnalyticsPage = async ({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  const { linkId } = await params;

  void trpc.analytics.getAnalyticsForMonthForLink.prefetch({ linkId });
  void trpc.link.getLinkByUserIdAndLinkId.prefetch({ linkId });
  return (
    <HydrateClient>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <LinkAnalyticsPageClient linkId={linkId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default LinkAnalyticsPage;
