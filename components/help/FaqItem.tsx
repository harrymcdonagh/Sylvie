"use client";
import { useState } from "react";
import { Reveal } from "@/components/utils/Reveal";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal>
      <div className="border-b border-neutral-200 py-5">
        <button
          className="flex justify-between items-center w-full text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-black text-xl font-medium">{question}</h3>
          <ChevronDown
            className={`text-orange-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            size={24}
          />
        </button>
        <div
          className={`mt-2 text-neutral-600 overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <p className="py-3">{answer}</p>
        </div>
      </div>
    </Reveal>
  );
};

export default FaqItem;
