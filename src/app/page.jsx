import CarouselHome from "@/components/carousel/CarouselHome";
import CardValue from "@/components/sections/home/ValueSection/CardValue";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";
import Testimonials from "@/components/sections/home/testimonial/Testimonial";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <CardValue />
      <Testimonials />
    </div>
  );
}
