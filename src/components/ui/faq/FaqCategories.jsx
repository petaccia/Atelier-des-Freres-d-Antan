"use client";
import { useState } from "react";
import FaqCategoryButton from "./FaqCategoryButton";
import FaqAccordion from "./FaqAccordion";

export default function FaqCategories({
  categories,
  title = "Questions Fréquentes",
  subtitle = "",
  className = ""
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`${className}`}>
      {title && (
        <h2 className="text-center text-3xl font-bold text-whiteAmber mb-4">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-center text-whiteGray mb-10 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Category Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <FaqCategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategory.id === category.id}
            onSelect={handleSelectCategory}
          />
        ))}
      </div>

      {/* Category Title and Content Container */}
      <div className="relative bg-primary-dark/30 border border-accent/20 rounded-xl p-8 shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/30 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/30 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/30 rounded-br-lg"></div>

        {/* Category Title */}
        <div className="text-center mb-8 pb-4 border-b border-accent/20">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-lg mb-3">
            <h3 className="text-2xl font-bold text-accent">
              {selectedCategory.title}
            </h3>
          </div>
          <p className="text-whiteGray max-w-3xl mx-auto">
            {selectedCategory.description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <FaqAccordion faqs={selectedCategory.faqs} />
      </div>
    </div>
  );
}
