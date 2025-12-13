import { getUser } from "@/actions/authAction";
import { columns } from "@/components/admin/users/columns";
import { DataTable } from "@/components/admin/users/data-table";
import { prisma } from "@/lib/prisma";
import { ADMIN_ROLES } from "@/utils/admin";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user || !ADMIN_ROLES.includes(user.role)) {
    return null;
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Liste des utilisateurs</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default page;
