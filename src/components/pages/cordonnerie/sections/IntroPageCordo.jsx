export default function IntroPageCordo() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
        Atelier des Frères d’Antan
      </h2>
      <p className="text-lg sm:text-xl text-gray-300 mb-4">
        Nous vous proposons des prestations de cordonnerie traditionnelle :
      </p>
      <ul className="list-disc list-inside text-left text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-6">
        <li>La réparation de vos chaussures et articles en cuir</li>
        <li>L’entretien et le soin de vos articles en cuir</li>
      </ul>
      <p className="text-lg sm:text-xl text-gray-300">
        Ces prestations sont toutes réalisées dans le respect de nos engagements.
      </p>
    </div>
  );
}