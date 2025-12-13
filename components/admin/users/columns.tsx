"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserRow } from "@/types/data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import UserActions from "./user-actions";

export const columns: ColumnDef<UserRow>[] = [
  {
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const img = row.original.image;
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
          {img ? (
            <Image src={img} alt="avatar" width={40} height={40} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              N/A
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => row.original.name ?? "—",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.original.role === "ADMIN"
            ? "bg-blue-500/20 text-blue-700"
            : row.original.role === "SUPER_ADMIN"
            ? "bg-red-500/20 text-red-700"
            : "bg-green-500/20 text-green-700"
        }`}
      >
        {row.original.role.replace(/_/g, " ")}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Créé le",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd MMM yyyy", {
        locale: fr,
      }),
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
