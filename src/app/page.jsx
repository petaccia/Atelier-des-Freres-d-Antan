import CarouselHome from "@/components/carousel/CarouselHome";
import ValueSection from "@/components/sections/home/ValueSection/ValueSection";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";
import Testimonials from "@/components/sections/home/testimonial/Testimonial";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <ValueSection />
      <Testimonials />
    </div>
  );
}
