"use client";
import { Reveal } from "@/components/utils/Reveal";

const Mission = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
    <div>
      <Reveal>
        <h2 className="text-black text-3xl md:text-4xl font-bold mb-6">
          Our Mission<span className="text-orange-400">.</span>
        </h2>
        <p className="text-neutral-700 text-lg mb-4">
          Sylvie was created with a simple goal: to provide students with instant,
          reliable support whenever they need it. We understand that navigating academic
          life can be challenging, and sometimes you need answers right away.
        </p>
        <p className="text-neutral-700 text-lg">
          Our AI-powered chatbot is designed to assist with everything from course
          selection and study strategies to campus resources and academic policies, making
          student life just a little bit easier.
        </p>
      </Reveal>
    </div>
    <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
      <img
        src="/students.jpg"
        alt="Students collaborating"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  </div>
);

export default Mission;
