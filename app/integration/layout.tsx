"use client";

import Link from "next/link";
import { roboto } from "@/lib/fonts";
import React from "react";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

const navLinks = [
  //   { label: "Accueil API", href: "/integration" },
  { label: "Mes Identifiants API", href: "/integration/credentials" },
  { label: "Documentation", href: "/integration/documentation" },
  { label: "Exemples de requêtes", href: "/integration/test" },
  // { label: "Paramètres", href: "/integration/settings" }, // Optionnel
];

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* SECOND HEADER */}
      <header className="border-b p-4 bg-gray-50">
        <h1 className={`${roboto.className} text-3xl font-bold`}>
          API & Integrations
        </h1>
        <nav className="mt-4 flex gap-4 flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-md text-sm font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 p-6 bg-white min-h-[60vh]">{children}</main>

      <div className="mt-auto" />
      <Footer />
    </div>
  );
}
