import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import { getContactCompanyId } from "@/actions/services/contact";
import EmptyContactsCard from "@/components/services/contacts/EmptyContactsCard";
import MainComponent from "@/components/services/espace/MainComponent";
import { ADMIN_ROLES } from "@/utils/admin";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  if (ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  const companies = await getDeliveryCompany();

  //   NO companies found

  if (!companies || companies.length < 1) {
    return null;
  }

  // COMPANIES EXIST

  const company = companies[0];

  if (!company || company.ownerId !== user.id) {
    return null;
  }

  const contacts = await getContactCompanyId(company.id);

  return (
    <div>
      {/* No contacts */}
      {!contacts && <EmptyContactsCard defaultActive={!contacts} />}

      <MainComponent company={company} />
    </div>
  );
}

export default page;
