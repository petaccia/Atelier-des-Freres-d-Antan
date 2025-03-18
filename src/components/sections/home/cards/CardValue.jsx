"use client";
import  {valuesData}  from "../../data/valuesData";
export default function CardValue() {
  return (
    <section className="py-20 bg-gradient-to-b from-whiteAmber to-stone-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16 text-stone-800">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesData.map((value, idx) => (
            <div 
              key={idx} 
              className={`rounded-2xl p-6 border shadow-lg transition-shadow hover:shadow-xl 
              bg-white ${value.color}`}
            >
              {/* Icône avec effet de profondeur */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${value.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`} />
                  <div className="relative z-10 p-4 rounded-full bg-white shadow-md">
                    {value.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-stone-800 mb-4">{value.title}</h3>
              <p className="text-lg text-stone-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}