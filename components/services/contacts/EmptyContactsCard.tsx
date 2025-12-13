"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type EmptyContactsCardProps = {
  defaultActive?: boolean; // actif par défaut si non précisé
};

const EmptyContactsCard = ({
  defaultActive = true,
}: EmptyContactsCardProps) => {
  const [active, setActive] = useState(defaultActive);

  if (!active) return null; // si désactivé → ne rien afficher

  return (
    <Card
      className={cn(
        "relative w-full max-w-sm mx-auto border border-dashed border-muted-foreground/30",
        "bg-linear-to-br from-muted/30 to-background shadow-sm hover:shadow-md",
        "transition-all duration-300 rounded-2xl"
      )}
    >
      {/* Bouton de fermeture (croix) */}
      <button
        onClick={() => setActive(false)}
        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Fermer la carte"
      >
        <X className="w-4 h-4" />
      </button>

      <CardHeader className="flex flex-col items-center text-center space-y-3 mt-2">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Mail className="w-6 h-6" />
        </div>
        <CardTitle className="text-base font-semibold">
          Aucun contact trouvé
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Vous n’avez pas encore ajouté les contacts de votre service.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center mt-2">
        <Link href="/espace/contacts" className="w-full">
          <Button className="w-full gap-2">
            <PlusCircle className="w-4 h-4" />
            Ajouter maintenant
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmptyContactsCard;
