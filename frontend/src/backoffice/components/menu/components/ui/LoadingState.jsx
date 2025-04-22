'use client';
import { MdRefresh } from 'react-icons/md';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-primary-dark/30 rounded-lg">
      <div className="animate-spin text-accent mb-4">
        <MdRefresh size={40} />
      </div>
      <p className="text-white">Chargement du menu...</p>
    </div>
  );
}
