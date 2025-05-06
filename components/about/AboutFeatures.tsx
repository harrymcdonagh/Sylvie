"use client";
import { Reveal } from "@/components/utils/Reveal";
import features from "./aboutData";

const AboutFeatures = () => (
  <>
    <Reveal>
      <h2 className="text-black text-3xl md:text-4xl font-bold mb-12 text-center">
        How Sylvie Helps<span className="text-orange-400">.</span>
      </h2>
    </Reveal>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {features.map((feature, index) => (
        <Reveal key={index}>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-orange-500 text-xl">{feature.icon}</span>
            </div>
            <h3 className="text-black text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-neutral-600">{feature.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </>
);

export default AboutFeatures;
