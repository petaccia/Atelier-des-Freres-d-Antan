import Carousel from "@/components/ui/carousel/Carousel";
import ValueSection from "@/components/pages/home/sections/ValueSection/ValueSection";
import EssentialsSection from "@/components/pages/home/sections/essentialsSection/EssentialsSection";
import HistorySection from "@/components/pages/home/sections/historySection/HistorySection";
import Testimonials from "@/components/pages/home/sections/testimonial/Testimonial";
import ServicesSection from "@/components/ui/services/ServicesSection";
import PartnerSection from "@/components/pages/home/sections/PartnersSection/PartnersSection";
import PhilosophySection from "@/components/pages/home/sections/philosophySection/PhilosophySection";
import RealizationsSection from "@/components/pages/home/sections/realizationSection/RealizationSection";
import NewsletterSignup from "@/components/pages/home/sections/newLetter/NewLetter";
import { carouselSlides } from "@/components/pages/home/data/carouselSlides";
import { servicesDataHome } from "@/components/pages/home/data/servicesDataHome";
import PageTitle from "@/components/ui/pageTitle/PageTitle";


export default function Home() {
  return (
    <>
      <div className="bg-primary pt-32">
        <PageTitle title="Bienvenue à l'Atelier des Frères d'Antan" />
      <Carousel slides={carouselSlides} />
      <EssentialsSection />
      <ValueSection />
      <HistorySection />
      <ServicesSection services={servicesDataHome} />
      <RealizationsSection />
      <Testimonials />
      <PhilosophySection />
      <PartnerSection />
      <NewsletterSignup />
      </div>
    </>
  );
}
