"use client";

import React from "react";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import IntegrationNav from "@/components/integration/IntegrationNav";

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <IntegrationNav />

      <main className="flex-1 p-6 bg-white min-h-[60vh]">{children}</main>

      <div className="mt-auto" />
      <Footer />
    </div>
  );
}
