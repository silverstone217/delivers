import CheckFormComponent from "@/components/home/CheckTarifComponent";
import Header from "@/components/home/Header";
import React from "react";

async function page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const communeDepart = searchParams.communeDepart;
  const quartierDepart = searchParams.quartierDepart;
  const communeArrivee = searchParams.communeArrivee;
  const quartierArrivee = searchParams.quartierArrivee;
  const width = searchParams.width;
  const weight = searchParams.weight;
  const length = searchParams.length;
  const isExpress = searchParams.isExpress === "true";

  return (
    <div className="w-full">
      {/* HEADER */}
      <Header />
      {/* CONTENT */}
      <CheckFormComponent />
    </div>
  );
}

export default page;
