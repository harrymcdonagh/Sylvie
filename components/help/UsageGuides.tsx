"use client";
import { Reveal } from "@/components/utils/Reveal";
import { usageGuides } from "./helpData";

const UsageGuides = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
    {usageGuides.map((guide, index) => (
      <Reveal key={index}>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-orange-500 text-xl">{guide.icon}</span>
          </div>
          <h3 className="text-black text-xl font-semibold mb-3">{guide.title}</h3>
          <p className="text-neutral-600">{guide.description}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

export default UsageGuides;
