'use client';

import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const ModalContainer = ({
  isOpen,
  onClose,
  title,
  children
}) => {
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
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-primary-dark rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative flex items-center justify-center p-6 border-b border-accent/20">
          <h2 className="text-xl font-light tracking-wide text-whiteAmber">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-accent-light hover:text-whiteGray hover:bg-accent/10 transition-all duration-200"
            aria-label="Fermer"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 text-whiteGray">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
