import { processStepsData } from "@/components/pages/process/data/processStepsData";
import ProcessHero from "@/components/pages/process/ProcessHero";
import ProcessTimeline from "@/components/pages/process/ProcessTimeline";
import ProcessStep from "@/components/pages/process/ProcessStep";
import ProcessCTA from "@/components/pages/process/ProcessCTA";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function Process() {
  return (
    <div className="bg-primary pt-32">
      <PageTitle title="Notre Processus Sécurisé" />
      <ProcessHero />
      <ProcessTimeline>
        {processStepsData
          .filter((step) => !step.isCTA)
          .map((step) => (
            <ProcessStep key={step.id} step={step} />
          ))}
        <ProcessCTA cta={processStepsData.find((step) => step.isCTA)} />
      </ProcessTimeline>
    </div>
  );
}
