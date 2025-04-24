"use client";
import { useState } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import DeviceSelector from '@/components/ui/selectors/DeviceSelector';
import { useDeviceMenu } from '@/backoffice/components/menu';
import MenuItemRecursive from '@/backoffice/components/menu/components/recursive/MenuItemRecursive';
import PageLoading from "@/backoffice/components/layouts/PageLoading";
import PageError from "@/backoffice/components/layouts/PageError";
import BackofficeHeaderLocationPage from "@/backoffice/components/navigation/BackofficeHeaderLocationPage";
import BackofficeHeaderTitle from "@/backoffice/components/navigation/BackofficeHeaderTitle";

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const { menuItems, isLoading, error } = useDeviceMenu(selectedDevice);



  if (error) {
    return <PageError message={error} />;
  }

  if (isLoading) {
    return <PageLoading text="Chargement du menu..." />;
  }

  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        <BackofficeHeaderLocationPage 
        parentLink={{
          href: "/backoffice/site",
          label: "Site Internet"
        }}
        currentPage="Menu"
        />
        <BackofficeHeaderTitle 
          title="Gestion du Menu" 
        />

        {/* Sélecteur d'appareil */}
        <div className="mb-6">
          <DeviceSelector 
            selectedDevice={selectedDevice} 
            onDeviceChange={setSelectedDevice} 
          />
        </div>

        {/* Affichage des éléments du menu */}
        <div className="bg-primary-dark/30 p-4 rounded-lg">
          <h2 className="text-xl text-white">Éléments du menu {selectedDevice}</h2>

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
