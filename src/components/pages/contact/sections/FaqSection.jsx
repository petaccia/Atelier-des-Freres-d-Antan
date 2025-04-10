export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-whiteAmber mb-16 font-primary text-4xl font-bold">
          Questions Fréquentes
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-white/10">
            <h3 className="text-2xl font-semibold text-whiteAmber mb-4 font-secondary">📞 Prise de rendez-vous en serrurerie</h3>
            <p className="text-whiteGray text-lg leading-relaxed font-secondary">Contactez-nous au 07 88 41 63 91 ou via notre formulaire pour planifier une intervention à domicile.</p>
          </div>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-white/10">
            <h3 className="text-2xl font-semibold text-whiteAmber mb-4 font-secondary">⏳ Délai de réparation de chaussures</h3>
            <p className="text-whiteGray text-lg leading-relaxed font-secondary">Les réparations standard nécessitent environ 1 semaine. Nous vous informerons du délai exact lors du dépôt.</p>
          </div>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-white/10">
            <h3 className="text-2xl font-semibold text-whiteAmber mb-4 font-secondary">💶 Devis gratuits</h3>
            <p className="text-whiteGray text-lg leading-relaxed font-secondary">Bénéficiez de devis gratuits et sans engagement pour tous nos services.</p>
          </div>
          
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl hover:shadow-white/10">
            <h3 className="text-2xl font-semibold text-whiteAmber mb-4 font-secondary">📍 Zone d'intervention</h3>
            <p className="text-whiteGray text-lg leading-relaxed font-secondary">Nous couvrons Montfort l'Amaury et ses environs. Contactez-nous pour vérifier votre éligibilité.</p>
          </div>
        </div>
      </div>
    </section>
  );
}