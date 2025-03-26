import { carouselSlidesCordo } from "@/components/pages/cordonnerie/data/carouselSlidesCordo";
import Carousel from "@/components/ui/carousel/Carousel";

export default function CordonnerieTraditionnelle() {
    return (
        <div className="bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] pt-54"> 
            <div className="text-center mb-8">
                <h1 className="">
                   La Cordonnerie Traditionnelle
                </h1>
            </div>
            <Carousel slides={carouselSlidesCordo}  />
        </div>
    );
};
