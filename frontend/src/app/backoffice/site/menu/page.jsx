"use client";
import { useState } from 'react';
import { useDeviceMenu } from '@/backoffice/components/menu';
import BackofficeLayout from '@/backoffice/components/layouts/BackofficeLayout';
import PageLoading from "@/backoffice/components/layouts/PageLoading";
import PageError from "@/backoffice/components/layouts/PageError";
import BackofficeHeaderLocationPage from "@/backoffice/components/navigation/BackofficeHeaderLocationPage";
import BackofficeHeaderTitle from "@/backoffice/components/navigation/BackofficeHeaderTitle";
import DeviceSelector from '@/components/ui/selectors/DeviceSelector';
import MenuSection from '@/backoffice/components/menu/MenuSection';

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const { menuItems, isLoading, error } = useDeviceMenu(selectedDevice);

  if (error) return <PageError message={error} />;
  if (isLoading) return <PageLoading text="Chargement du menu..." />;

  return (
    <BackofficeLayout>
      <BackofficeHeaderLocationPage
        parentLink={{
          href: "/backoffice/site",
          label: "Site Internet"
        }}
        currentPage="Menu"
      />
      <BackofficeHeaderTitle title="Gestion du Menu" />
      
      <div className="mb-6">
        <DeviceSelector
          selectedDevice={selectedDevice}
          onDeviceChange={setSelectedDevice}
        />
      </div>

      <MenuSection 
        selectedDevice={selectedDevice}
        menuItems={menuItems}
      />
    </BackofficeLayout>
  );
}
