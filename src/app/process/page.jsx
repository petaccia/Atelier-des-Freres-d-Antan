import { processStepsData } from "@/components/pages/process/data/processStepsData";
import ProcessHero from "@/components/pages/process/ProcessHero";
import ProcessTimeline from "@/components/pages/process/ProcessTimeline";
import ProcessStep from "@/components/pages/process/ProcessStep";
import ProcessCTA from "@/components/pages/process/ProcessCTA";
import { processCtaData } from "@/components/pages/process/data/processCtaData";

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
    <div className="bg-primary pt-32">
      {/* Page content */}
      <div className="text-center mt-20 md:my-8">
        <h1>
          Notre processus sécurisé
        </h1>
      </div>
      <ProcessHero />
      <ProcessTimeline >
      {processStepsData.map((step) => (
        <ProcessStep key={step.id} step={step} />
      ))}
      </ProcessTimeline>
      <ProcessCTA cta={processCtaData} />
    </div>
  );
}