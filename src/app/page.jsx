import Carousel from "@/components/ui/carousel/Carousel";
import ValueSection from "@/components/pages/home/sections/ValueSection/ValueSection";
import EssentialsSection from "@/components/pages/home/sections/essentialsSection/EssentialsSection";
import HistorySection from "@/components/pages/home/sections/historySection/HistorySection";
import Testimonials from "@/components/pages/home/sections/testimonial/Testimonial";
import ServicesSection from "@/components/pages/home/sections/servicesSection/ServicesSection";
import PartnerSection from "@/components/pages/home/sections/PartnersSection/PartnersSection";
import PhilosophySection from "@/components/pages/home/sections/philosophySection/PhilosophySection";
import RealizationsSection from "@/components/pages/home/sections/realizationSection/RealizationSection";
import NewsletterSignup from "@/components/pages/home/sections/newLetter/NewLetter";
import { carouselSlides } from "@/components/pages/home/data/carouselSlides";


export default function Home() {
  return (
    <>
      <div className="bg-primary pt-32">
        <div className="text-center my-8">
          <h1 className=" text-white  rounded-lg">
            Bienvenue à l'Atelier des Frères d'Antan
          </h1>
        </div>
      <Carousel slides={carouselSlides} />
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
    </>
  );
}
