"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How often do I need to clean the AutoScooper?",
    answer:
      "The waste drawer typically needs to be emptied every 7–14 days for a single cat, and every 5–7 days for multi-cat households. The globe itself is designed to stay clean — we recommend a deep clean every 1–2 months depending on usage.",
  },
  {
    question: "Does it work for multiple cats?",
    answer:
      "Absolutely! The AutoScooper is engineered for multi-cat households. It cycles after each use and the large waste drawer can handle the output of up to 4 cats. The sensors are smart enough to distinguish between different cats and won't cycle if another cat approaches.",
  },
  {
    question: "How do I get my cat to use it?",
    answer:
      "Most cats adapt within 2–7 days. We recommend placing the AutoScooper next to your old litter box for a few days with some used litter sprinkled in so the scent is familiar. Then remove the old box. Our Cat Adaptation Guide has detailed step-by-step instructions.",
  },
  {
    question: "What type of litter should I use?",
    answer:
      "We recommend clumping clay litter for best results. The AutoScooper's sifting mechanism is optimized for clumping litter. Please avoid non-clumping litter, silica gel crystals, or wood pellets as they may not sift properly.",
  },
  {
    question: "Is it safe for my cat?",
    answer:
      "Yes — safety is our top priority. The AutoScooper features a touch-sensitive pedal and infrared sensors that detect when your cat is inside. The cleaning cycle will never run while your cat is in or near the unit. If a cat enters mid-cycle, it pauses immediately.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common questions
          </h2>
          <p className="text-gray-500">Everything you need to know.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm md:text-base font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
