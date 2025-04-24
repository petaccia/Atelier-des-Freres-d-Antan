"use client";
import { useState } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import Link from 'next/link';
import DeviceSelector from '@/components/ui/selectors/DeviceSelector';
import { MenuItem, useDeviceMenu } from '@/backoffice/components/menu';
import LoadingState from '@/backoffice/components/ui/loading/LoadingState';
import ErrorState from '@/backoffice/components/ui/error/ErrorState';
import MenuItemRecursive from '@/backoffice/components/menu/components/recursive/MenuItemRecursive';
import PageLoading from "@/backoffice/components/layouts/PageLoading";

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const { menuItems, isLoading, error } = useDeviceMenu(selectedDevice);



  if (error) {
    return (
      <div className="min-h-screen bg-primary">
        <Sidebar />
        <div className="ml-64 p-8">
          <ErrorState message={error} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoading text="Chargement du menu..." />;
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
                menuItems.map(item => (
                  <MenuItemRecursive 
                    key={item.id} 
                    item={item} 
                    selectedDevice={selectedDevice}
                  />
                ))
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
