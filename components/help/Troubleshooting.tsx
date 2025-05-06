"use client";
import { Reveal } from "@/components/utils/Reveal";
import { troubleshootingTips } from "./helpData";

const Troubleshooting = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {troubleshootingTips.map((tip, index) => (
      <Reveal key={index}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-black text-xl font-semibold mb-3 flex items-center">
            <span className="text-orange-500 mr-2">{tip.icon}</span>
            {tip.title}
          </h3>
          <p className="text-neutral-600">{tip.description}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

export default Troubleshooting;
