"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTransition } from "react";
import { UserRow } from "@/types/data";
import { deleteUserById, updateUserRole } from "@/actions/users";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserActionsProps {
  user: UserRow;
}

export default function UserActions({ user }: UserActionsProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenRole(true)}>
            Modifier rôle
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setOpenDelete(true)}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeRoleDialog
        open={openRole}
        onOpenChange={setOpenRole}
        user={user}
      />
      <DeleteUserDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        user={user}
      />
    </>
  );
}

// CHANGE ROLE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ChangeRoleDialog({ user, open, onOpenChange }: any) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (role: "USER" | "ADMIN") => {
    startTransition(async () => {
      const result = await updateUserRole(user.id, role);

      if (result.error) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);

      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Modifier le rôle de {user.name ?? "Utilisateur"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button disabled={isPending} onClick={() => handleChange("USER")}>
            USER
          </Button>
          <Button
            disabled={isPending}
            onClick={() => handleChange("ADMIN")}
            variant="secondary"
          >
            ADMIN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// DELETE USER
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DeleteUserDialog({ user, open, onOpenChange }: any) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUserById(user.id);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Cette action est <strong>irréversible</strong>. L&apos;utilisateur
          sera supprimé définitivement.
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
