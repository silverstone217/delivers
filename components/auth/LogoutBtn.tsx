"use client";
import { LogOut } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
      router.refresh();
    } catch (error) {
      toast.error("Une erreur survenue, veuillez reessayer plus tard!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={"destructive"} disabled={loading} onClick={handleSignout}>
      <span>Deconnexion</span>
      <LogOut />
    </Button>
  );
};

export default LogoutBtn;
