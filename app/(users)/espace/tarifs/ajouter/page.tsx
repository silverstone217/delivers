import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import { getZones } from "@/actions/zones";
import AddTarifForm from "@/components/services/tarifs/AddTarifForm";
import { roboto } from "@/lib/fonts";
import React from "react";

async function page() {
  const user = await getUser();
  if (!user) return null;

  //   GET COMPANIE
  const companies = await getDeliveryCompany();
  if (!companies || companies.length < 1) return null;

  const company = companies[0];
  if (!company || company.ownerId !== user.id) return null;

  //   GET ZONES
  const zones = await getZones(company.id);

  if (!zones || zones.length < 1) return null;

  return (
    <div className="w-full px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <h3 className={`${roboto.className} text-2xl font-semibold`}>
          Ajouter une nouvelle relation intra-zone
        </h3>
        <div className="flex flex-col gap-2 w-full md:w-auto max-w-lg">
          <p className="text-muted-foreground">
            Remplisser les champs ci-dessous afin {`d'ajouter`} un tarif de
            livraion(destinataire et destination)
          </p>
        </div>
      </div>

      {/* FORMS */}
      <AddTarifForm companyId={company.id} zones={zones} />
    </div>
  );
}

export default page;
