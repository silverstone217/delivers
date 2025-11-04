import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { roboto } from "@/lib/fonts";
import React from "react";

function page() {
  return (
    <div>
      <Header />
      <h3 className={`${roboto.className} text-3xl p-4 md:p-6 font-bold`}>
        <strong>API et Integration</strong>
      </h3>

      <main className="min-h-[90vh]"></main>

      <Footer />
    </div>
  );
}

export default page;
