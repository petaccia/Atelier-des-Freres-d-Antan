import { TbChevronRight } from "react-icons/tb";

export default function ProcessStep({ step }) {
  return (
    <div key={step.id} className="relative flex group py-12 min-h-[12rem]">
      {/* Cercle connecteur moderne */}
      <div className="absolute left-8 sm:left-12 md:left-16 top-8 sm:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-accent-light/10 group-hover:bg-accent rounded-full border-2 border-accent-light/30 backdrop-blur-sm transition-colors duration-300">
          <span className="text-xl sm:text-2xl font-bold text-accent-light group-hover:text-primary transition-colors duration-300">
            {step.id}
          </span>
        </div>
      </div>

      {/* Carte avec effet néon */}
      <div className="ml-16 sm:ml-24 md:ml-32 flex-1 bg-primary-dark backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:border-accent-light/50 transition-all duration-300 shadow-xl hover:shadow-accent/10 h-full group-hover:bg-white/10">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 h-full">
          {/* Icône animée */}
          <div className="flex-shrink-0 p-2 sm:p-3 bg-accent-light/10 rounded-lg hover:bg-accent-light/20 transition-colors self-center sm:self-start">
            <span className="text-2xl sm:text-3xl text-accent-light animate-[spin_15s_linear_infinite]">
              {step.icon}
            </span>
          </div>

          {/* Contenu */}
          <div className="space-y-2 sm:space-y-3 w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-whiteAmber flex items-center gap-2">
              {step.title}
              <TbChevronRight className="text-accent-light opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-whiteGray/80 text-base sm:text-lg leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
