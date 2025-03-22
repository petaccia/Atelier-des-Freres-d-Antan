export default function PhilosophySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blueLight">
            Notre Philosophie
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto p-10 border-2 border-white/20 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg">
          <div className="text-center space-y-8 text-white/90 leading-relaxed text-lg">
            <p className="relative italic">
              <span className="absolute -left-10 -top-8 text-7xl text-blueLight/50 font-serif">“</span>
              Chez Atelier des Frères d'Antan, nous vous proposons une vision moderne 
              de la serrurerie et cordonnerie à la française, tout en préservant 
              l'authenticité de nos savoir-faire traditionnels.
              <span className="absolute -right-5 -bottom-8 text-7xl text-blueLight/50 font-serif">”</span>
            </p>
            
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8"></div>
            
            <p className="text-blueLight">
              Notre engagement va au-delà du simple service : nous mettons notre 
              expertise au service de vos besoins, avec la qualité et l'attention 
              caractéristiques d'une entreprise artisanale et familiale.
            </p>
            
            <p>
              Nous croyons en la durabilité et en la préservation des objets. 
              Chaque intervention est l'occasion de redonner vie à ce qui pourrait 
              être jeté, de prolonger l'existence des objets et de proposer des 
              solutions durables à nos clients.
            </p>
            
            <p>
              Notre philosophie repose sur un équilibre entre tradition et modernité, 
              entre qualité artisanale et innovation, entre service personnalisé et 
              solutions durables.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}