import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Fallback = () => {
  return (
    <main className="flex flex-col w-full h-dvh items-center justify-center gap-y-6">
      <Card className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[25%]">
        <CardContent className="flex flex-col items-center gap-y-8">
          <Skeleton className="size-32 rounded-full" />

          <div className="flex flex-col gap-y-2 items-center">
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-24 h-7" />
          </div>

          <div className="flex flex-col gap-y-3">
            {Array.from({ length: 3 })
              .map((_, i) => i)
              .map((i) => {
                return <Skeleton key={i} className="w-62.5 h-10" />;
              })}
          </div>
        </CardContent>
      </Card>

      <Skeleton className="w-62.5 h-7" />
    </main>
  );
};

export default Fallback;
