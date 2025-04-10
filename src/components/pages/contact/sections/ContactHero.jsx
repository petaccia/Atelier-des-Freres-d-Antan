import HeroSection from "@/components/ui/sections/HeroSection";
import Image from "next/image";

export default function ContactHero() {
  return (
    <HeroSection
      imageSrc="/img/contact/contact.jpg"
      imageAlt="Contactez-nous - Atelier des Frères d'Antan"
      title="Contactez-nous"
      subtitle="Nous sommes à votre disposition pour répondre à vos questions et vous accompagner dans vos projets."
      overlayColor="bg-black/50"
      height="h-[70vh]"
    />
  );
}
