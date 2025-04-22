'use client';
import { useState, useEffect } from 'react';
import { MdWarning, MdClose } from 'react-icons/md';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmationText = null,
  confirmButtonText = 'Confirmer',
  cancelButtonText = 'Annuler',
  isDestructive = false
}) {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(!confirmationText);

  // Réinitialiser l'input lorsque la modale s'ouvre
  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setIsValid(!confirmationText);
    }
  }, [isOpen, confirmationText]);

  // Vérifier si l'input correspond au texte de confirmation
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsValid(!confirmationText || value === confirmationText);
  };

  const handleConfirm = () => {
    if (isValid) {
      onConfirm();
      onClose();
    }
  };

  // Gérer la touche Entrée pour confirmer et Échap pour annuler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValid) {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-primary-dark rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          aria-label="Fermer"
        >
          <MdClose size={24} />
        </button>
        
        <div className="flex items-center mb-4">
          <div className={`mr-3 ${isDestructive ? 'text-red-500' : 'text-amber-500'}`}>
            <MdWarning size={28} />
          </div>
          <h2 className="text-xl font-semibold text-accent">{title}</h2>
        </div>
        
        <div className="mb-6 text-white/80">
          <p className="mb-4">{message}</p>
          
          {confirmationText && (
            <div className="mt-4">
              <label className="block text-sm text-white/60 mb-2">
                Pour confirmer, tapez <span className="font-mono bg-primary-dark/80 px-1 py-0.5 rounded">{confirmationText}</span>
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white border-accent/30"
                placeholder={`Tapez ${confirmationText}`}
                autoFocus
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-accent/30 text-white/80 rounded-lg hover:bg-accent/10 transition-colors"
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValid}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDestructive 
                ? 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-600/50' 
                : 'bg-accent hover:bg-accent-light text-primary disabled:bg-accent/50'
            } disabled:cursor-not-allowed`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}
