"use client";

import React, { useState } from "react";
import {
  MoveIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkIcon as LucideLinkIcon,
  CheckIcon,
  PencilIcon,
  LinkedinIcon,
  XIcon,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import LinkIcon from "@/components/link-icon";

import type { LinkType } from "../../../../../types";

const LinkCard = ({
  link,
  updatedLinks,
  setUpdatedLinks,
  i,
  handleUpdateIcon,
}: {
  link: LinkType;
  updatedLinks: LinkType[];
  setUpdatedLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  i: number;
  handleUpdateIcon: (
    i: number,
    type: "instagram" | "linkedin" | "other" | "facebook" | "twitter"
  ) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Card className="flex flex-row gap-x-0 py-0 h-46.5" key={link.id ?? i}>
      <div className="w-[15%] h-[186] flex justify-center items-center border-r border-r-gray-300 cursor-grab active:cursor-grabbing">
        <MoveIcon size={20} />
      </div>

      <CardContent className="w-full p-6 flex flex-col gap-y-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            {isEditing ? (
              <>
                <Input
                  value={link.title}
                  className="p-0 border-none border-b"
                  onChange={(e) => {
                    setUpdatedLinks((prev) => {
                      const newLinks = prev.map((item, index) => {
                        if (index === i) {
                          return {
                            ...item,
                            title: e.target.value,
                          };
                        }

                        return item;
                      });

                      return newLinks;
                    });
                  }}
                />

                <div onClick={() => setIsEditing(false)}>
                  <CheckIcon
                    size={18}
                    className="cursor-pointer hover:text-primary delay-100 transition-all"
                  />
                </div>
              </>
            ) : (
              <>
                <CardTitle>{link.title}</CardTitle>
                <div onClick={() => setIsEditing(true)}>
                  <PencilIcon
                    size={14}
                    className="cursor-pointer hover:text-primary delay-100 transition-all"
                  />
                </div>
              </>
            )}
          </div>

          <Switch
            className="cursor-pointer"
            checked={link.isEnabled}
            onClick={() => {
              setUpdatedLinks((prev) => {
                const newLinks = prev.map((item, index) => {
                  if (index === i) {
                    return {
                      ...item,
                      isEnabled: !item.isEnabled,
                    };
                  }

                  return item;
                });

                return newLinks;
              });
            }}
          />
        </div>

        <div className="flex gap-x-2 items-center">
          <LinkIcon icon={link.icon} />

          <Input
            placeholder="Enter your link here"
            value={link.link}
            onChange={(e) => {
              setUpdatedLinks((prev) => {
                const newLinks = prev.map((item, index) => {
                  if (i === index) {
                    return {
                      ...item,
                      link: e.target.value,
                    };
                  }

                  return item;
                });

                return newLinks;
              });
            }}
          />

          <Button
            variant={"ghost"}
            className="hover:bg-destructive delay-100 transition-all group"
            onClick={() => {
              setUpdatedLinks((prev) => {
                const newLinks = prev.filter((_, index) => {
                  return index !== i;
                });

                return newLinks;
              });
            }}
            disabled={updatedLinks.length <= 1}
          >
            <XIcon
              className="group-hover:text-white delay-100 transition-all text-destructive"
              size={24}
            />
          </Button>
        </div>

        <div className="flex flex-col gap-y-4">
          <p className="font-medium">Select Icon</p>

          <div className="flex gap-x-5 items-center">
            <FacebookIcon
              className="text-indigo-600 hover:scale-105 delay-100 transition-all cursor-pointer"
              size={18}
              onClick={() => handleUpdateIcon(i, "facebook")}
            />
            <InstagramIcon
              className="text-rose-600 hover:scale-105 delay-100 transition-all cursor-pointer"
              size={18}
              onClick={() => handleUpdateIcon(i, "instagram")}
            />
            <TwitterIcon
              className="text-blue-500 hover:scale-105 delay-100 transition-all cursor-pointer"
              size={18}
              onClick={() => handleUpdateIcon(i, "twitter")}
            />
            <LinkedinIcon
              className="text-indigo-800 hover:scale-105 delay-100 transition-all cursor-pointer"
              size={18}
              onClick={() => handleUpdateIcon(i, "linkedin")}
            />
            <LucideLinkIcon
              size={18}
              onClick={() => handleUpdateIcon(i, "other")}
              className="text-primary hover:scale-105 delay-100 transition-all cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
