"use client";
import { useState } from 'react';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import MenuList from '@/backoffice/components/menu/MenuList';
import MenuHeader from '@/backoffice/components/menu/MenuHeader';
import MenuFormModal from '@/backoffice/components/menu/MenuFormModal';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import LoadingState from '@/backoffice/components/ui/loading/LoadingState';
import Toast from '@/backoffice/components/ui/notifications/Toast';

export default function MenuPage() {
  const { menuItems, isLoading, error, createMenuItem, updateMenuItem, deleteMenuItem } = useAdminMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleUpdate = async (id) => {
    // Trouver l'item à éditer
    const itemToEdit = findItemById(id, menuItems);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setIsModalOpen(true);
    }
  };

  const findItemById = (id, items) => {
    // Chercher dans les items principaux
    const mainItem = items.find(item => item.id === id);
    if (mainItem) return mainItem;

    // Chercher dans les sous-menus
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        const childItem = item.children.find(child => child.id === id);
        if (childItem) return childItem;
      }
    }

    return null;
  };

  const handleDelete = async (id) => {
    // Trouver l'item pour vérifier s'il a des sous-menus
    const itemToDelete = findItemById(id, menuItems);

    if (!itemToDelete) {
      setNotification({
        message: `Erreur: Élément non trouvé`,
        type: 'error'
      });
      return;
    }

    // Vérifier si l'item a des sous-menus
    const hasChildren = itemToDelete.children && itemToDelete.children.length > 0;

    // Message de confirmation adapté
    let confirmMessage = `Êtes-vous sûr de vouloir supprimer l'élément "${itemToDelete.title}" ?`;
    if (hasChildren) {
      confirmMessage = `Attention ! L'élément "${itemToDelete.title}" contient ${itemToDelete.children.length} sous-menu(s) qui seront également supprimés. Voulez-vous continuer ?`;
    }

    if (window.confirm(confirmMessage)) {
      try {
        const result = await deleteMenuItem(id);

        // Message de succès adapté
        let successMessage = `L'élément "${itemToDelete.title}" a été supprimé avec succès`;
        if (result.hasDeletedChildren) {
          successMessage += ` ainsi que ses sous-menus`;
        }

        setNotification({
          message: successMessage,
          type: 'success'
        });
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setNotification({
          message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression.'}`,
          type: 'error'
        });
      }
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingItem) {
        // Mise à jour d'un élément existant
        await updateMenuItem(editingItem.id, formData);
        setNotification({
          message: `L'élément "${formData.title}" a été mis à jour avec succès`,
          type: 'success'
        });
      } else {
        // Création d'un nouvel élément
        await createMenuItem(formData);
        setNotification({
          message: `L'élément "${formData.title}" a été créé avec succès`,
          type: 'success'
        });
      }
      return true; // Indiquer que tout s'est bien passé
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      setNotification({
        message: `Erreur: ${error.message || 'Une erreur est survenue lors de l\'enregistrement.'}`,
        type: 'error'
      });
      throw error; // Propager l'erreur pour que le formulaire puisse la gérer
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Sidebar />
        <div className="ml-64 p-8">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary">
        <Sidebar />
        <div className="ml-64 p-8">
          <div>Une erreur est survenue: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        <MenuHeader onCreateItem={handleCreate} />
        <MenuList
          items={menuItems}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* Modal de création/édition */}
        <MenuFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          menuItems={menuItems}
          editItem={editingItem}
        />

        {/* Notifications */}
        {notification && (
          <Toast
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}
