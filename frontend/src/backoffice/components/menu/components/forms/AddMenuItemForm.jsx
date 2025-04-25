'use client';

import { useMenuCreate } from '@/backoffice/hooks/menu/useMenuCreate';
import { useState } from 'react';
import { toast } from 'react-toastify';
import SelectInput from './inputs/SelectInput';
import TextInput from './inputs/TextInput';
import ToggleInput from './inputs/ToggleInput';
import IconSelect from './inputs/IconSelect';

const AddMenuItemForm = ({ onCancel, menuItems }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    menuType: 'BOTH',
    isActive: true,
    showIcon: true,
    parentId: ''
  });

  const { createMenuItem, isLoading, error } = useMenuCreate();

  const isPathExists = (path) => {
    return menuItems.some(item => item.path === path);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked :
        name === 'parentId' ? (value === '' ? null : Number(value)) :
          value
    }));
  };

  const handleIconChange = (icon) => {
    setFormData(prev => ({ ...prev, icon: iconkey}));
  };

  const submitForm = async () => {
    const result = await createMenuItem(formData);
    
    if (!result.error) {
      onCancel();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPathExists(formData.path)) {
      toast.error(`Le chemin "${formData.path}" existe déjà. Veuillez en choisir un autre.`);
      return;
    }

    toast.info(
      <div>
        <p>Voulez-vous créer cette page ?</p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss();
              submitForm();
            }}
            className="px-3 py-1 bg-accent text-white rounded-md hover:bg-accent-light"
          >
            Confirmer
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Annuler
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false
      }
    );
  };

  const menuTypeOptions = [
    { value: 'BOTH', label: 'Desktop et Mobile' },
    { value: 'DESKTOP', label: 'Desktop' },
    { value: 'MOBILE', label: 'Mobile' }
  ];

  const parentOptions = [
    { value: '', label: 'Aucun parent (niveau racine)' },
    ...menuItems.map(item => ({
      value: item.id,
      label: item.title
    }))
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SelectInput
        label="Type de menu"
        id="menuType"
        name="menuType"
        value={formData.menuType}
        onChange={handleChange}
        options={menuTypeOptions}
      />

      <TextInput
        label="Titre de la page"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextInput
        label="Chemin URL"
        id="path"
        name="path"
        value={formData.path}
        onChange={handleChange}
        required
      />

      <SelectInput
        label="Page parente"
        id="parentId"
        name="parentId"
        value={formData.parentId}
        onChange={handleChange}
        options={parentOptions}
      />

      <div className="flex items-center gap-6">
        <ToggleInput
          label="Page active"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />

        <ToggleInput
          label="Afficher l'icône"
          id="showIcon"
          name="showIcon"
          checked={formData.showIcon}
          onChange={handleChange}
        />
      </div>

      {formData.showIcon && (
        <IconSelect value={formData.icon} onChange={handleIconChange} />
      )}

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
          disabled={isLoading}
          className="px-4 py-2 bg-accent hover:bg-accent-light text-white rounded-lg transition-colors"
        >
          {isLoading ? 'Chargement...' : 'Ajouter'}
        </button>
      </div>
      {error && <p className="font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default AddMenuItemForm;

