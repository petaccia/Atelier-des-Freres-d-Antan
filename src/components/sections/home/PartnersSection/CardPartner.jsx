import Image from "next/image";

export default function CardPartner({ partner }) {
  return (
    <div className="w-full max-w-xs  md:max-w-md lg:max-w-lg group h-full flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Conteneur de l'image avec effet de lumière */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-inner flex items-center justify-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
