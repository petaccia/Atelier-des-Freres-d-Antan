import { carouselSlidesSerr } from "@/components/pages/serrurerie/data/carouselSlidesSerr";
import IntroPageSerr from "@/components/pages/serrurerie/sections/IntroPageSerr";
import Carousel from "@/components/ui/carousel/Carousel";

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
    </div>
  );
}
