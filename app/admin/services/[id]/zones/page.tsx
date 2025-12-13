import { getUser } from "@/actions/authAction";
import { getAdminsCompanyById } from "@/actions/services";
import { getZones } from "@/actions/zones";
import { GroupZoneCard } from "@/components/services/zones/ZoneCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import { ArrowLeft, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: Props) {
  const { id } = await params;

  if (!id) {
    redirect("/admin/services");
  }

  const user = await getUser();

  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  const dataResult = await getAdminsCompanyById(id);

  const { data, error, message } = dataResult;

  if (error) {
    return (
      <div className="py-8">
        <p className="text-destructive/80 font-semibold">{message}</p>
      </div>
    );
  }

  const company = data;

  // NO COMPANY FOUND WITH GIVEN ID
  if (!company) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div
          className="max-w-sm w-full p-4 py-10 flex flex-col
         gap-2.5 shadow-md rounded-md mx-auto bg-secondary/20
         items-center justify-center
         "
        >
          <p className={`text-4xl ${roboto.className} font-bold`}>404</p>
          <p className="text-gray-500 text-sm">Aucun service trouve avec ID</p>
          <Link href={"/admin/services"} className="w-full">
            <Button className="w-full">
              <ArrowLeft className="shrink-0 mr-1" /> Retour
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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

          <Link href={`/admin/services/${company.id}/zones/ajouter`}>
            <Button className="flex items-center gap-2 max-w-md w-full mt-2 md:mt-0 ">
              <PlusCircle className="w-5 h-5" /> Ajouter une zone
            </Button>
          </Link>
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
        </Card>
      )}
    </div>
  );
}

export default page;
