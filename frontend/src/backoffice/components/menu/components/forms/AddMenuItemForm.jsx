'use client';

import { useState } from 'react';

const AddMenuItemForm = ({ onSubmit, onCancel, menuItems }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    isActive: true,
    showIcon: true,
    parentId: ''  
  });

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
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-accent bg-primary border-accent/20 rounded focus:ring-accent-light"
          />
          <label htmlFor="isActive" className="ml-2 text-sm text-whiteGray">
            Page active
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="showIcon"
            name="showIcon"
            checked={formData.showIcon}
            onChange={handleChange}
            className="w-4 h-4 text-accent bg-primary border-accent/20 rounded focus:ring-accent-light"
          />
          <label htmlFor="showIcon" className="ml-2 text-sm text-whiteGray">
            Afficher l'icône
          </label>
        </div>
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
