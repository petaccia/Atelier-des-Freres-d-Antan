import { TbLock, TbChevronRight } from "react-icons/tb";

export default function ProcessCTA({ title, description, buttonText, buttonLink }) {
  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-8 mt-16 sm:mt-20">
      {/* Extension de la ligne de connexion verticale */}
      <div className="absolute left-8 sm:left-12 md:left-16 top-0 h-16 sm:h-20 w-0.5 bg-accent-light/20 transform -translate-x-1/2" />

      {/* Cercle final */}
      <div className="absolute left-8 sm:left-12 md:left-16 top-8 sm:top-10 -translate-x-1/2 z-10">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-accent-light rounded-full border-2 border-accent-light/30 backdrop-blur-sm">
          <span className="text-xl sm:text-2xl font-bold text-primary-dark">5</span>
        </div>
      </div>

      {/* Carte CTA dans le même style que les étapes */}
      <div className="ml-16 sm:ml-24 md:ml-32 bg-primary-dark backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-accent-light/20 hover:border-accent-light/50 transition-all duration-300 shadow-xl hover:shadow-accent/10 group hover:bg-white/10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Icône */}
          <div className="flex-shrink-0 p-3 sm:p-4 bg-accent-light/10 rounded-lg hover:bg-accent-light/20 transition-colors">
            <TbLock className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-accent-light animate-[pulse_3s_ease-in-out_infinite]" />
          </div>

          {/* Contenu */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-whiteAmber flex items-center justify-center sm:justify-start gap-2">
              {title}
              <TbChevronRight className="text-accent-light opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-whiteGray/80 text-base sm:text-lg leading-relaxed">
              {description}
            </p>
            <div className="pt-3 sm:pt-4">
              <a
                href={buttonLink}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-whiteStone font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all hover:scale-[1.02] hover:shadow-md text-base sm:text-lg"
              >
                <TbChevronRight className="animate-[slideRight_1.5s_ease-in-out_infinite]" />
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
