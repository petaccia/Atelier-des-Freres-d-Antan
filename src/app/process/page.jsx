import { processStepsData, processHeroData } from "@/components/pages/process/data/processStepsData";
import ProcessHero from "@/components/pages/process/ProcessHero";
import ProcessTimeline from "@/components/pages/process/ProcessTimeline";
import ProcessStep from "@/components/pages/process/ProcessStep";
import ProcessCTA from "@/components/pages/process/ProcessCTA";

export default function Process() {
  return (
    <div className="bg-primary pt-32">
      {/* Page content */}
      <div className="text-center mt-20 md:my-8">
        <h1>
          {processHeroData.title}
        </h1>
      </div>
      <ProcessHero
        title={processHeroData.title}
        description={processHeroData.description}
      />
      <ProcessTimeline>
        {processStepsData.filter(step => !step.isCTA).map((step) => (
          <ProcessStep key={step.id} step={step} />
        ))}
        <ProcessCTA cta={processStepsData.find(step => step.isCTA)} />
      </ProcessTimeline>
    </div>
  );
}