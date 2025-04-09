"use client";

import React from "react";
import { Reveal } from "@/components/utils/Reveal";
import { OutlineButton } from "@/components/buttons/OutlineButton";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div
        className="relative min-h-screen"
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
              Meet Sylvie<span className="text-orange-400">.</span>
            </h1>
          </Reveal>
          <Reveal>
            <h2 className="pointer-events-auto mt-2 text-xl sm:text-2xl text-zinc-300 md:text-4xl">
              Your{" "}
              <span className="font-semibold text-orange-400">
                student support chatbot
              </span>
            </h2>
          </Reveal>
          <Reveal>
            <Link href="/chat">
              <OutlineButton className="pointer-events-auto before:bg-orange-700 hover:text-white hover:border-orange-700 bg-orange-500 text-zinc-100 border-orange-500 md:mt-3">
                Let&apos;s Chat
              </OutlineButton>
            </Link>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Hero;
