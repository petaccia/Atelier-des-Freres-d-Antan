import Image from "next/image";

export default function CardPartner({ partner }) {
  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg group h-72 flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 mx-auto">
      {/* Conteneur de l'image avec effet de lumière */}
      <div className="mt-4 sm:mt-0 mb-4 sm:mb-6 p-3 sm:p-5 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-inner flex items-center justify-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Nom du partenaire */}
      <p className="text-base md:text-lg font-medium text-gray-800 mt-2 sm:mt-4">
        {partner.name}
      </p>

      {/* Description du partenaire */}
      <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
        {partner.description}
      </p>
    </div>
  );
}
