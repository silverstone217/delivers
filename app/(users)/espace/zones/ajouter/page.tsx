import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
// import { getZones } from "@/actions/zones";
import AddForm from "@/components/services/zones/AddForm";
import { roboto } from "@/lib/fonts";
import React from "react";

async function page() {
  const user = await getUser();
  if (!user) return null;

  const companies = await getDeliveryCompany();
  if (!companies || companies.length < 1) return null;

  const company = companies[0];
  if (!company || company.ownerId !== user.id) return null;

  //   const zones = await getZones(company.id);

  return (
    <div className="w-full px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <h3 className={`${roboto.className} text-2xl font-semibold`}>
          Ajouter une nouvelle zone
        </h3>
        <div className="flex flex-col gap-2 w-full md:w-auto max-w-lg">
          <p className="text-muted-foreground">
            Remplisser les champs ci-dessous afin {`d'ajouter`} une zone de
            livraion(destinataire et destination)
          </p>
        </div>
      </div>

      {/* FORMS */}
      <AddForm companyId={company.id} />
    </div>
  );
}

export default page;
