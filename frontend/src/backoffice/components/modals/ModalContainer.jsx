'use client';

import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import AddMenuItemForm from '../menu/components/forms/AddMenuItemForm';

const ModalContainer = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  // Empêcher le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay avec effet de flou */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Contenu de la modale */}
      <div className="relative bg-primary-dark rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-accent/20">
          <h2 className="text-xl font-medium text-whiteGray">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-accent-light hover:text-whiteGray transition-colors"
            aria-label="Fermer"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-4 text-whiteGray">
          {children}
        </div>
        <AddMenuItemForm 
        onSubmit={() => {}}
        onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default ModalContainer;