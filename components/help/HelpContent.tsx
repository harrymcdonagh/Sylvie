"use client";
import GettingStarted from "./GettingStarted";
import UsageGuides from "./UsageGuides";
import FaqSection from "./FaqSection";
import NeedHelp from "./NeedHelp";
import Troubleshooting from "./Troubleshooting";
import Reveal from "../utils/Reveal";

const HelpContent = () => (
  <div className="bg-neutral-50 py-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <GettingStarted />
      <h2 className="text-black text-3xl md:text-4xl font-bold mb-12 text-center">
        How to Use Sylvie<span className="text-orange-400">.</span>
      </h2>
      <UsageGuides />
      <FaqSection />
      <NeedHelp />
      <Reveal>
        <h2 className="text-black text-3xl md:text-4xl font-bold mb-8 text-center">
          Troubleshooting Tips<span className="text-orange-400">.</span>
        </h2>
      </Reveal>
      <Troubleshooting />
    </div>
  </div>
);

export default HelpContent;
