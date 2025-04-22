'use client';
import { MdClose } from 'react-icons/md';

export default function ModalContainer({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className = 'bg-primary-dark rounded-lg w-full max-w-md p-6 relative'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={className}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <MdClose size={24} />
        </button>
        
        <h2 className="text-xl font-semibold text-accent mb-6">
          {title}
        </h2>
        
        {children}
      </div>
    </div>
  );
}
