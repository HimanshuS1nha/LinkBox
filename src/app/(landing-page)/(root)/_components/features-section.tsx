import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { features } from "@/constants/features";

const FeaturesSection = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-3xl font-medium text-primary text-center lg:text-left">
            What benefits do we provide?
          </h2>
          <p className="text-gray-700 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            deserunt.
          </p>
        </div>

        <div className="flex justify-center lg:justify-between gap-5 lg:gap-0 flex-wrap items-center">
          {features.map((feature) => {
            return (
              <Card key={feature.name} className="w-[32%] min-w-68.75">
                <CardContent className="flex flex-col justify-center items-center gap-y-6">
                  <feature.Icon size={45} className="text-primary" />

                  <div className="flex flex-col gap-y-3 items-center">
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                    <CardDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui magnam, expedita laboriosam dolor rerum facilis sit ex
                      autem accusantium dicta voluptate odit sed esse at
                      perferendis eaque harum iure quod.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default FeaturesSection;
