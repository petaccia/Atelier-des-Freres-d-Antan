"use client";
import CardValue from "./CardValue";
import  {valuesData}  from "./valuesData";
export default function ValueSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-whiteAmber to-stone-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16 text-stone-800">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesData.map((value, idx) => (
           <CardValue key={idx} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
}