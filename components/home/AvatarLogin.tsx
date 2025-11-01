"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import UserAvatar from "../UserAvatar";

const AvatarLogin = () => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <Button variant={"ghost"}>
        <UserCircle className="shrink-0 size-5" />
        se connecter
      </Button>
    );
  }

  return (
    <Link href={"/espace"}>
      <UserAvatar image={user.image} name={user.name} size="md" />
    </Link>
  );
};

export default AvatarLogin;
