import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
import ForCompanies from "@/components/home/ForCompanies";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div className="w-full">
      {/* HEADER */}
      <Header />
      {/* CONTENT */}
      <main>
        <Hero />

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* FOR COMPANIES */}
        <ForCompanies />

        {/* CONTACTS */}

        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
