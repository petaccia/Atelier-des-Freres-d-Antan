import CarouselHome from "@/components/carousel/CarouselHome";
import ValueSection from "@/components/sections/home/ValueSection/ValueSection";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";
import HistorySection from "@/components/sections/home/historySection/HistorySection";
import Testimonials from "@/components/sections/home/testimonial/Testimonial";
import ServicesSection from "@/components/sections/home/servicesSection/ServicesSection";
import PartnerSection from "@/components/sections/home/PartnersSection/PartnersSection";
import PhilosophySection from "@/components/sections/home/philosophySection/PholosophySection";
import RealizationsSection from "@/components/sections/home/realizationSection/RealizationSection";
import NewsletterSignup from "@/components/sections/home/newLetter/NewLetter";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <ValueSection />
      <HistorySection />
      <ServicesSection />
      <RealizationsSection />
      <Testimonials />
      <PhilosophySection />
      <PartnerSection />
      <NewsletterSignup />
    </div>
  );
}
