import { carouselSlidesCordo } from "@/components/pages/cordonnerie/data/carouselSlidesCordo";
import { servicesCordoData } from "@/components/pages/cordonnerie/data/servicesCordoData";
import BadgeReproductionSection from "@/components/pages/cordonnerie/sections/BadgesReproductionSection";
import IntroPageCordo from "@/components/pages/cordonnerie/sections/IntroPageCordo";
import KeyReproductionSection from "@/components/pages/cordonnerie/sections/keyReproductionSection";
import LeatherRepairSection from "@/components/pages/cordonnerie/sections/LeatherRepairSection";
import ShoeRepairSection from "@/components/pages/cordonnerie/sections/ShoesRepairSection";
import Carousel from "@/components/ui/carousel/Carousel";
import ServicesSection from "@/components/ui/services/ServicesSection";

export default function CordonnerieTraditionnelle() {
    return (
        <div className="bg-primary pt-32"> 
            <div className="text-center my-8">
                <h1 className="">
                   La Cordonnerie Traditionnelle
                </h1>
            </div>
            <Carousel slides={carouselSlidesCordo}  />
            <IntroPageCordo />
            <ServicesSection  services={servicesCordoData}/>
            <ShoeRepairSection />
            <LeatherRepairSection />
            <KeyReproductionSection />
            <BadgeReproductionSection />
        </div>
    );
};
