import Image from "next/image";

export default function FaqCategoryButton({ isSelected, category, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      className={`relative flex flex-col gap-4 items-center justify-center p-6 border border-accent/30 rounded-xl shadow-md hover:shadow-accent/20 transition-all duration-300 group ${
        isSelected
          ? "bg-gradient-to-b from-primary-dark to-black border-accent"
          : "bg-black/30 hover:bg-black/40"
      }`}
    >
      {/* Decorative corner elements */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${isSelected ? "border-accent" : "border-accent/30"} rounded-tl-lg transition-colors duration-300`}></div>
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${isSelected ? "border-accent" : "border-accent/30"} rounded-tr-lg transition-colors duration-300`}></div>
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${isSelected ? "border-accent" : "border-accent/30"} rounded-bl-lg transition-colors duration-300`}></div>
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${isSelected ? "border-accent" : "border-accent/30"} rounded-br-lg transition-colors duration-300`}></div>

      {/* Icon */}
      <div className={`p-3 rounded-full ${isSelected ? "bg-accent/20" : "bg-black/20"} transition-colors duration-300`}>
        {typeof category.icon === "string" ? (
          <div className="relative w-10 h-10">
            <Image
              src={category.icon}
              alt={category.title}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        ) : (
          <category.icon className={`w-10 h-10 transition-colors duration-300 ${
            isSelected ? "text-accent" : "text-whiteAmber group-hover:text-accent/80"
          }`} />
        )}
      </div>

      {/* Title */}
      <span className={`text-lg font-medium transition-colors duration-300 ${
        isSelected ? "text-accent" : "text-whiteAmber group-hover:text-accent/80"
      }`}>
        {category.title}
      </span>

      {/* Question count */}
      <div className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
        isSelected
          ? "bg-accent/20 text-whiteGray"
          : "bg-black/20 text-whiteGray/70 group-hover:bg-black/30"
      }`}>
        {category.faqs.length} questions
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </button>
  );
}
