"use client";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function MapButton({ destination, origin = "" }) {
  const getMapsUrl = () => {
    const baseUrl = "https://www.google.com/maps/dir/";
    const params = new URLSearchParams({
      api: "1",
      destination: destination,
      ...(origin && { origin: origin })
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="absolute bottom-16 left-6 z-10 ">
    {/* Map button */}
    <Link
      href={getMapsUrl()}
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