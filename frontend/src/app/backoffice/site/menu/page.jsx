"use client";
import { useState, useCallback } from "react";
import { useDeviceMenu } from "@/backoffice/components/menu";
import BackofficeLayout from "@/backoffice/components/layouts/BackofficeLayout";
import PageLoading from "@/backoffice/components/layouts/PageLoading";
import PageError from "@/backoffice/components/layouts/PageError";
import BackofficeHeaderLocationPage from "@/backoffice/components/navigation/BackofficeHeaderLocationPage";
import BackofficeHeaderTitle from "@/backoffice/components/navigation/BackofficeHeaderTitle";
import DeviceSelector from "@/components/ui/selectors/DeviceSelector";
import MenuSection from "@/backoffice/components/menu/MenuSection";
import PreviewButton from "@/backoffice/ui/buttons/PreviewButton";

export default function MenuPage() {
  const [selectedDevice, setSelectedDevice] = useState("mobile");
  const [refreshKey, setRefreshKey] = useState(0);
  const { menuItems, isLoading, error, refreshMenu } = useDeviceMenu(selectedDevice);

  // Fonction pour rafraîchir les données du menu
  const handleRefresh = useCallback(() => {
    console.log("handleRefresh appelé dans MenuPage");

    // Toujours incrémenter la clé pour forcer un re-rendu complet
    setRefreshKey((prev) => prev + 1);

    // Et aussi appeler refreshMenu si disponible
    if (refreshMenu) {
      console.log("Appel de refreshMenu");
      refreshMenu();
    }
  }, [refreshMenu]);

  if (error) return <PageError message={error} />;
  if (isLoading) return <PageLoading text="Chargement du menu..." />;

  return (
    <BackofficeLayout>
      <BackofficeHeaderLocationPage
        parentLink={{
          href: "/backoffice/site",
          label: "Site Internet",
        }}
        currentPage="Menu"
      />
      <BackofficeHeaderTitle title="Gestion du Menu" />

      <div className="flex justify-between items-center mb-6">
        <DeviceSelector selectedDevice={selectedDevice} onDeviceChange={setSelectedDevice} />
        <PreviewButton />
      </div>

      <MenuSection
        key={refreshKey}
        selectedDevice={selectedDevice}
        menuItems={menuItems}
        onRefresh={handleRefresh}
      />
    </BackofficeLayout>
  );
}
