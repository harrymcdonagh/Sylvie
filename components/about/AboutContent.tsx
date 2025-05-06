"use client";
import Mission from "./Mission";
import AboutFeatures from "./AboutFeatures";

const AboutContent = () => (
  <div className="bg-neutral-50 py-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <Mission />
      <AboutFeatures />
    </div>
  </div>
);

export default AboutContent;
