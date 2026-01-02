"use client";

import { useState } from "react";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import toast from "react-hot-toast";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

import { trpc } from "@/trpc/client";

import { navbarLinks } from "@/constants/navbar-links";

const Footer = () => {
  const [email, setEmail] = useState("");

  const { mutate: handleSubscribeToNewsletter, isPending } =
    trpc.newsletterSubscribers.addSubscriber.useMutation({
      onSuccess: (data) => {
        toast.success(data.message);
        setEmail("");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return (
    <footer className="bg-green-100 mt-12 py-8">
      <MaxWidthWrapper>
        <div className="flex justify-center lg:justify-between flex-wrap gap-8 lg:gap-0">
          <div className="flex flex-col gap-y-5 w-[30%] min-w-50 items-center md:items-start">
            <h2 className="text-xl font-medium">
              Link<span className="text-primary">Box</span>
            </h2>
            <p className="text-sm text-center md:text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui eius
              repellendus maiores! Provident quasi deleniti rem at. Nihil,
              doloremque numquam?
            </p>
          </div>
          <div className="flex flex-col gap-y-5 min-w-50 items-center md:items-start">
            <p className="font-medium text-lg">Quick Links</p>

            <div className="flex flex-col gap-y-3">
              {navbarLinks.map((link) => {
                return (
                  <Link
                    href={link.url}
                    className="hover:text-primary delay-100 transition-all"
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-5 min-w-50 items-center md:items-start">
            <p className="font-medium text-lg">Socials</p>

            <div className="flex gap-x-3">
              <FacebookIcon
                size={20}
                className="hover:text-primary delay-100 transition-all cursor-pointer"
              />
              <InstagramIcon
                size={20}
                className="hover:text-primary delay-100 transition-all cursor-pointer"
              />
              <TwitterIcon
                size={20}
                className="hover:text-primary delay-100 transition-all cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-5 w-[30%] min-w-75 items-center md:items-start">
            <p className="font-medium text-lg">Subscribe to our newsletter</p>

            <form
              className="flex gap-x-2 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscribeToNewsletter({ email });
              }}
            >
              <Input
                placeholder="Enter your email"
                className="bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
              />
              <Button size={"sm"} type="submit" disabled={isPending}>
                {isPending ? <Loading className="text-white" /> : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
