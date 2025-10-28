import type { Metadata } from "next";
import "./globals.css";
import { sourceSans } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Delivers ",
  description: "Comparateur de prix de livraison en ligne au Congo+",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${sourceSans.className} antialiased scroll-smooth`}>
        <AuthProvider>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
