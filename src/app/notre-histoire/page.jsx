"use client";
import Image from "next/image";
import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function NotreHistoire() {
  return (
    <div id="history" className="bg-primary">
      <div className="pt-32">
        <PageTitle title="Notre Histoire" />
      </div>

      {/* Hero Section avec image centrée */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/img/history/shop.jpg"
            alt="Notre histoire - Atelier des Frères d'Antan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Contenu superposé sur l'image */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              L'Histoire de l'Atelier des Frères d'Antan
            </h2>
            <p className="text-whiteGray text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Une aventure artisanale née de la passion et du savoir-faire familial
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xl text-whiteGray mb-6 leading-relaxed">
            L'Atelier des Frères d'Antan est né de la rencontre entre deux passions artisanales : la
            cordonnerie et la serrurerie. Deux métiers traditionnels, deux frères, une même vision
            de l'excellence.
          </p>
          <p className="text-lg text-whiteAmber">
            Découvrez comment notre histoire familiale a façonné notre approche du métier et notre
            engagement envers la qualité.
          </p>
        </div>
      </div>

      {/* Histoire de l'atelier */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/img/history/history.webp"
              alt="Création de l'Atelier des Frères d'Antan"
              fill
              className="object-cover  object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-whiteAmber border-l-4 border-accent pl-4 py-2">
              La naissance d'un projet fraternel
            </h3>
            <p className="text-whiteGray text-lg leading-relaxed">
              Après des années passées à se former et à exercer dans les entreprises familiales
              respectives, Nicolas et Guillaume ont décidé d'unir leurs savoir-faire pour créer un
              atelier à leur image.
            </p>
            <p className="text-whiteGray text-lg leading-relaxed">
              L'Atelier des Frères d'Antan a ouvert ses portes en 2022 à Montfort l'Amaury, avec
              l'ambition de perpétuer les techniques traditionnelles tout en répondant aux besoins
              contemporains.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-1 md:order-2 relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/img/history/tradition.jpg"
              alt="Héritage familial artisanal"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
          </div>
          <div className="order-2 md:order-1 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-whiteAmber border-l-4 border-accent pl-4 py-2">
              Un héritage familial précieux
            </h3>
            <p className="text-whiteGray text-lg leading-relaxed">
              Notre histoire s'enracine dans une tradition familiale d'artisanat. Nos parents nous
              ont transmis non seulement des techniques et des savoir-faire, mais aussi des valeurs
              : l'exigence, la minutie, le respect du client et des matériaux.
            </p>
            <p className="text-whiteGray text-lg leading-relaxed">
              Cette transmission intergénérationnelle est au cœur de notre identité et guide chacune
              de nos réalisations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/img/history/authenticity.png"
              alt="Notre vision pour l'avenir"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-whiteAmber border-l-4 border-accent pl-4 py-2">
              Notre vision pour l'avenir
            </h3>
            <p className="text-whiteGray text-lg leading-relaxed">
              Nous croyons fermement que les métiers traditionnels ont toute leur place dans le
              monde moderne. Notre ambition est de préserver ces savoir-faire tout en les adaptant
              aux besoins contemporains.
            </p>
            <p className="text-whiteGray text-lg leading-relaxed">
              L'Atelier des Frères d'Antan se veut un lieu de transmission, où la qualité et
              l'authenticité priment sur la production de masse et l'obsolescence programmée.
            </p>
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div className="bg-primary-dark pb-20">
        <div className="container mx-auto px-4">
          <h2 className=" text-whiteAmber text-center ">
            Nos Valeurs Fondamentales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary p-8 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-accent/10">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-accent-light">1</span>
              </div>
              <h3 className="text-xl font-bold text-whiteAmber text-center mb-4">
                Excellence Artisanale
              </h3>
              <p className="text-whiteGray text-center">
                Nous nous engageons à maintenir les plus hauts standards de qualité dans chacune de
                nos réalisations, en accordant une attention méticuleuse aux détails.
              </p>
            </div>

            <div className="bg-primary p-8 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-accent/10">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-accent-light">2</span>
              </div>
              <h3 className="text-xl font-bold text-whiteAmber text-center mb-4">
                Authenticité & Tradition
              </h3>
              <p className="text-whiteGray text-center">
                Nous honorons les techniques traditionnelles tout en les adaptant aux besoins
                contemporains, préservant ainsi un patrimoine artisanal précieux.
              </p>
            </div>

            <div className="bg-primary p-8 rounded-xl border border-accent/20 hover:border-accent/40 transition-all duration-300 shadow-lg hover:shadow-accent/10">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-accent-light">3</span>
              </div>
              <h3 className="text-xl font-bold text-whiteAmber text-center mb-4">
                Service & Proximité
              </h3>
              <p className="text-whiteGray text-center">
                Nous cultivons une relation de confiance avec nos clients, basée sur l'écoute, le
                conseil personnalisé et un service de proximité attentif.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className=" text-whiteAmber">Découvrez Notre Atelier</h2>
            <p className="text-whiteGray text-lg mb-8 max-w-2xl mx-auto">
              Venez nous rencontrer et découvrir notre atelier à Montfort l'Amaury. Nous serons
              ravis de vous accueillir et de vous présenter notre travail.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/nos-savoir-faire"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-whiteStone font-medium px-8 py-3 rounded-lg transition-colors duration-300 text-lg"
              >
                Découvrir nos savoir-faire
                <TbChevronRight className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border border-accent text-accent hover:bg-accent/10 font-medium px-8 py-3 rounded-lg transition-colors duration-300 text-lg"
              >
                Nous contacter
                <TbChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
