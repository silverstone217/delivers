import GetStartedSection from "@/components/home/GetStartedSection";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="w-full">
      {/* HEADER */}
      <Header />
      {/* CONTENT */}
      <main>
        <Hero />

        {/* GET STARTED */}
        <GetStartedSection />
      </main>

      {/* FOOTER */}
      <footer></footer>
    </div>
  );
}
