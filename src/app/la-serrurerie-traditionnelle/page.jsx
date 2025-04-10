import { carouselSlidesSerr } from "@/components/pages/serrurerie/data/carouselSlidesSerr";
import { servicesSerrurerieData } from "@/components/pages/serrurerie/data/servicesSerrurerieData";
import EmergencySection from "@/components/pages/serrurerie/sections/EmergencySection";
import IntroPageSerr from "@/components/pages/serrurerie/sections/IntroPageSerr";
import KeyDuplicationSection from "@/components/pages/serrurerie/sections/KeyDuplicationSection";
import SecuritySystemSection from "@/components/pages/serrurerie/sections/SecuritySystemSection";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";
import SystemClosedSection from "@/components/pages/serrurerie/sections/SystemClosedSection";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function LaSerrureriePage() {
  return (
    <div className="bg-primary pt-32">
            <PageTitle title="La serrurerie" />
            <Carousel slides={carouselSlidesSerr} />
            <IntroPageSerr />
            <ServicesSection services={servicesSerrurerieData } />
            <SystemClosedSection />
            <KeyDuplicationSection />
            <SecuritySystemSection />
            <EmergencySection />
    </div>
  );
}
