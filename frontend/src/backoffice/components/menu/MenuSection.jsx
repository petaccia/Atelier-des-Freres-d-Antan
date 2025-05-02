"use client";
import { useState, useCallback } from "react";
import MenuDeviceDisplay from "./MenuDeviceDisplay";
import { FiPlus } from "react-icons/fi";
import ModalContainer from "./components/forms/ModalContainer";
import MenuItemForm from "./components/forms/MenuItemForm";

const MenuSection = ({ selectedDevice, menuItems, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer uniquement les éléments de premier niveau pour le sélecteur de parent
  const rootMenuItems = menuItems?.filter((item) => !item.parentId) || [];

  // Callback pour rafraîchir la liste des menus après une modification
  const handleMenuUpdated = useCallback(() => {
    console.log("handleMenuUpdated appelé dans MenuSection");
    if (onRefresh) {
      console.log("Appel de onRefresh depuis MenuSection");
      onRefresh();
    } else {
      console.warn("onRefresh n'est pas défini dans MenuSection");
    }
  }, [onRefresh]);

  return (
    <div className="bg-primary-dark/30 p-4 rounded-lg">
      <h2 className="text-xl text-center p-4 text-white">Menu {selectedDevice}</h2>
      <div className="w-full flex justify-end items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Ajouter une page</span>
        </button>
      </div>
      <MenuDeviceDisplay
        selectedDevice={selectedDevice}
        menuItems={menuItems}
        onMenuUpdated={handleMenuUpdated}
      />
      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une nouvelle page"
      >
        <MenuItemForm
          mode="add"
          onCancel={() => setIsModalOpen(false)}
          menuItems={rootMenuItems}
          onSuccess={handleMenuUpdated}
        />
      </ModalContainer>
    </div>
  );
};

export default MenuSection;
