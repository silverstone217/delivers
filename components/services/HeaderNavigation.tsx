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
import useCurrentUser from "@/hooks/useCurrentUser";
import LogoutBtn from "../auth/LogoutBtn";
import UserAvatar from "../UserAvatar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { EspacesLinks } from "@/utils/links";

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
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="w-9 flex flex-col gap-1.5">
          <span className="h-[3.5px] w-full bg-black shrink-0" />
          <span className="h-[3.5px] w-full bg-black shrink-0" />
        </div>
      </SheetTrigger>
      <SheetContent className="h-dvh overflow-x-hidden overflow-y-auto pt-6">
        <SheetHeader hidden>
          <SheetTitle>DELIVERS</SheetTitle>
          <SheetDescription>
            Votre espace de service de livraison
          </SheetDescription>
        </SheetHeader>

        {/* contents */}

        {/* LINKS */}
        <nav
          className="w-full flex flex-col gap-2 flex-1 
          pt-4 px-2"
        >
          {EspacesLinks.map((link, idx) => {
            return (
              <Link
                key={idx}
                href={link.link}
                className="w-full flex items-center gap-4
                   px-4 py-2 hover:bg-secondary text-sm 
                   font-medium
                   transition-all duration-300 ease-in-out
                "
              >
                <link.icon className="shrink-0" size={25} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* separator */}
        <Separator />
        <div className="w-full flex flex-col gap-4 py-4 px-6">
          {/* PROFILE */}
          <div className="w-full flex items-center gap-1.5">
            <UserAvatar name={user.name} image={user.image} />
            <div className="flex flex-col text-xs">
              <span className="text-sm line-clamp-1 font-medium capitalize">
                {user.name}
              </span>
              <span className=" line-clamp-1 text-gray-500">{user.email}</span>
            </div>
          </div>

          {/* DECONNEXION BTN */}
          <LogoutBtn />
        </div>
      </SheetContent>
    </Sheet>
  );
};
