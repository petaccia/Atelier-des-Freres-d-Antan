import { processStepsData } from "@/components/pages/process/data/processStepsData";
import ProcessHero from "@/components/pages/process/ProcessHero";
import ProcessTimeline from "@/components/pages/process/ProcessTimeline";
import ProcessStep from "@/components/pages/process/ProcessStep";
import ProcessCTA from "@/components/pages/process/ProcessCTA";

export default function Process() {
  // Contenu de la page
  const pageContent = {
    hero: {
      title: "Notre Processus Sécurisé",
      description: "Une méthodologie éprouvée pour une serrurerie haute précision et une sécurité optimale."
    },
    cta: {
      title: "Démarrez votre projet",
      description: "Maintenant que vous connaissez notre processus transparent, passez à l'action et sécurisez votre propriété avec notre expertise en serrurerie.",
      buttonText: "Commencer le processus",
      buttonLink: "/contact"
    }
  };

  return (
    <div className="bg-primary pb-16 sm:pb-20">
      {/* Page content */}
      <div className="text-center">
        {/* Section Hero */}
        <ProcessHero
          title={pageContent.hero.title}
          description={pageContent.hero.description}
        />

        {/* Timeline avec les étapes du processus */}
        <ProcessTimeline>
          {processStepsData.map((step) => (
            <ProcessStep key={step.id} step={step} />
          ))}
        </ProcessTimeline>

        {/* Section CTA */}
        <ProcessCTA
          title={pageContent.cta.title}
          description={pageContent.cta.description}
          buttonText={pageContent.cta.buttonText}
          buttonLink={pageContent.cta.buttonLink}
        />
      </div>
    </div>
  );
}