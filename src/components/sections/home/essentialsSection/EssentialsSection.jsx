"use client";
import EssentialsCard from "@/components/sections/components/EssentialsCard";
import { cobblerData, serrurierData } from "../../data/data"

export default function EssentialsSection() {

  return (
    <section className="py-20 bg-gradient-to-b from-accent to-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-16 tracking-tighter">
          LES ESSENTIELS
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 xl:gap-12">
          <EssentialsCard {...cobblerData} />
          <EssentialsCard {...serrurierData} />
        </div>
      </div>
    </section>
  );
}