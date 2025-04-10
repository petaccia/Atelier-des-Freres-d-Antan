import { carouselSlidesBour } from "@/components/pages/bourrellerie/data/carouselSlidesBour";
import { servicesBourrellerieData } from "@/components/pages/bourrellerie/data/servicesBourrellerieData";
import BagRepairSection from "@/components/pages/bourrellerie/sections/BagRepairSection";
import CustomBeltsSection from "@/components/pages/bourrellerie/sections/CustomLeatherSection";
import LeatherCareSection from "@/components/pages/bourrellerie/sections/LeatherCareSection";
import LeatherRepairBour from "@/components/pages/bourrellerie/sections/LeatherRepairBour";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function BourrelleriePage() {
  return (
    <div className="bg-primary pt-32">
            <PageTitle title="La bourrellerie" />
            <Carousel slides={carouselSlidesBour} />
            <ServicesSection services={servicesBourrellerieData} />
            <BagRepairSection />
            <CustomBeltsSection />
            <LeatherCareSection />
            <LeatherRepairBour />
            </div>
  );
}
