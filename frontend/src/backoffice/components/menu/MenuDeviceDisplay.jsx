import { useCallback } from "react";
import MenuItemRecursive from "./components/recursive/MenuItemRecursive";

const MenuDeviceDisplay = ({ selectedDevice, menuItems, onMenuUpdated }) => {
  // Callback pour rafraîchir la liste des menus après une suppression
  const handleMenuUpdated = useCallback(() => {
    console.log("handleMenuUpdated appelé dans MenuDeviceDisplay");
    if (onMenuUpdated) {
      console.log("Appel de onMenuUpdated depuis MenuDeviceDisplay");
      onMenuUpdated();
    } else {
      console.warn("onMenuUpdated n'est pas défini dans MenuDeviceDisplay");
    }
  }, [onMenuUpdated]);

  return (
    <div className="space-y-4">
      {menuItems && menuItems.length > 0 ? (
        menuItems.map((item) => (
          <MenuItemRecursive
            key={item.id}
            item={item}
            selectedDevice={selectedDevice}
            onMenuUpdated={handleMenuUpdated}
            menuItems={menuItems}
          />
        ))
      ) : (
        <p className="text-white/60 p-4">Aucun élément de menu trouvé.</p>
      )}
    </div>
  );
};

export default MenuDeviceDisplay;
