'use client';
import { MdEdit, MdPublish } from 'react-icons/md';

export default function MenuHeader({ onSaveDraft, onPublish }) {
  return (
    <div className="bg-primary-dark/50 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-semibold text-accent">Gestion du Menu</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onSaveDraft}
            className="px-4 py-2 bg-primary-dark hover:bg-primary-dark/80 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <MdEdit size={18} />
            <span>Enregistrer brouillon</span>
          </button>
          
          <button
            onClick={onPublish}
            className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <MdPublish size={18} />
            <span>Publier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
