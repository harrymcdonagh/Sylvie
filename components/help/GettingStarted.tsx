"use client";
import { Reveal } from "@/components/utils/Reveal";

const GettingStarted = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
    <div>
      <Reveal>
        <h2 className="text-black text-3xl md:text-4xl font-bold mb-6">
          Getting Started<span className="text-orange-400">.</span>
        </h2>
        <p className="text-neutral-700 text-lg mb-4">
          Sylvie is here to make your academic journey smoother. Whether you need help
          with coursework, campus information, or just someone to talk to, Sylvie is
          available 24/7 to provide support.
        </p>
        <p className="text-neutral-700 text-lg">
          This guide will help you understand how to use Sylvie effectively, troubleshoot
          common issues, and get the most out of your conversations with our AI assistant.
        </p>
      </Reveal>
    </div>
    <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
      <img
        src="/sylvie-cartoon.jpg"
        alt="Student using Sylvie on laptop"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
);

export default GettingStarted;
