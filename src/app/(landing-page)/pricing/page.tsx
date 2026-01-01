import { Suspense } from "react";
import { headers } from "next/headers";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "@/components/error-fallback";
import PricingPageClient from "./_components/client-page";
import Loading from "@/components/loading";

import { auth } from "@/lib/auth";

const PricingPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="flex w-full justify-center mt-8">
            <Loading size={40} />
          </div>
        }
      >
        <PricingPageClient user={session?.user} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PricingPage;
