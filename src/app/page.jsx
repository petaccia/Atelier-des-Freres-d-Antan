import CarouselHome from "@/components/carousel/CarouselHome";
import ValueSection from "@/components/sections/home/ValueSection/ValueSection";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";
import HistorySection from "@/components/sections/home/historySection/HistorySection";
import Testimonials from "@/components/sections/home/testimonial/Testimonial";
import ServicesSection from "@/components/sections/home/servicesSection/ServicesSection";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <ValueSection />
      <HistorySection />
      <ServicesSection />
      <Testimonials />
    </div>
  );
}
