import CarouselHome from "@/components/ui/carousel/CarouselHome";
import ValueSection from "@/components/pages/home/sections/ValueSection/ValueSection";
import EssentialsSection from "@/components/pages/home/sections/essentialsSection/EssentialsSection";
import HistorySection from "@/components/pages/home/sections/historySection/HistorySection";
import Testimonials from "@/components/pages/home/sections/testimonial/Testimonial";
import ServicesSection from "@/components/pages/home/sections/servicesSection/ServicesSection";
import PartnerSection from "@/components/pages/home/sections/PartnersSection/PartnersSection";
import PhilosophySection from "@/components/pages/home/sections/philosophySection/PhilosophySection";
import RealizationsSection from "@/components/pages/home/sections/realizationSection/RealizationSection";
import NewsletterSignup from "@/components/pages/home/sections/newLetter/NewLetter";

export default function Home() {
  return (
    <>
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
      </>
  );
}
