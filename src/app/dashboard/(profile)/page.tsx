"use client";

import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { useState } from "react";
import {
  ClipboardIcon,
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon as LucideLinkIcon,
  PlusIcon,
  TwitterIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkCard from "./_components/link-card";
import LinkIcon from "@/components/link-icon";

import type { LinkType } from "../../../../types";

const DashboardPage = () => {
  const [username, setUsername] = useState("Random");
  const [profilePic, setProfilePic] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [updatedLinks, setUpdatedLinks] = useState<LinkType[]>([
    {
      icon: "other",
      title: "New link",
      link: "",
      isEnabled: true,
    },
  ]);

  const handleUpdateIcon = (
    index: number,
    type: "other" | "instagram" | "facebook" | "twitter" | "linkedin"
  ) => {
    setUpdatedLinks((prev) => {
      const newLinks = prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            icon: type,
          };
        }

        return item;
      });

      return newLinks;
    });
  };
  return (
    <main className="flex flex-col 2xl:flex-row justify-between mt-8">
      <ScrollArea className="w-full 2xl:w-[55%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">My Links</CardTitle>
            <CardDescription>Configure your links here</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-8">
            <Separator />

            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-3 items-center">
                <div className="size-10 bg-primary rounded-full flex justify-center items-center">
                  <User2Icon size={22} color="white" />
                </div>
                <p className="text-lg font-medium">My Information</p>
              </div>

              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">Name</Label>
                  <Input
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">URL</Label>
                  <Input
                    placeholder="Your image url"
                    value={profilePic}
                    onChange={(e) => {
                      setProfilePic(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="ml-1">Description</Label>
                  <Textarea
                    placeholder="Describe yourself"
                    value={userDescription}
                    onChange={(e) => {
                      setUserDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-y-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <div className="size-10 bg-primary rounded-full flex justify-center items-center">
                    <LucideLinkIcon size={22} color="white" />
                  </div>
                  <p className="text-lg font-medium">My Links</p>
                </div>

                <Button
                  onClick={() => {
                    setUpdatedLinks((prev) => [
                      ...prev,
                      {
                        title: "New link",
                        link: "",
                        icon: "other",
                        isEnabled: true,
                      },
                    ]);
                  }}
                >
                  <PlusIcon />
                </Button>
              </div>

              {updatedLinks.map((link, i) => {
                return (
                  <LinkCard
                    link={link}
                    i={i}
                    handleUpdateIcon={handleUpdateIcon}
                    updatedLinks={updatedLinks}
                    setUpdatedLinks={setUpdatedLinks}
                    key={link.id ?? i}
                  />
                );
              })}
            </div>

            <Separator />

            <Button size={"lg"}>Update</Button>
          </CardContent>
        </Card>
      </ScrollArea>

      <ScrollArea className="w-full 2xl:w-[44%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl">Preview</CardTitle>
            <CardDescription>
              Get a preview of how your links will look
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-y-8">
            <div className="flex gap-x-2 items-center justify-center w-full">
              <Card className="px-2 py-2.5 w-[70%]">
                <CardContent className="flex justify-between items-center">
                  <p className="font-medium truncate">
                    {process.env.NEXT_PUBLIC_URL}/user/1234
                  </p>
                  <ClipboardIcon size={18} className="cursor-pointer" />
                </CardContent>
              </Card>

              <Button asChild>
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL}/user/1234`}
                  target="__blank"
                >
                  <ExternalLinkIcon />
                </Link>
              </Button>
            </div>

            <p className="text-destructive block sm:hidden">
              Sorry! Your device isn&apos; big enough to show this preview
            </p>

            <div className="hidden sm:block">
              <DeviceFrameset device="iPhone X" color="black">
                <div className="flex flex-col w-full h-full justify-center items-center gap-y-8">
                  <Avatar className="size-32">
                    <AvatarImage src={""} />
                    <AvatarFallback>"Random"</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-y-2 items-center">
                    <p className="text-3xl font-bold">Random</p>
                    <p className="text-sm text-gray-700 w-[75%] text-center">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-3">
                    {updatedLinks
                      .filter((link) => link.isEnabled)
                      .map((link, i) => {
                        return (
                          <Card className="bg-gray-100 py-4" key={link.id ?? i}>
                            <CardContent className="flex gap-x-6 items-center">
                              <div className="p-1.5 rounded-lg bg-white shadow-sm shadow-white">
                                <LinkIcon icon={link.icon} />
                              </div>

                              <p className="font-medium text-lg">
                                {link.title}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              </DeviceFrameset>
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </main>
  );
};

export default DashboardPage;
