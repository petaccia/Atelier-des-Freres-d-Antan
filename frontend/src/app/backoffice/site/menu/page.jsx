"use client";
import { useState } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import Link from 'next/link';
import DeviceSelector from '@/components/ui/selectors/DeviceSelector';
import { MenuItem, useDeviceMenu } from '@/backoffice/components/menu';

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const { menuItems, isLoading, error } = useDeviceMenu(selectedDevice);

  const renderMenuItem = (item, isSubmenu = false) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''} mb-4`}>
        <MenuItem item={item} isSubmenu={isSubmenu} selectedDevice={selectedDevice} />

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
        <div className="mb-6">
          <DeviceSelector 
            selectedDevice={selectedDevice} 
            onDeviceChange={setSelectedDevice} 
          />
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
