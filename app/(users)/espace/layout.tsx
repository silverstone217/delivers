import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import AsideBarNavigation from "@/components/services/AsideBarNavigation";
import HeaderNavigation from "@/components/services/HeaderNavigation";
import NoServiceFound from "@/components/services/NoServiceFound";
import { ADMIN_ROLES } from "@/utils/admin";
import React, { ReactNode } from "react";

type EspaceLayoutProps = {
  children: ReactNode;
};

async function EspaceLayout({ children }: EspaceLayoutProps) {
  const user = await getUser();

  if (!user) return null;

  if (ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  const companies = await getDeliveryCompany();

  //   NO companies found

  if (!companies || companies.length < 1) {
    return <NoServiceFound />;
  }

  // COMPANIES EXIST

  const company = companies[0];

  if (company.ownerId !== user.id) {
    return <div>Non authorise!</div>;
  }

  return (
    <div className="relative w-full">
      {/* HEADER SMALL SCREEN */}
      <HeaderNavigation company={company} />

      {/* ASIDE BIG SCREEN */}
      <AsideBarNavigation company={company} />
      <main
        className=" md:pl-[214px]
      p-4 md:pt-4 pt-16
      "
      >
        {children}
      </main>
    </div>
  );
}

export default EspaceLayout;
