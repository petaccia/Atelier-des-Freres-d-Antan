"use client";
import { useState } from "react";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 mt-8">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`relative border border-accent/20 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? "shadow-lg shadow-accent/5" : "shadow-md"}`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/30 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/30 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/30 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/30 rounded-br-lg"></div>

          {/* Question header */}
          <button
            className={`w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none ${openIndex === index ? "bg-gradient-to-r from-primary-dark to-black" : "bg-black/30 hover:bg-black/40"}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="flex items-center">
              <FiMessageCircle className={`mr-3 flex-shrink-0 ${openIndex === index ? "text-accent" : "text-whiteAmber"}`} size={20} />
              <h4 className={`text-lg font-medium pr-4 ${openIndex === index ? "text-accent" : "text-whiteAmber"}`}>
                {faq.question}
              </h4>
            </div>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-all duration-300 ${openIndex === index ? "bg-accent/20 text-accent rotate-180" : "bg-black/40 text-whiteAmber"}`}>
              <FiChevronDown size={18} />
            </span>
          </button>

          {/* Answer content */}
          <div
            className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-[500px]" : "max-h-0"}`}
          >
            <div className="p-6 bg-black/20 border-t border-accent/10 text-whiteGray">
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
