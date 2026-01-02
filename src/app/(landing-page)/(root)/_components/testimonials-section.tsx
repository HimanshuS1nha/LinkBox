import { StarIcon } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { testimonials } from "@/constants/testimonials";

const TestimonialsSection = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-3xl font-medium text-primary text-center lg:text-left">
            What our clients have to say?
          </h2>
          <p className="text-gray-700 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            deserunt.
          </p>
        </div>

        <div className="flex justify-center lg:justify-between gap-5 lg:gap-0 flex-wrap items-center">
          {testimonials.map((testimonial) => {
            return (
              <Card key={testimonial.name} className="w-[30%] min-w-68.75">
                <CardContent className="flex flex-col justify-center items-center gap-y-5">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="size-16 rounded-full"
                  />
                  <div className="flex flex-col items-center gap-y-3">
                    <CardTitle className="text-xl">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quos enim provident at, aspernatur rem totam odio minima
                      incidunt. Temporibus commodi saepe quae architecto ipsam
                      adipisci. Quis quidem officia eius soluta modi, minima
                      totam laboriosam veniam quod obcaecati, ipsum eum
                      reprehenderit.
                    </CardDescription>
                  </div>

                  <div className="flex justify-center gap-x-2">
                    <p className="text-primary text-3xl">&#9733;</p>
                    <p className="text-primary text-3xl">&#9733;</p>
                    <p className="text-primary text-3xl">&#9733;</p>
                    <p className="text-primary text-3xl">&#9733;</p>
                    <p className="text-primary text-3xl">&#9733;</p>
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

export default TestimonialsSection;
