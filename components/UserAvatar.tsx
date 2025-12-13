"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { roboto } from "@/lib/fonts";

type UserAvatarProps = {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

const UserAvatar = ({ name, image, size = "md" }: UserAvatarProps) => {
  const reduceName = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <Avatar className={sizeMap[size]}>
      {image && image.trim() !== "" ? (
        <AvatarImage
          src={image}
          alt={name ?? "User avatar"}
          className="bg-gray-200 border-gray-700 border"
        />
      ) : (
        <AvatarFallback
          className={`${roboto.className} font-bold text-lg flex items-center justify-center bg-gray-200 text-gray-700`}
        >
          {reduceName}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
