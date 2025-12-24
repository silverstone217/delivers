"use client";
import { SITE_NAME } from "@/lib/env";
import { capitaliseFirstLetter } from "@/utils/function";
import { HomeLinks } from "@/utils/links";
import Link from "next/link";
import React from "react";
import AvatarLogin from "./AvatarLogin";
import { SheetNav } from "../services/HeaderNavigation";
import { ADMIN_ROLES } from "@/utils/admin";
import useCurrentUser from "@/hooks/useCurrentUser";

const Header = () => {
  const user = useCurrentUser();

  return (
    <header
      className="w-full flex items-center h-14 shadow justify-between bg-secondary/30
    px-4 md:px-6
    "
    >
      {/* TOP HEADER */}
      <div className="w-full flex items-center justify-between mx-auto max-w-7xl">
        <Link href={"/"}>
          <h2 className="max-w-56 line-clamp-1 font-bold text-lg text-black">
            {capitaliseFirstLetter(SITE_NAME)}
          </h2>
        </Link>

        {/* LINKS */}
        <nav className=" md:flex items-center gap-2.5 hidden">
          {HomeLinks.map((link, idx) => {
            return (
              <Link
                href={link.link}
                key={idx}
                className="text-sm font-medium
              hover:underline underline-offset-1
              transition-all ease-in-out duration-300
              "
              >
                <h4>{link.label}</h4>
              </Link>
            );
          })}

          {/* ADMIN */}
          {user && ADMIN_ROLES.includes(user.role) && (
            <Link
              href={"/admin/services"}
              className="text-sm font-medium
              hover:underline underline-offset-1
              transition-all ease-in-out duration-300
              "
            >
              <h4>Admin</h4>
            </Link>
          )}
        </nav>

        <div className=" md:flex items-center gap-2.5 hidden">
          {/* login */}
          <AvatarLogin />
        </div>

        {/* SHEET SMALL SCREEN */}
        <div className="md:hidden">
          <SheetNav dataLinks={HomeLinks} />
        </div>
      </div>
    </header>
  );
};

export default Header;
