import { carouselSlidesSerr } from "@/components/pages/serrurerie/data/carouselSlidesSerr";
import Carousel from "@/components/ui/carousel/Carousel";

export default function LaSerrureriePage() {
  return (
    <div className="bg-primary pt-32"> 
            <div className="text-center my-8">
                <h1 className="">
                    La serrurerie traditionnelle
                  </h1>
            </div>
            <Carousel slides={carouselSlidesSerr} />
    </div>
  );
}
