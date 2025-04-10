"use client";
import Image from "next/image";

export default function NosSavoirFaire() {
  return (
    <div className="bg-primary">
      {/* Page content */}
      <div className="text-center pt-32 mt-20 md:my-8">
        <h1>
          Nos Savoir-Faire
        </h1>
      </div>

      {/* Hero Section avec image centrée */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/img/savoir-faire/savoirFaire-hero.jpg"
            alt="Nos savoir-faire - Atelier des Frères d'Antan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Présentation des artisans */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16 max-w-6xl mx-auto">
          {/* Photos des artisans */}
          <div className="w-full md:w-1/2 flex justify-center space-x-4">
            <a href="#guillaume" className="relative w-36 h-48 md:w-44 md:h-56 rounded-xl overflow-hidden transform -rotate-3 shadow-xl cursor-pointer transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/70 ">
                <Image src="/img/savoir-faire/guillaume.webp" alt="Guillaume" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-accent/20 z-0"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <p className="text-white font-medium">Guillaume</p>
              </div>
            </a>
            <a href="#nicolas" className="relative w-36 h-48 md:w-44 md:h-56 rounded-xl overflow-hidden transform rotate-3 shadow-xl mt-6 cursor-pointer transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/70">
                <Image src="/img/savoir-faire/nicolas.webp" alt="Nicolas" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-accent/20 z-0"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white font-medium">Nicolas</p>
              </div>
            </a>
          </div>

          {/* Texte de présentation */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-whiteAmber mb-6 inline-block border-b-2 border-accent pb-2">
              Les Artisans Derrière l'Atelier
            </h2>
            <p className="text-xl text-whiteGray mb-6 leading-relaxed">
              Derrière Atelier des Frères d'Antan, il y a nous : <span className="text-accent-light font-medium">Guillaume</span> et <span className="text-accent-light font-medium">Nicolas</span>.
            </p>
            <div className="space-y-4 text-lg text-whiteGray/90">
              <p className="flex items-start">
                <span className="text-accent-light mr-2 text-xl">&rsaquo;</span>
                Parce qu'il est essentiel pour vous de comprendre qui nous sommes avant de nous faire confiance.
              </p>
              <p className="flex items-start">
                <span className="text-accent-light mr-2 text-xl">&rsaquo;</span>
                Parce que nous revendiquons la qualité de nos prestations qui est le reflet de nos savoir-faire.
              </p>
            </div>
            <p className="text-xl text-whiteAmber mt-6 font-medium border-l-4 border-accent pl-4 py-2">
              Nous vous proposons de les découvrir juste ici.
            </p>
          </div>
        </div>

        {/* Profil de Nicolas */}
        <div id="nicolas" className="flex flex-col lg:flex-row items-center gap-10 mb-20 max-w-6xl mx-auto bg-primary-dark/50 rounded-2xl p-6 md:p-10 border border-accent/10 scroll-mt-32">
          {/* Photo de Nicolas */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-xl border-2 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/70 ">
                <Image src="/img/savoir-faire/nicolas.webp" alt="Nicolas" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary-dark/80 py-3 px-4 ">
                <p className="text-accent-light font-bold text-xl">Nicolas</p>
                <p className="text-whiteGray text-sm">Artisan Cordonnier</p>
              </div>
            </div>
          </div>

          {/* Biographie de Nicolas */}
          <div className="w-full lg:w-2/3 text-left">
            <h3 className="text-2xl font-bold text-accent-light mb-4">
              Nicolas, Artisan Cordonnier
            </h3>
            <div className="space-y-4 text-whiteGray/90 leading-relaxed">
              <p>
                La cordonnerie, Nicolas est tombé dedans quand il était petit. Il découvre ce métier dans l'entreprise familiale alors qu'il n'est pas encore en âge de compter. Fasciné par les gestes précis et patients de ces artisans, il tombe amoureux et comprend vite qu'il souhaite en faire son métier.
              </p>
              <p>
                Il devra attendre l'obtention de son baccalauréat pour rejoindre son père en cordonnerie. Pendant deux ans, il va acquérir les bases de ce beau métier. En 2009, il file en Centre de Formation de la Cordonnerie Multiservice. Il aura ensuite la chance d'effectuer son apprentissage au sein de la Cordonnerie du Roi à Versailles.
              </p>
              <p>
                Il sort diplômé de son titre professionnel de cordonnier multiservices un an plus tard. Nicolas aime ce métier de proximité qui lui permet d'échanger et de créer des liens avec ses clients. Il prend plaisir à redonner vie aux chaussures et articles en cuir qui lui sont confiés.
              </p>
              <p>
                Désireux de compléter sa formation, Nicolas s'est initié à la sellerie au Haras national du Pin. Son instructeur a travaillé pour la maison Hermès pendant 20 ans. Un gage de la rigueur de l'enseignement.
              </p>
              <p>
                En tout, Nicolas passera 14 ans à se perfectionner dans l'entreprise familiale. A la retraite de ses parents, il souhaite créer avec son frère un atelier reflétant son univers et ses valeurs.
              </p>
              <p className="text-whiteAmber font-medium border-l-4 border-accent pl-4 py-2">
                Cet atelier sera à son image : convivial, et placera les échanges humains et la qualité au cœur de l'activité.
              </p>
            </div>
            <div className="mt-6">
              <a href="/prestations" className="inline-flex items-center text-accent-light hover:text-accent transition-colors">
                <span>Découvrir ses prestations</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Profil de Guillaume */}
        <div id="guillaume" className="flex flex-col lg:flex-row-reverse items-center gap-10 max-w-6xl mx-auto bg-primary-dark/50 rounded-2xl p-6 md:p-10 border border-accent/10 scroll-mt-32">
          {/* Photo de Guillaume */}
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-xl border-2 border-accent/20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/70">
                <Image src="/img/savoir-faire/guillaume.webp" alt="Guillaume" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary-dark/80 py-3 px-4 ">
                <p className="text-accent-light font-bold text-xl">Guillaume</p>
                <p className="text-whiteGray text-sm">Artisan Serrurier</p>
              </div>
            </div>
          </div>

          {/* Biographie de Guillaume */}
          <div className="w-full lg:w-2/3 text-left">
            <h3 className="text-2xl font-bold text-accent-light mb-4">
              Guillaume, Artisan Serrurier
            </h3>
            <div className="space-y-4 text-whiteGray/90 leading-relaxed">
              <p>
                Guillaume a la serrurerie dans le sang. Après son baccalauréat, il est entré dans l'entreprise familiale et a été formé par son père, lui-même artisan serrurier depuis 1975.
              </p>
              <p>
                Passionné par la serrurerie, Guillaume a eu à cœur de développer son savoir-faire. Il a continué de se former en effectuant plusieurs stages auprès de Vachette. Il a gagné ainsi en efficacité, découvert de nouvelles techniques de pose et approfondi ses connaissances des différents systèmes de fermeture.
              </p>
              <p>
                Guillaume est diplômé de Madelin SA depuis 2011, premier centre de formation pour les professionnels de la serrurerie. Il y a acquis une expertise pointue en ouverture et dépannage de portes.
              </p>
              <p>
                En reconnaissance de la qualité de sa formation et de son sérieux, Guillaume devient membre des réseaux de serruriers agréés Bricard Confiance et Expert Vachette.
              </p>
              <p>
                Parce qu'il aime travailler de ses mains différents matériaux, il apprend également à forger selon la méthode Uri Hofi.
              </p>
              <p>
                Guillaume s'épanouit en parvenant à donner confiance et sérénité à ses clients. Animé par la volonté de se rendre utile, son métier de serrurier lui convient parfaitement.
              </p>
              <p className="text-whiteAmber font-medium border-l-4 border-accent pl-4 py-2">
                A la retraite de ses parents et après 12 années dans l'entreprise familiale, il crée avec son frère Atelier des Frères d'Antan. Un lieu à son image, authentique et valorisant son savoir-faire.
              </p>
            </div>
            <div className="mt-6">
              <a href="/prestations" className="inline-flex items-center text-accent-light hover:text-accent transition-colors">
                <span>Découvrir ses prestations</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
