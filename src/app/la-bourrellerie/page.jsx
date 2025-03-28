import { carouselSlidesBour } from "@/components/pages/bourrellerie/data/carouselSlidesBour";
import Carousel from "@/components/ui/carousel/Carousel";

export default function BourrelleriePage() {
  return (
    <div className="bg-primary pt-32"> 
            <div className="text-center my-8">
                <h1 className="">
                   La bourrellerie
                </h1>
            </div>
            <Carousel slides={carouselSlidesBour} />
            </div>
  );
}
