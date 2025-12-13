import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import { getContactCompanyId } from "@/actions/services/contact";
import EditContactsForm from "@/components/services/contacts/EditContactsForm";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

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
      {/* CONTACTS */}
      <EditContactsForm companyId={company.id} contacts={contacts} />
    </div>
  );
}

export default page;
