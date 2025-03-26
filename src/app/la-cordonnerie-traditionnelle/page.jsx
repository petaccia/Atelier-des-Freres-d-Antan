import { carouselSlidesCordo } from "@/components/pages/cordonnerie/data/carouselSlidesCordo";
import Carousel from "@/components/ui/carousel/Carousel";

export default function CordonnerieTraditionnelle() {
    return (
        <div className="bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]"> 
            <Carousel slides={carouselSlidesCordo}  />
        </div>
    );
};
