import { useDesktopMenu } from "./useDesktopMenu";
import { useMobileMenu } from "./useMobileMenu";

export function useDeviceMenu(selectedDevice) {
  const desktopMenu = useDesktopMenu();
  const mobileMenu = useMobileMenu();

  const currentMenu = selectedDevice === 'desktop' ? desktopMenu : mobileMenu;
  const { menuItems, isLoading, error } = currentMenu;

  return {
    menuItems,
    isLoading,
    error,
  };
}
 