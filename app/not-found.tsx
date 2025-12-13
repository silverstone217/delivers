"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Illustration style moderne */}
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-primary/40 blur-2xl opacity-30" />
        <div className="relative flex items-center justify-center w-full h-full">
          <svg
            width="180"
            height="180"
            viewBox="0 0 24 24"
            className="text-primary opacity-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M3 3h18v13H3z" />
            <path d="M5 16h14l-2 4H7l-2-4z" />
            <path d="M9 8h6" />
          </svg>
        </div>
      </div>

      {/* Texte principal */}
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        Page introuvable
      </h1>

      <p className="text-gray-600 max-w-md mt-3 text-lg">
        Cette route {`n'existe`} pas ou a été déplacée. Vérifiez {`l'URL`} ou
        revenez en lieu sûr.
      </p>

      {/* CTA */}
      <Link href="/" className="mt-8">
        <Button className="px-6 py-5 text-base font-medium flex items-center gap-2">
          Retour à l’accueil
          <MoveRight className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
