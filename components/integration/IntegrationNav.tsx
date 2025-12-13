"use client";

import Link from "next/link";
import { roboto } from "@/lib/fonts";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Mes Identifiants API", href: "/integration/credentials" },
  { label: "Documentation", href: "/integration/documentation" },
  { label: "Exemples de requêtes", href: "/integration/test" },
];

export default function IntegrationNav() {
  const pathname = usePathname();

  return (
    <header className="border-b p-4 bg-gray-50">
      <h1 className={`${roboto.className} text-3xl font-bold`}>
        API & Integrations
      </h1>

      <nav className="mt-4 flex gap-4 flex-wrap">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
