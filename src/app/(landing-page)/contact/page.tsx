"use client";

import { MailIcon, PhoneIcon, PinIcon } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col gap-y-8 mt-6">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-3xl font-medium text-primary">Contact Us</h2>
          <p className="text-gray-700 text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            deserunt.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-5 lg:gap-0">
          <Card className="w-[98%] sm:w-[80%] md:w-[60%] lg:w-[48%] h-fit">
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-y-6">
              <div className="flex gap-x-5 items-center">
                <PinIcon className="text-primary shrink-0" size={20} />
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Itaque, numquam perferendis natus reprehenderit tempore
                  placeat eius.
                </p>
              </div>
              <div className="flex gap-x-5 items-center">
                <PhoneIcon className="text-primary" size={20} />
                <p>9876543210</p>
              </div>
              <div className="flex gap-x-5 items-center">
                <MailIcon className="text-primary" size={20} />
                <p>contact@example.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[98%] sm:w-[80%] md:w-[60%] lg:w-[48%]">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="name" className="ml-1">
                    Name
                  </Label>
                  <Input placeholder="Enter your name" id="name" required />
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="email" className="ml-1">
                    Email
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    id="email"
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="subject" className="ml-1">
                    Subject
                  </Label>
                  <Input placeholder="Enter subject" id="subject" required />
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label htmlFor="subject" className="ml-1">
                    Message
                  </Label>
                  <Textarea
                    placeholder="Type your message"
                    id="message"
                    required
                  />
                </div>

                <Button size={"lg"} type="submit">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default ContactPage;
