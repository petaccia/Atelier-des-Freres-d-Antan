import { HiCheck } from "react-icons/hi";

export default function ServicesOptionButton( { service, isSelected, onToggle } ) {
  return (
    <button
    type="button"
    onClick={() => onToggle(service)}
    className={`flex items-center gap-4 p-4 border-2 border-whiteAmber rounded-lg hover:bg-whiteAmber group text-left ${
    isSelected ? "bg-whiteAmber" : ""
    }`}
  >
    <div className="flex-1">
      <h4 className={`text-lg font-medium transition-colors duration-300 ${
        isSelected ? "text-black" : "text-whiteAmber group-hover:text-black"
      }`}>
        {service.title}
      </h4>
      <p className={`text-sm transition-colors duration-300 ${
        isSelected ? "text-black/70" : "text-whiteGray group-hover:text-black/70"
      }`}>
        {service.description}
      </p>
    </div>
    <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors duration-300 ${
      isSelected
        ? "border-black bg-black" 
        : "border-whiteAmber group-hover:border-black"
    }`}>
      {isSelected && <HiCheck className="w-4 h-4 text-white" />}
    </div>
  </button>

    )
}