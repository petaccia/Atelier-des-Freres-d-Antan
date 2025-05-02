import { useDesktopMenu } from "./useDesktopMenu";
import { useMobileMenu } from "./useMobileMenu";
import { useCallback } from "react";

export function useDeviceMenu(selectedDevice) {
  console.log("useDeviceMenu initialisé avec device:", selectedDevice);

  const desktopMenu = useDesktopMenu();
  const mobileMenu = useMobileMenu();

  const currentMenu = selectedDevice === "desktop" ? desktopMenu : mobileMenu;
  const { menuItems, isLoading, error } = currentMenu;

  // Fonction pour rafraîchir le menu en fonction du device sélectionné
  const refreshMenu = useCallback(() => {
    console.log(`Rafraîchissement du menu ${selectedDevice}`);

    // Rafraîchir les deux menus pour s'assurer que tout est à jour
    try {
      if (desktopMenu.refreshMenu) {
        desktopMenu.refreshMenu();
        console.log("Menu desktop rafraîchi");
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du menu desktop:", error);
    }

    try {
      if (mobileMenu.refreshMenu) {
        mobileMenu.refreshMenu();
        console.log("Menu mobile rafraîchi");
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du menu mobile:", error);
    }
  }, [selectedDevice, desktopMenu, mobileMenu]);

  return {
    menuItems,
    isLoading,
    error,
    refreshMenu,
  };
}
