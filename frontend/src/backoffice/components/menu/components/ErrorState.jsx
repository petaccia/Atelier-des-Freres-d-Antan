'use client';
import { MdInfo } from 'react-icons/md';

export default function ErrorState({ error }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
      <div className="text-red-500 mb-4">
        <MdInfo size={40} />
      </div>
      <h3 className="text-xl font-semibold text-red-400 mb-2">Erreur de chargement</h3>
      <p className="text-white/80 text-center mb-4">{error}</p>
    </div>
  );
}
