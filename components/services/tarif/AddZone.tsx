"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type AddZoneProps = {
  companyId: string;
  className?: string;
};

const AddZone = ({ className }: AddZoneProps) => {
  const router = useRouter();
  return (
    <Button
      className={`${className}`}
      onClick={() => router.push("/espace/zones/ajouter")}
    >
      <PlusCircle className="w-5 h-5" /> Ajouter une zone
    </Button>
  );
};

export default AddZone;
