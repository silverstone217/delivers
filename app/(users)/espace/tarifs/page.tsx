import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import { getTarifsById } from "@/actions/tarifs";
import { getZones } from "@/actions/zones";
import { TarifCards } from "@/components/services/tarifs/TarifCard";
import AddTarifsBtn from "@/components/tarifs/AddTarifsBtn";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

async function page() {
  const user = await getUser();
  if (!user) return null;

  if (ADMIN_ROLES.includes(user.role)) {
    redirect("/admin/services");
  }

  //   GET COMPANIE
  const companies = await getDeliveryCompany();
  if (!companies || companies.length < 1) return null;

  const company = companies[0];
  if (!company || company.ownerId !== user.id) return null;

  //   GET ZONES
  const zones = await getZones(company.id);

  if (!zones || zones.length < 1) return null;

  //   GET TARIFS
  const { tarifs } = await getTarifsById(company.id);

  return (
    <div className="w-full px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <h3 className={`${roboto.className} text-2xl font-semibold`}>
          Les Tarifs ou Relations intra-zones
        </h3>
        <div className="flex flex-col gap-2 w-full md:w-auto max-w-lg">
          <p className="text-muted-foreground">
            Gérez vos tarifs entre zones de livraison : ajouter, modifier ou
            supprimer.
          </p>
          <AddTarifsBtn />
        </div>
      </div>

      {/* NO TARIFS */}
      {tarifs.length < 1 && (
        <div
          className="border-dashed w-full max-w-lg mx-auto h-32 border-2 bg-secondary/30 shadow
        flex flex-col justify-center items-center
        "
        >
          <h2 className={`${roboto.className} text-lg font-medium opacity-75`}>
            Aucune relation intra-zone trouvée
          </h2>
        </div>
      )}

      {/* TARIFS LISTS */}
      {tarifs.length && (
        <Suspense fallback={<p>Chargement...</p>}>
          <TarifCards tarifs={tarifs} />
        </Suspense>
      )}
    </div>
  );
}

export default page;
