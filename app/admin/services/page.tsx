import { getUser } from "@/actions/authAction";
import { getAdminsCompanies } from "@/actions/services";
import AddServiceForm from "@/components/admin/services/AddServiceForm";
import CompanyCard from "@/components/admin/services/CompanyCard";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";

import React from "react";

async function page() {
  const user = await getUser();

  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  const dataResult = await getAdminsCompanies();

  const { data, error, message } = dataResult;

  if (error) {
    return (
      <div className="py-8">
        <p className="text-destructive/80 font-semibold">{message}</p>
      </div>
    );
  }

  const companies = data;

  return (
    <div>
      {/* Header */}
      <section className="flex flex-col gap-4 mb-10">
        <h3 className={`${roboto.className} text-2xl font-semibold`}>
          Les services de livraison
        </h3>
        <div className="flex flex-col gap-2 w-full md:w-auto max-w-lg">
          <p className="text-muted-foreground">
            Gérez de services de livraions : ajouter, modifier ou supprimer.
          </p>

          {/* ADD COMPANIE Pop up*/}
          <AddServiceForm />
        </div>
      </section>

      {/* LISTS */}
      <section className="w-full py-6 pb-20 px-4">
        <h2 className="font-bold text-xl mb-4">Liste de services</h2>

        {/* NO COMP */}
        {companies.length < 1 && (
          <div>
            <p className="text-center text-muted-foreground py-6">
              Aucun service disponible
            </p>
          </div>
        )}

        {/* LIST */}
        <div
          className="grid gap-5
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4"
        >
          {companies.map((c) => (
            <CompanyCard
              key={c.companyId}
              companyId={c.companyId}
              companyName={c.companyName}
              companyLogo={c.companyLogo}
              contacts={c.contacts}
              createdAt={c.createdAt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default page;
