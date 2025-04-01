import { carouselSlidesSerr } from "@/components/pages/serrurerie/data/carouselSlidesSerr";
import { servicesSerrurerieData } from "@/components/pages/serrurerie/data/servicesSerrurerieData";
import IntroPageSerr from "@/components/pages/serrurerie/sections/IntroPageSerr";
import LockRepairSection from "@/components/pages/serrurerie/sections/LockRepairSection";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";

export default function LaSerrureriePage() {
  return (
    <div className="bg-primary pt-32"> 
            <div className="text-center mt-20 md:my-8">
                <h1 className="">
                    La serrurerie 
                  </h1>
            </div>
            <Carousel slides={carouselSlidesSerr} />
            <IntroPageSerr />
            <ServicesSection services={servicesSerrurerieData } />
            <LockRepairSection />
    </div>
  );
}
