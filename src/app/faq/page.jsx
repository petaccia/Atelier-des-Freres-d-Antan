"use client";
import PageTitle from "@/components/ui/pageTitle/PageTitle";
import FaqCategories from "@/components/ui/faq/FaqCategories";
import { contactFaqCategories } from "@/data/contactFaqData";
import Link from "next/link";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";

export default function FaqPage() {
  return (
    <div className="bg-primary pt-32 pb-24">
      <PageTitle
        title="Questions Fréquentes"
        subtitle="Retrouvez ici toutes les réponses à vos questions sur nos services"
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16 p-8 border-2 border-white/20 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg">
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full flex-shrink-0">
                <FiMessageCircle className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-whiteAmber">
                  Bienvenue sur notre page de questions fréquentes
                </h2>
                <p className="text-whiteGray leading-relaxed">
                  Nous avons rassemblé ici les questions les plus fréquemment posées par nos
                  clients, que ce soit en serrurerie, ferronnerie, cordonnerie ou bourrellerie. Si
                  vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter
                  directement.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
                  >
                    <span>Nous contacter pour une question spécifique</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <FaqCategories categories={contactFaqCategories} className="max-w-5xl mx-auto" />

          {/* Back to Home */}
          <div className="text-center mt-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
            >
              <FiArrowLeft />
              <span>Retour à l'accueil</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
