"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AvatarLogin = () => {
  const user = useCurrentUser();

  const router = useRouter();

  const handleGoogleSignIn = () => {
    try {
      signIn("google", { callbackUrl: "/" });
      toast.success("Redirection vers Google pour la connexion...");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la connexion Google :", error);
      toast.error("Erreur lors de la connexion avec Google.");
    }
  };

  if (!user) {
    return (
      <Button variant={"ghost"} onClick={handleGoogleSignIn}>
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
