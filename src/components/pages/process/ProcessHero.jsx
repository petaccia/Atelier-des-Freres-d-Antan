"use client";
import HeroSection from "@/components/ui/sections/HeroSection";

export default function ProcessHero({ title, description }) {
  return (
    <HeroSection
      imageSrc="/img/process/process-hero.jpg"
      imageAlt="Notre Processus Sécurisé"
      title="Pourquoi nous choisir ?"
      subtitle="La transparence et la qualité sont au cœur de notre processus."
      buttonText="Commencer le processus"
      buttonLink="/mon-projet"
    />
  );
}
