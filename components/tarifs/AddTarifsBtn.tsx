"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const AddTarifsBtn = () => {
  return (
    <Link href={"/espace/tarifs/ajouter"}>
      <Button>
        <PlusCircle className="shrink-0 mr-2" />
        Ajouter un tarif ou une relation
      </Button>
    </Link>
  );
};

export default AddTarifsBtn;
