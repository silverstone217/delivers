import { getUser } from "@/actions/authAction";
import { getAdminsCompanyById } from "@/actions/services";
import MainComponent from "@/components/services/espace/MainComponent";
import { ADMIN_ROLES } from "@/utils/admin";
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

  if (!company) {
    return <p>{message}</p>;
  }

  return (
    <div>
      <MainComponent company={company} />
    </div>
  );
}

export default page;
