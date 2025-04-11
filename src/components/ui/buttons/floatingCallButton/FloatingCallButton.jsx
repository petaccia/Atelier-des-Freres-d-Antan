"use client";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import "./floatingCallButton.css";



export default function  FloatingCallButton({
  phoneNumber,
  position = "bottom-right", // Position par dexpéfaut
  className = "", // Classes CSS supplémentaires
}) {
  // Déterminer la position en fonction de la prop
  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return "top-1/4 left-4";
      case "top-right":
        return "top-1/3 right-4";
        case "middle-top":
        return "middle-top top-38 right-1/4 mr-6";
        case"middle-right":
        return "top-1/2 right-4";
        case "middle-left":
        return "top-1/2 left-4";
        case "middle-middle":
        return "top-1/2 right-1/2";
        case "bottom-middle":
        return "bottom-4 right-1/2";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-right":
      default:
        return "bottom-4 right-4";
    }
  };

  return (
    <div
      className={`floating-call-button fixed z-50 ${getPositionStyles()} ${className}`}
    >
      <Link
        href={`tel:${phoneNumber}`}
        className="w-full flex items-center justify-center bg-accent hover:bg-primary  text-white rounded py-2 px-4 shadow-lg hover:bg-accent-dark transition-colors duration-200 ml-3"
      >

      <FaPhoneAlt className="w-4 h-4 mr-3" />
      <span>{phoneNumber}</span>
    </Link>
    </div>
  );
}