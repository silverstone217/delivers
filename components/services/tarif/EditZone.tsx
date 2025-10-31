"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { CommuneQuartierSelection } from "./AddForm";
import EditZoneForm from "./EditZoneForm";

type EditZoneDialogProps = {
  zoneId: string;
  companyId: string;
  initialName: string;
  initialSelection: CommuneQuartierSelection[];
};

export default function EditZoneDialog({
  zoneId,
  companyId,
  initialName,
  initialSelection,
}: EditZoneDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="grow ">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 grow w-full"
        >
          <Edit className="w-4 h-4" /> Modifier
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl w-full max-h-dvh overflow-x-hidden overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Modifier la zone {initialName.toUpperCase()}
          </DialogTitle>
          <DialogDescription>
            Refaites le choix des communes et quartiers ou modifiez le nom de la
            zone.
          </DialogDescription>
        </DialogHeader>

        <EditZoneForm
          zoneId={zoneId}
          companyId={companyId}
          initialName={initialName}
          initialSelection={initialSelection}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
