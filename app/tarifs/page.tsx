import CheckFormComponent from "@/components/home/CheckTarifComponent";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import React from "react";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;

  return (
    <div className="w-full">
      {/* HEADER */}
      <Header />
      {/* CONTENT */}
      <CheckFormComponent initialSearchParams={params} />

      <Footer />
    </div>
  );
}

export default Page;
