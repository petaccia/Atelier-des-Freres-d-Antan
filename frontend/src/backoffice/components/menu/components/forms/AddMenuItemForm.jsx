'use client';

import { useMenuCreate } from '@/backoffice/hooks/menu/useMenuCreate';
import { useDeleteMenu } from '@/backoffice/hooks/menu/useDeleteMenu';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SelectInput from './inputs/SelectInput';
import TextInput from './inputs/TextInput';
import ToggleInput from './inputs/ToggleInput';
import IconSelect from './inputs/IconSelect';
import { showConfirmationToast } from '@/backoffice/components/ui/confirmation/ShowConfirmationToast';

const AddMenuItemForm = ({ onCancel, menuItems, onSuccess, mode = 'add', itemToDelete = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    menuType: 'BOTH',
    isActive: true,
    showIcon: true,
    parentId: '',
    icon: ''
  });

  // Si on est en mode suppression, initialiser le formulaire avec les données de l'élément à supprimer
  useEffect(() => {
    if (mode === 'delete' && itemToDelete) {
      setFormData({
        title: itemToDelete.title || '',
        path: itemToDelete.path || '',
        menuType: 'BOTH', // Par défaut
        isActive: itemToDelete.isActive !== undefined ? itemToDelete.isActive : true,
        showIcon: itemToDelete.showIcon !== undefined ? itemToDelete.showIcon : true,
        parentId: itemToDelete.parentId || '',
        icon: itemToDelete.icon || ''
      });
    }
  }, [mode, itemToDelete]);

  const { createMenuItem, isLoading: isLoadingCreate, error: errorCreate } = useMenuCreate();
  const { deleteMenuItem, isLoading: isLoadingDelete, error: errorDelete } = useDeleteMenu({
    onSuccess: () => {
      console.log('Callback onSuccess appelé dans AddMenuItemForm');
      if (onSuccess) {
        console.log('Appel de onSuccess depuis AddMenuItemForm');
        onSuccess();
      } else {
        console.warn('onSuccess n\'est pas défini dans AddMenuItemForm');
      }
      console.log('Fermeture de la modale');
      onCancel(); // Fermer la modale après suppression
    }
  });

  const isLoading = mode === 'add' ? isLoadingCreate : isLoadingDelete;
  const error = mode === 'add' ? errorCreate : errorDelete;

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
    setFormData(prev => ({ ...prev, icon: icon}));
  };

  const submitAddForm = async () => {
    try {
      const result = await createMenuItem(formData);
      if (!result.error) {
        // Le toast de succès est déjà affiché dans le hook useMenuCreate
        console.log('Menu ajouté avec succès');
        if (onSuccess) {
          onSuccess();
        }
        onCancel(); // Fermer le modal après succès
      }
    } catch (err) {
      console.error('Erreur lors de la création du menu:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === 'add') {
      // Vérification pour l'ajout
      if (isPathExists(formData.path)) {
        toast.error(`Le chemin "${formData.path}" existe déjà. Veuillez en choisir un autre.`);
        return;
      }

      showConfirmationToast({
        message: <div>Êtes-vous sûr de vouloir ajouter cette page ?</div>,
        onConfirm: submitAddForm,
        confirmText: 'Confirmer',
        cancelText: 'Annuler'
      });
    } else {
      // En mode suppression, appeler directement deleteMenuItem
      // qui affichera sa propre confirmation
      console.log('Mode suppression, appel direct de deleteMenuItem');
      if (itemToDelete) {
        console.log('Appel de deleteMenuItem avec:', itemToDelete);
        deleteMenuItem(itemToDelete);
      } else {
        console.warn('itemToDelete est null ou undefined');
      }
    }

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
      {mode === 'delete' && (
        <div className="bg-red-900/20 p-4 rounded-lg mb-6">
          <div className="text-center text-red-400 font-medium mb-2">
            Vous êtes sur le point de supprimer cet élément de menu
          </div>
          <div className="text-center text-white/70 text-sm">
            Veuillez vérifier les informations ci-dessous avant de confirmer la suppression.
          </div>
        </div>
      )}

      <SelectInput
        label="Type de menu"
        id="menuType"
        name="menuType"
        value={formData.menuType}
        onChange={handleChange}
        options={menuTypeOptions}
        disabled={mode === 'delete'}
      />

      <TextInput
        label="Titre de la page"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        disabled={mode === 'delete'}
      />

      <TextInput
        label="Chemin URL"
        id="path"
        name="path"
        value={formData.path}
        onChange={handleChange}
        required
        disabled={mode === 'delete'}
      />

      <SelectInput
        label="Page parente"
        id="parentId"
        name="parentId"
        value={formData.parentId}
        onChange={handleChange}
        options={parentOptions}
        disabled={mode === 'delete'}
      />

      <div className="flex items-center gap-6">
        <ToggleInput
          label="Page active"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          disabled={mode === 'delete'}
        />

        <ToggleInput
          label="Afficher l'icône"
          id="showIcon"
          name="showIcon"
          checked={formData.showIcon}
          onChange={handleChange}
          disabled={mode === 'delete'}
        />
      </div>

      {formData.showIcon && (
        <IconSelect
          value={formData.icon}
          onChange={handleIconChange}
          disabled={mode === 'delete'}
        />
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
          className={`px-4 py-2 ${mode === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-accent hover:bg-accent-light'} text-white rounded-lg transition-colors`}
        >
          {isLoading ? 'Chargement...' : mode === 'delete' ? 'Supprimer' : 'Ajouter'}
        </button>
      </div>
      {error && <p className="font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default AddMenuItemForm;

