import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const Loading = ({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <Loader2Icon
      className={cn("text-primary animate-spin", className)}
      size={size}
    />
  );
};

export default Loading;
