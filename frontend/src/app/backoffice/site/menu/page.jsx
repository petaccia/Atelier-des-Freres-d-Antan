"use client";
import { useState } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import Link from 'next/link';
import { useDesktopMenu } from '@/backoffice/hooks/useDesktopMenu';
import { useMobileMenu } from '@/backoffice/hooks/useMobileMenu';
import { getIconByTitle } from '@/backoffice/components/menu/config/menuIcons';

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const desktopMenu = useDesktopMenu();
  const mobileMenu = useMobileMenu();

  // Sélectionner le menu en fonction de l'appareil choisi
  const currentMenu = selectedDevice === 'desktop' ? desktopMenu : mobileMenu;
  const { menuItems, isLoading, error } = currentMenu;

  // Fonction pour afficher un élément de menu avec ses sous-menus
  const renderMenuItem = (item, isSubmenu = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const showIcon = selectedDevice !== 'desktop' && item.showIcon !== false && !isSubmenu;

    return (
      <div key={item.id} className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''} mb-4`}>
        <div className={`flex items-center p-3 ${isSubmenu ? 'bg-primary-dark/50' : 'bg-primary-dark/30'} rounded-lg`}>
          {/* Icône (uniquement pour les éléments principaux en mode mobile/tablette) */}
          {showIcon && (
            <div className="mr-3 text-accent">
              {getIconByTitle(item.title)}
            </div>
          )}

          {/* Informations sur l'élément de menu */}
          <div className="flex-grow">
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="text-sm text-white/60">{item.path || '#'}</p>
          </div>
        </div>

        {/* Afficher les sous-menus s'il y en a */}
        {hasChildren && (
          <div className="mt-2">
            {item.children.map(child => renderMenuItem(child, true))}
          </div>
        )}
      </div>
    );
  };

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
            Mobile/Tablette
          </button>
        </div>

        {/* Affichage des éléments du menu */}
        <div className="bg-primary-dark/30 p-4 rounded-lg">
          <h2 className="text-xl text-white mb-4">Éléments du menu {selectedDevice}</h2>

          {selectedDevice !== 'desktop' ? (
            <div className="space-y-4">
              {menuItems && menuItems.length > 0 ? (
                menuItems.map(item => renderMenuItem(item))
              ) : (
                <p className="text-white/60 p-4">Aucun élément de menu trouvé.</p>
              )}
            </div>
          ) : (
            <pre className="text-white/80 overflow-auto p-4 bg-primary-dark/50 rounded-lg">
              {JSON.stringify(menuItems, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
