"use client";
import { useState } from "react";
import MenuDeviceDisplay from "./MenuDeviceDisplay";
import { FiPlus } from 'react-icons/fi';
import ModalForm from "../common/ModalForm";
import { useAddPageForm } from "./components/forms/useAddPageForm";

const MenuSection = ({ selectedDevice, menuItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const formProps = useAddPageForm(
    () => setIsModalOpen(false),
    menuItems // Passer les menuItems au hook
  );

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

      <ModalForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter une nouvelle page"
        formProps={{
          ...formProps,
          onCancel: () => setIsModalOpen(false)
        }}
      />
    </div>
  );
};

export default MenuSection;
