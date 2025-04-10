"use client";
import PageTitle from "@/components/ui/pageTitle/PageTitle";
import FaqCategories from "@/components/ui/faq/FaqCategories";
import { faqCategories } from "@/data/faqCategoriesData";

export default function FaqCategoriesPage() {
  return (
    <div className="bg-primary pt-32">
      <PageTitle 
        title="Questions Fréquentes" 
        subtitle="Trouvez rapidement des réponses à vos questions"
      />
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <FaqCategories 
            categories={faqCategories}
            title="Choisissez une catégorie"
            subtitle="Sélectionnez le service qui vous intéresse pour voir les questions fréquentes associées"
          />
        </div>
      </section>
    </div>
  );
}
