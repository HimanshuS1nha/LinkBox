import { PropsWithChildren } from "react";

const MaxWidthWrapper = ({ children }: PropsWithChildren) => {
  return <div className="px-4 md:px-16 lg:px-24 xl:px-32">{children}</div>;
};

export default MaxWidthWrapper;
