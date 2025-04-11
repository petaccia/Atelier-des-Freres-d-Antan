import FaqCategories from "@/components/ui/faq/FaqCategories";
import { contactFaqCategories } from "@/data/contactFaqData";

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-center text-whiteAmber mb-4 font-primary text-4xl font-bold">
            Questions Fréquentes
          </h2>
          <p className="text-whiteGray max-w-3xl mx-auto">
            Retrouvez ici la réponse aux questions les plus fréquemment posées, que ce soit en serrurerie,
            ferronnerie, cordonnerie ou bourrellerie.
          </p>
          <p className="text-whiteGray mt-4 max-w-3xl mx-auto">
            Si vous avez une question spécifique, vous pouvez nous contacter directement
            <a href="#contact-form" className="text-accent hover:text-accent-light ml-1">ici</a>.
          </p>
        </div>

        <FaqCategories
          categories={contactFaqCategories}
        />

        <div className="text-center mt-12">
          <a
            href="/faq"
            className="inline-block px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-full transition-colors duration-300"
          >
            Voir toutes les questions
          </a>
        </div>
      </div>
    </section>
  );
}