// MobileMenu.jsx
"use client";
import Link from "next/link";
import { BiHome, BiHistory, BiEnvelope } from "react-icons/bi";
import { GiRunningShoe, GiKeyLock   } from "react-icons/gi";
import { useState } from "react";
import FloatingCallButton from "@/components/ui/buttons/FloatingCallButton";

export default function MobileMenu() {
  const [activeTab, setActiveTab] = useState("accueil");

  return (
    <>
    <nav className="fixed inset-x-0 bottom-0 bg-white shadow-md md:hidden">
      <div className="flex justify-around py-4">
        {/* Accueil */}
        <Link href="/">
          <div 
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "accueil" ? "text-accent" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("accueil")}
          >
            <BiHome size={24} />
            <span className="text-xs">Accueil</span>
          </div>
        </Link>

        {/* Cordonnerie */}
        <Link href="/la-cordonnerie-traditionnelle">
          <div 
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "cordonnerie" ? "text-accent" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("cordonnerie")}
          >
            <GiRunningShoe size={24} />
            <span className="text-xs">Cordonnerie</span>
          </div>
        </Link>

        {/* Serrurerie */}
        <Link href="/la-serrurerie-traditionnelle">
          <div 
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "serrurerie" ? "text-accent" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("serrurerie")}
          >
            <GiKeyLock size={24} />
            <span className="text-xs">Serrurerie</span>
          </div>
        </Link>

        {/* Historique */}
        <Link href="/historique">
          <div 
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "historique" ? "text-accent" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("historique")}
          >
            <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  width="24" 
  height="24" 
  fill="none"
  className="text-primary hover:text-accent transition-colors"
>
 
  <circle 
    cx="12" 
    cy="12" 
    r="10" 
    stroke="currentColor" 
    strokeWidth="2"
  />
  
  
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth="2" 
    d="M12 14a4 4 0 100-8 4 4 0 000 8z"
    stroke="currentColor"
  />
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth="2" 
    d="M17 17H7v-2h10v2z"
    stroke="currentColor"
  />
</svg>
            <span className="text-xs">Historique</span>
          </div>
        </Link>

        {/* Contact */}
        <Link href="/contact">
          <div 
            className={`flex flex-col items-center space-y-1 ${
              activeTab === "contact" ? "text-accent" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            <BiEnvelope size={24} />
            <span className="text-xs">Contact</span>
          </div>
        </Link>
      </div>
    </nav>
    <FloatingCallButton phoneNumber="07 88 41 63 91" position="middle-top" className="md:hidden" />
    </>
  );
}