import Image from "next/image";

export default function ServicesTypeButton( { isSelected, service , onSelect } ) {
  return (
    <button
    type="button"
    onClick={() => onSelect(service)}
    className={`flex flex-col gap-4 items-center justify-center p-6 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber hover:text-black transition-colors duration-300 group ${
    isSelected ? "bg-whiteAmber text-black" : ""
    }`}
  >
    {typeof service.icon === "string" ? (
      <div className="relative w-12 h-12">
        <Image 
          src={service.icon} 
          alt={service.title} 
          width={48}
          height={48}
          className={`object-contain filter invert transition-all duration-300 ${
            isSelected ? "filter-none" : "group-hover:filter-none"
          }`}
        />
      </div>
    ) : (
      <service.icon className={`w-12 h-12 transition-colors duration-300 ${
       isSelected ? "text-black" : "text-whiteAmber group-hover:text-black"
      }`} />
    )}
    <span className={`text-lg font-medium transition-colors duration-300 ${
     isSelected ? "text-black" : "text-whiteAmber group-hover:text-black"
    }`}>
      {service.title}
    </span>
  </button>
  )
};