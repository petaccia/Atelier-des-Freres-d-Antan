"use client";
import { useState } from "react";
import MenuDeviceDisplay from "./MenuDeviceDisplay";
import { FiPlus } from 'react-icons/fi';
import ModalContainer from "./components/forms/ModalContainer";
import AddMenuItemForm from "./components/forms/AddMenuItemForm";

const MenuSection = ({ selectedDevice, menuItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer uniquement les éléments de premier niveau pour le sélecteur de parent
  const rootMenuItems = menuItems?.filter(item => !item.parentId) || [];


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
      />
      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une nouvelle page"
      >
        <AddMenuItemForm 
          onCancel={() => setIsModalOpen(false)}
          menuItems={rootMenuItems}
        />
      </ModalContainer>
    </div>
  );
};

export default MenuSection;
