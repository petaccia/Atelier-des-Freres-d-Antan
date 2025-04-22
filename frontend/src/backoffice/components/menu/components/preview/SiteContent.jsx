'use client';

export default function SiteContent({ 
  className = 'p-6 bg-white'
}) {
  return (
    <div className={className}>
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        Contenu de la page
      </div>
    </div>
  );
}
