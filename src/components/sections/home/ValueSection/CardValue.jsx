export default function CardValue({ value, idx }) {
return (
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
);
} 