import { getUser } from "@/actions/authAction";
import { getAdminsCompanyById } from "@/actions/services";
import ActionsCompany from "@/components/admin/services/ActionsCompany";
import CompanyModifyInfo from "@/components/admin/services/CompanyModifyInfo";
import ModifyCompanyContacts from "@/components/admin/services/ModifyCompanyContacts";
import { Button } from "@/components/ui/button";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

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

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* INfo */}
      <CompanyModifyInfo company={company} />

      {/* CONTACTS */}
      <ModifyCompanyContacts company={company} contacts={company.contact} />

      {/* ACtIONS */}
      <ActionsCompany company={company} />
    </div>
  );
}

export default page;
