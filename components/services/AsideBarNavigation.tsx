"use client";
import { EspacesLinks } from "@/utils/links";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAvatar from "../UserAvatar";
import LogoutBtn from "../auth/LogoutBtn";
import { DeliveryCompany } from "@prisma/client";
import { capitaliseFirstLetter } from "@/utils/function";
import { SITE_NAME } from "@/lib/env";

type Props = {
  company: DeliveryCompany;
};

const AsideBarNavigation = ({ company }: Props) => {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <aside
      className="w-[200px] fixed left-0 top-0 bottom-0
  z-40 bg-secondary/20 shadow md:block hidden
  transition-all duration-300 ease-in-out 
  "
    >
      {/* container */}
      <div
        className="py-4 md:py-6 flex w-full h-screen
      transition-all duration-300 ease-in-out 
      overflow-x-hidden overflow-y-auto flex-col
      "
      >
        {/* ESPACE COMPANY */}
        <Link href={"/"}>
          <h2 className="text-md font-bold px-6 mb-4 text-black">
            {capitaliseFirstLetter(SITE_NAME)}
            {/* <span>Espace</span>
          <span>{capitaliseFirstLetter(company.name)}</span> */}
          </h2>
        </Link>

        {/* separator */}
        <Separator />

        {/* LINKS */}
        <nav className="w-full flex flex-col gap-2 flex-1 pt-4 px-2">
          {EspacesLinks.map((link, idx) => {
            return (
              <Link
                key={idx}
                href={link.link}
                className="w-full flex items-center gap-4
                px-4 py-2 hover:bg-secondary text-sm font-medium
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
      </div>
    </aside>
  );
};

export default AsideBarNavigation;
