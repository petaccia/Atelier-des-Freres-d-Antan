import { carouselSlidesCordo } from "@/components/pages/cordonnerie/data/carouselSlidesCordo";
import { servicesCordoData } from "@/components/pages/cordonnerie/data/servicesCordoData";
import BadgeReproductionSection from "@/components/pages/cordonnerie/sections/BadgesReproductionSection";
import KeyReproductionSection from "@/components/pages/cordonnerie/sections/keyReproductionSection";
import LeatherRepairSection from "@/components/pages/cordonnerie/sections/LeatherRepairSection";
import ShoeRepairSection from "@/components/pages/cordonnerie/sections/ShoesRepairSection";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function CordonnerieTraditionnelle() {
    return (
        <div className="bg-primary pt-32">
            <PageTitle title="La Cordonnerie" />
            <Carousel slides={carouselSlidesCordo}  />
            <ServicesSection  services={servicesCordoData}/>
            <ShoeRepairSection />
            <LeatherRepairSection />
            <KeyReproductionSection />
            <BadgeReproductionSection />
        </div>
    );
};
