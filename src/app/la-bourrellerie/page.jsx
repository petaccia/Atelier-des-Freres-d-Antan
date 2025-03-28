import { carouselSlidesBour } from "@/components/pages/bourrellerie/data/carouselSlidesBour";
import { servicesBourrellerieData } from "@/components/pages/bourrellerie/data/servicesBourrellerieData";
import BagRepairSection from "@/components/pages/bourrellerie/sections/BagRepairSection";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";

export default function BourrelleriePage() {
  return (
    <div className="bg-primary pt-32"> 
            <div className="text-center my-8">
                <h1 className="">
                   La bourrellerie
                </h1>
            </div>
            <Carousel slides={carouselSlidesBour} />
            <ServicesSection services={servicesBourrellerieData} />
            <BagRepairSection />
            </div>
  );
}
