"use client";
import { DeliveryCompany } from "@prisma/client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { capitaliseFirstLetter } from "@/utils/function";

type Props = {
  company: DeliveryCompany;
};

const HeaderNavigation = ({ company }: Props) => {
  return (
    <header
      className="md:hidden fixed
    left-0 ring-0 top-0 z-50 w-full"
    >
      <div
        className="w-full flex items-center 
      justify-between backdrop-blur-lg
       p-4"
      >
        <h2 className="max-w-56 line-clamp-1 font-semibold">
          Espace {capitaliseFirstLetter(company.name ?? "Companie")}
        </h2>

        <SheetNav company={company} />
      </div>
    </header>
  );
};

export default HeaderNavigation;

const SheetNav = ({ company }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="w-9 flex flex-col gap-1.5">
          <span className="h-[3.5px] w-full bg-black shrink-0" />
          <span className="h-[3.5px] w-full bg-black shrink-0" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
