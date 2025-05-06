"use client";
import { Reveal } from "@/components/utils/Reveal";

const AboutHero = () => (
  <div
    className="relative min-h-[40vh]"
    style={{
      backgroundImage: "url(/bg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/90 to-neutral-950/50" />
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
      <Reveal>
        <h1 className="pointer-events-auto text-4xl sm:text-6xl font-black text-zinc-100 md:text-8xl">
          About Sylvie<span className="text-orange-400">.</span>
        </h1>
      </Reveal>
      <Reveal>
        <h2 className="pointer-events-auto mt-2 text-xl sm:text-2xl text-zinc-300 md:text-4xl max-w-3xl mx-auto">
          Designed to make{" "}
          <span className="font-semibold text-orange-400">student life easier</span>
        </h2>
      </Reveal>
    </div>
  </div>
);

export default AboutHero;
