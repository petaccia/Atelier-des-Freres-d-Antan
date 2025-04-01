"use client";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getMapsUrl } from "@/utils/getMapsUrl";

export default function MapButton({ destination }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const url = await getMapsUrl(destination);
      window.open(url, '_blank');
    } catch (error) {
      console.error("Erreur lors de l'ouverture de l'itinéraire:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute  bottom-14 left-1/5 md:top-10 md:left-4 md:z-10">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="group flex items-center space-x-2 sm:space-x-4 px-4 sm:px-6 py-2 sm:py-3 
                  bg-primary/60 md:bg-accent/30 rounded-full shadow-lg hover:bg-primary/30 
                  transition-all duration-200 z-10"
      >
        {/* Location indicator */}
        <div className="flex items-center space-x-2 text-white">
          <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Yvelines</span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 sm:h-6 bg-white/30"></div>

        {/* Action button */}
        <div className="flex items-center space-x-2 text-white font-medium 
                        hover:text-white/80 transition-colors duration-200">
          <span className="text-xs sm:text-sm">
            {isLoading ? "Chargement..." : "Obtenir l'itinéraire"}
          </span>
          <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </button>
    </div>
  );
}
