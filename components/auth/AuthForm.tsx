"use client";

import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const AuthForm = () => {
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

  return (
    <Button
      type="button"
      onClick={handleGoogleSignIn}
      variant="outline"
      className="group w-full flex items-center justify-center gap-3 py-6 
        rounded-xl border border-gray-200 bg-white text-gray-800 
      hover:bg-gray-50 hover:shadow-md active:scale-[0.98]
      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 
      dark:hover:bg-gray-700 transition-all duration-200"
    >
      <FaGoogle className="text-lg text-blue-500 group-hover:scale-110 transition-transform duration-200" />
      <span className="font-medium tracking-wide">Continuer avec Google</span>
    </Button>
  );
};

export default AuthForm;
