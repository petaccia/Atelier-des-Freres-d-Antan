'use client';

import { useDeleteMenu } from '@/backoffice/hooks/menu/useDeleteMenu';
import { useState, useEffect } from 'react';
import SelectInput from './inputs/SelectInput';
import TextInput from './inputs/TextInput';
import ToggleInput from './inputs/ToggleInput';
import IconSelect from './inputs/IconSelect';
import { showConfirmationToast } from '@/backoffice/components/ui/confirmation/ShowConfirmationToast';

const DeleteMenuItemForm = ({ item, onCancel, onSuccess, menuItems }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    menuType: 'BOTH',
    isActive: true,
    showIcon: true,
    parentId: '',
    icon: ''
  });

  // Initialiser le formulaire avec les données de l'élément à supprimer
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        path: item.path || '',
        menuType: 'BOTH', // Par défaut
        isActive: item.isActive !== undefined ? item.isActive : true,
        showIcon: item.showIcon !== undefined ? item.showIcon : true,
        parentId: item.parentId || '',
        icon: item.icon || ''
      });
    }
  }, [item]);

  const { deleteMenuItem, isLoading, error } = useDeleteMenu({
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
      onCancel(); // Fermer la modale après suppression
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    showConfirmationToast({
      message: (
        <div>
          <div className="mb-2">Êtes-vous sûr de vouloir supprimer cette page ?</div>
          {item.children && item.children.length > 0 && (
            <div className="text-sm text-amber-300">
              Attention : La suppression de "{item.title}" entraînera également la suppression de tous ses sous-menus ({item.children.length} élément{item.children.length > 1 ? 's' : ''}).
            </div>
          )}
          <div className="text-sm text-amber-300 mt-2">Cette action est irréversible.</div>
        </div>
      ),
      onConfirm: () => deleteMenuItem(item),
      confirmText: 'Supprimer',
      confirmClass: 'bg-red-600 hover:bg-red-700',
      cancelText: 'Annuler'
    });
  };

  const menuTypeOptions = [
    { value: 'BOTH', label: 'Desktop et Mobile' },
    { value: 'DESKTOP', label: 'Desktop' },
    { value: 'MOBILE', label: 'Mobile' }
  ];

  const parentOptions = [
    { value: '', label: 'Aucun parent (niveau racine)' },
    ...(menuItems || []).map(menuItem => ({
      value: menuItem.id,
      label: menuItem.title
    }))
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-red-900/20 p-4 rounded-lg mb-6">
        <div className="text-center text-red-400 font-medium mb-2">
          Vous êtes sur le point de supprimer cet élément de menu
        </div>
        <div className="text-center text-white/70 text-sm">
          Veuillez vérifier les informations ci-dessous avant de confirmer la suppression.
        </div>
      </div>

      <SelectInput
        label="Type de menu"
        id="menuType"
        name="menuType"
        value={formData.menuType}
        onChange={() => {}}
        options={menuTypeOptions}
        disabled={true}
      />

      <TextInput
        label="Titre de la page"
        id="title"
        name="title"
        value={formData.title}
        onChange={() => {}}
        required
        disabled={true}
      />

      <TextInput
        label="Chemin URL"
        id="path"
        name="path"
        value={formData.path}
        onChange={() => {}}
        required
        disabled={true}
      />

      <SelectInput
        label="Page parente"
        id="parentId"
        name="parentId"
        value={formData.parentId}
        onChange={() => {}}
        options={parentOptions}
        disabled={true}
      />

      <div className="flex items-center gap-6">
        <ToggleInput
          label="Page active"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={() => {}}
          disabled={true}
        />

        <ToggleInput
          label="Afficher l'icône"
          id="showIcon"
          name="showIcon"
          checked={formData.showIcon}
          onChange={() => {}}
          disabled={true}
        />
      </div>

      {formData.showIcon && formData.icon && (
        <div className="border border-accent/20 rounded-lg p-4">
          <div className="text-white/70 mb-2">Icône sélectionnée :</div>
          <div className="flex items-center justify-center p-2">
            <IconSelect
              value={formData.icon}
              onChange={() => {}}
              disabled={true}
            />
          </div>
        </div>
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
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          {isLoading ? 'Chargement...' : 'Supprimer'}
        </button>
      </div>
      {error && <p className="font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default DeleteMenuItemForm;
