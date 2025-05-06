"use client";
import { Reveal } from "@/components/utils/Reveal";
import { faqs } from "./helpData";
import FaqItem from "./FaqItem";

const FaqSection = () => (
  <div className="mb-20">
    <Reveal>
      <h2 className="text-black text-3xl md:text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions<span className="text-orange-400">.</span>
      </h2>
    </Reveal>
    {faqs.map((faq, index) => (
      <FaqItem key={index} question={faq.question} answer={faq.answer} />
    ))}
  </div>
);

export default FaqSection;
