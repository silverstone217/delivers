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
      </main>

      {/* FOOTER */}
      <footer></footer>
    </div>

    // <main className="max-w-7xl mx-auto p-6 flex gap-3 flex-col">
    //   <h2 className={`${roboto.className} text-5xl font-bold`}>DELIVERS</h2>
    //   <p className="text-lg ">
    //     Bienvenue sur <span>{capitaliseFirstLetter(SITE_NAME)}</span>, le
    //     comparateur de prix de livraison en ligne au Congo !
    //   </p>
    //   <Link href={"/espace"} className="w-fit">
    //     <Button>
    //       <span>Commencer maintenant</span>
    //       <ChevronRight />
    //     </Button>
    //   </Link>
    // </main>
  );
}
