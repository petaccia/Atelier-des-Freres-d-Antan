"use client";
import EssentialsCard from "./EssentialsCard";
import { cobblerData, serrurierData } from "./cobblerData"

export default function EssentialsSection() {

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-white  ">
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