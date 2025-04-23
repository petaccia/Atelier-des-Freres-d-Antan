"use client";
import { useState, useEffect } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import Link from 'next/link';
import { useDesktopMenu } from '@/backoffice/hooks/useDesktopMenu';
import { useMobileMenu } from '@/backoffice/hooks/useMobileMenu';

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const desktopMenu = useDesktopMenu();
  const mobileMenu = useMobileMenu();

  // Sélectionner le menu en fonction de l'appareil choisi
  const currentMenu = selectedDevice === 'desktop' ? desktopMenu : mobileMenu;
  const { menuItems, isLoading, error } = currentMenu;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Sidebar />
        <div className="ml-64 p-8">
          <div className="flex flex-col items-center justify-center p-8 bg-primary-dark/30 rounded-lg">
            <p className="text-white">Chargement du menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary">
        <Sidebar />
        <div className="ml-64 p-8">
          <div>Une erreur est survenue: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        {/* Titre et navigation */}
        <div className="flex items-center gap-2 text-white/60 mb-4">
          <Link href="/backoffice/site" className="hover:text-accent">
            Site Internet
          </Link>
          <span>/</span>
          <span className="text-accent">Menu</span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-whiteAmber">Gestion du Menu</h1>
        </div>

        {/* Sélecteur d'appareil */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedDevice('desktop')}
            className={`px-4 py-2 rounded-lg ${selectedDevice === 'desktop' ? 'bg-accent text-white' : 'bg-primary-dark/50 text-white/70'}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setSelectedDevice('mobile')}
            className={`px-4 py-2 rounded-lg ${selectedDevice === 'mobile' ? 'bg-accent text-white' : 'bg-primary-dark/50 text-white/70'}`}
          >
            Mobile
          </button>
        </div>

        {/* Affichage simple des éléments du menu */}
        <div className="bg-primary-dark/30 p-4 rounded-lg">
          <h2 className="text-xl text-white mb-4">Éléments du menu {selectedDevice}</h2>
          <pre className="text-white/80 overflow-auto p-4 bg-primary-dark/50 rounded-lg">
            {JSON.stringify(menuItems, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
