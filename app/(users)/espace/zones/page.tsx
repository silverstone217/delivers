import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import { getZones } from "@/actions/zones";
import AddZone from "@/components/services/zones/AddZone";
import { GroupZoneCard } from "@/components/services/zones/ZoneCard";
import { Card } from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import React, { Suspense } from "react";

async function page() {
  const user = await getUser();
  if (!user) return null;

  const companies = await getDeliveryCompany();
  if (!companies || companies.length < 1) return null;

  const company = companies[0];
  if (!company || company.ownerId !== user.id) return null;

  const zones = await getZones(company.id);

  return (
    <div className="w-full px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-10">
        <h3 className={`${roboto.className} text-2xl font-semibold`}>
          MES ZONES
        </h3>
        <div className="flex flex-col gap-2 w-full md:w-auto max-w-lg">
          <p className="text-muted-foreground">
            Gérez vos zones de livraison : ajouter, modifier ou supprimer.
          </p>
          <AddZone
            className="flex items-center gap-2 md:w-auto w-full mt-2 md:mt-0 "
            companyId={company.id}
          />
        </div>
      </div>

      {/* Liste des zones */}
      {zones && zones.length > 0 ? (
        <Suspense fallback={<p>Chargement...</p>}>
          <GroupZoneCard companyId={company.id} zones={zones} />
        </Suspense>
      ) : (
        <Card className="border border-muted/30 shadow-sm rounded-2xl p-6 text-center">
          <h2 className="text-lg font-medium text-muted-foreground">
            Aucune zone trouvée
          </h2>
          <AddZone
            className="mt-1 flex items-center justify-center gap-2 mx-auto"
            companyId={company.id}
          />
        </Card>
      )}
    </div>
  );
}

export default page;
