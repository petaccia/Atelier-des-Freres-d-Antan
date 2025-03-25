export default function CardValue({ value }) {
  return (
    <div className="group h-full flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Icône grande avec effet de lumière */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-full bg-gradient-to-br from-white to-stone-50 shadow-inner">
        <div className="text-6xl sm:text-7xl md:text-8xl text-primary group-hover:text-accent transition-colors duration-500">
          {value.icon()}
        </div>
      </div>
      
      {/* Titre avec hauteur fixe */}
      <h3 className="text-xl sm:text-2xl font-semibold text-stone-600 mb-4 sm:mb-6 group-hover:text-primary transition-colors duration-300 h-16 sm:h-[100px] flex items-center justify-center">
        {value.title}
      </h3>
      
      {/* Description avec hauteur fixe */}
      <p className="text-base sm:text-lg text-stone-500 leading-relaxed mb-6 sm:mb-8 h-16 sm:h-20 overflow-y-auto">
        {value.description}
      </p>
      
      {/* Ligne décorative animée */}
      <div className="w-1/3 h-1 bg-primary/20 group-hover:w-full group-hover:bg-primary transition-all duration-500 mt-auto" />
    </div>
  );
}
