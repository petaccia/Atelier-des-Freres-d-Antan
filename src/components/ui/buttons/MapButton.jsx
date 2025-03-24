"use client";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getMapsUrl } from "@/utils/getMapsUrl";

export default function MapButton({ destination, origin = "" }) {
 

  return (
    <div className="absolute bottom-16 left-6 z-10 ">
    {/* Map button */}
    <Link
      href={getMapsUrl(destination, origin)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center space-x-4 px-6 py-3 
                 bg-accent/30 rounded-full shadow-lg hover:bg-primary/30 
                 transition-all duration-200 z-10"
    >
      {/* Location indicator */}
      <div className="flex items-center space-x-2 text-white">
        <FaMapMarkerAlt className="w-5 h-5" />
        <span className="text-sm font-medium">Yvelines</span>
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-white/30"></div>

      {/* Action button */}
      <div className="flex items-center space-x-2 text-white font-medium 
                      hover:text-white/80 transition-colors duration-200">
        <span className="text-sm">Obtenir l'itinéraire</span>
        <FaMapMarkerAlt className="w-5 h-5" />
      </div>
    </Link>
    </div>
  );
}