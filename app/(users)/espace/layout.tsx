import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import NoServiceFound from "@/components/services/NoServiceFound";
import React, { ReactNode } from "react";

type EspaceLayoutProps = {
  children: ReactNode;
};

async function EspaceLayout({ children }: EspaceLayoutProps) {
  const user = await getUser();

  if (!user) return null;

  const companies = await getDeliveryCompany();

  //   NO companies found

  if (!companies || companies.length < 1) {
    return <NoServiceFound />;
  }

  // COMPANIES EXIST

  const company = companies[0];

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default EspaceLayout;
