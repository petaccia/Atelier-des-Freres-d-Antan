"use client";
import Link from "next/link";
import HeroSection from "@/components/ui/sections/HeroSection";
import QualitySection from "@/components/pages/engagements/sections/QualitySection";
import RepairSection from "@/components/pages/engagements/sections/RepairSection";
import MaterialsSection from "@/components/pages/engagements/sections/MaterialsSection";
import FrenchCraftsmanshipSection from "@/components/pages/engagements/sections/FrenchCraftsmanshipSection";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function NosEngagements() {
  // Pas besoin d'animations ici, elles sont gérées par les composants

  return (
    <div className="bg-primary">
      <div className="pt-32">
        <PageTitle title="Nos Engagements" />
      </div>

      {/* Hero Section */}
      <HeroSection
        imageSrc="/img/engagements/engagements-hero.jpg"
        imageAlt="Nos engagements - Atelier des Frères d'Antan"
        title="Notre Engagement Envers Vous"
        subtitle="Parce que nous souhaitons vous offrir une prestation entièrement satisfaisante, nous nous tenons à un cahier des charges rigoureux."
        overlayColor="bg-black/50"
      />

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xl text-whiteGray mb-6 leading-relaxed">
            Celui-ci se décline en 4 engagements forts dévoilés ici.
          </p>
          <p className="text-lg text-whiteAmber">
            Ces engagements sont au cœur de nos métiers et sont appliqués pour chacune de nos
            prestations.
          </p>
        </div>
      </div>

      {/* Sections d'engagement avec ContentImageSection */}
      <QualitySection />
      <RepairSection />
      <MaterialsSection />
      <FrenchCraftsmanshipSection />

      {/* CTA Section */}
      <section className="bg-primary-dark py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-whiteAmber mb-6">Vous avez un projet ?</h2>
            <p className="text-whiteGray text-lg mb-8 max-w-2xl mx-auto">
              Découvrez comment notre engagement envers la qualité et le savoir-faire artisanal peut
              bénéficier à votre projet. Contactez-nous dès aujourd'hui pour discuter de vos
              besoins.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-whiteStone font-medium px-8 py-3 rounded-lg transition-colors duration-300 text-lg"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
