"use client";
import { useState } from "react";
import MenuDeviceDisplay from "./MenuDeviceDisplay";
import { FiPlus } from 'react-icons/fi';
import ModalForm from "../common/ModalForm";

const MenuSection = ({ selectedDevice, menuItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gestionnaire d'événement pour ajouter une nouvelle page
  const handleAddPage = () => {
    // TODO: Implémenter la logique d'ajout
    console.log('Ajouter une nouvelle page');
  };

  return (
    <div className="bg-primary-dark/30 p-4 rounded-lg">
        <h2 className="text-xl text-center p-4 text-white">Menu {selectedDevice}</h2>
        <div className="w-full flex justify-end items-center mb-4">
        <button
          onClick={handleAddPage}
          className="flex  items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Ajouter une page</span>
        </button>
        </div>
      <MenuDeviceDisplay
        selectedDevice={selectedDevice}
        menuItems={menuItems}
      />

      {/* Modal pour ajouter une nouvelle page */}
      <ModalForm 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Ajouter une nouvelle page"
      formProps={formProps}
      />
    </div>
  );
};

export default MenuSection;
