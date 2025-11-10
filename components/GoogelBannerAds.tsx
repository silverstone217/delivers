"use client";
import {
  //  GOOGLE_ADSENSE_API_KEY, GOOGLE_ADSLOT,
  HERO_IMAGE,
} from "@/lib/env";
// import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AdBanner() {
  // const insRef = useRef<HTMLDivElement>(null);
  // const [adError, setAdError] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const ins = insRef.current?.querySelector(
  //     "ins.adsbygoogle"
  //   ) as HTMLElement | null;
  //   if (!ins) return;

  //   // Initialiser adsbygoogle
  //   try {
  //     (window as any).adsbygoogle = (window as any).adsbygoogle || [];
  //     (window as any).adsbygoogle.push({});
  //   } catch (err) {
  //     console.error("AdSense error:", err);
  //     setAdError(true);
  //   }
  // }, []);

  return (
    <div
      //  ref={insRef}
      className="w-full bg-secondary/50 rounded-lg"
    >
      {/* {!adError ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={GOOGLE_ADSENSE_API_KEY}
          data-ad-slot={GOOGLE_ADSLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      ) : ( */}
      <Image
        src={HERO_IMAGE}
        priority
        className="w-full object-cover rounded-lg shadow-xl min-h-full animate-fadeInUp transition-all duration-300"
        alt="HERO IMAGE : fallback"
        width={1200}
        height={1000}
      />
      {/* )} */}
    </div>
  );
}
