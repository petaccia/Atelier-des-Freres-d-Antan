"use client";
import HeroSection from "@/components/ui/sections/HeroSection";

export default function ClientHeroSection() {
  return (
    <HeroSection
      imageSrc="/img/projet/client.png"
      imageAlt="Atelier des Frères d'Antan"
      title="Bienvenue à l'Atelier des Frères d'Antan"
      subtitle="Votre partenaire de confiance pour des services de qualité"
      buttonText="Prendre rendez-vous"
      buttonLink="/contact"
    />
  );
}