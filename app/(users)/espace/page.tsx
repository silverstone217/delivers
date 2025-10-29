import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import MainComponent from "@/components/services/espace/MainComponent";
import { roboto } from "@/lib/fonts";
import { capitaliseFirstLetter, formatJoinedDate } from "@/utils/function";
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

  return (
    <div>
      <MainComponent company={company} />
    </div>
  );
}

export default page;
