'use client';

import { useMenuCreate } from '@/backoffice/hooks/menu/useMenuCreate';
import { useState } from 'react';

const AddMenuItemForm = ({ onSubmit, onCancel, menuItems, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    menuType: 'BOTH',
    isActive: true,
    showIcon: true,
    parentId: ''
  });

  // Hook pour la creation d'un menu
  const { createMenuItem , isLoading, error } = useMenuCreate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        name === 'parentId' ? (value === '' ? null : Number(value)) :
          value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMenuItem(formData);
      onSuccess?.();
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Choix du type de menu pour lequel ajouter la page */}
      <div>
        <label htmlFor="menuType" className="block text-sm font-medium text-whiteGray mb-1">
          Type de menu
        </label>
        <select
          id="menuType"
          name="menuType"
          value={formData.menuType}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-lg text-whiteGray focus:outline-none focus:border-accent-light"
        >
          <option value="BOTH">Desktop et Mobile</option>
          <option value="DESKTOP">Desktop</option>
          <option value="MOBILE">Mobile</option>
        </select>
</div>

      {/* Titre */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-whiteGray mb-1">
          Titre de la page
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-lg text-whiteGray focus:outline-none focus:border-accent-light"
          required
        />
      </div>

      {/* Chemin URL */}
      <div>
        <label htmlFor="path" className="block text-sm font-medium text-whiteGray mb-1">
          Chemin URL
        </label>
        <input
          type="text"
          id="path"
          name="path"
          value={formData.path}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-lg text-whiteGray focus:outline-none focus:border-accent-light"
          required
        />
      </div>

      {/* Page parente */}
      <div>
        <label htmlFor="parentId" className="block text-sm font-medium text-whiteGray mb-1">
          Page parente
        </label>
        <select
          id="parentId"
          name="parentId"
          value={formData.parentId}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-primary border border-accent/20 rounded-lg text-whiteGray focus:outline-none focus:border-accent-light"
        >
          <option value="">Aucun parent (niveau racine)</option>
          {menuItems?.map(item => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

          {/* Options */}
      <div className="flex items-center gap-6">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-primary/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-accent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          <span className="ml-3 text-sm font-medium text-whiteGray">Page active</span>
        </label>

        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="showIcon"
            name="showIcon"
            checked={formData.showIcon}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-primary/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-accent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
          <span className="ml-3 text-sm font-medium text-whiteGray">Afficher l'icône</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-whiteGray hover:text-accent-light transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-lg transition-colors"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default AddMenuItemForm;

