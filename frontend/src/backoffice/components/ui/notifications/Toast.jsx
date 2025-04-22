'use client';
import { useState, useEffect } from 'react';
import { MdCheckCircle, MdError, MdClose } from 'react-icons/md';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300); // Attendre la fin de l'animation avant d'appeler onClose
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const icon = type === 'success' ? <MdCheckCircle size={20} /> : <MdError size={20} />;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg text-white shadow-lg transition-all duration-300 z-50 ${bgColor} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="mr-2">{icon}</div>
      <p className="mr-4">{message}</p>
      <button
        onClick={handleClose}
        className="text-white/80 hover:text-white transition-colors"
      >
        <MdClose size={18} />
      </button>
    </div>
  );
}
