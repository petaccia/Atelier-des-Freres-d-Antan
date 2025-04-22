"use client";
import { useState } from 'react';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import MenuList from '@/backoffice/components/menu/MenuList';
import MenuHeader from '@/backoffice/components/menu/MenuHeader';
import MenuFormModal from '@/backoffice/components/menu/MenuFormModal';
import MenuPublishWorkflow from '@/backoffice/components/menu/MenuPublishWorkflow';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import LoadingState from '@/backoffice/components/ui/loading/LoadingState';
import Toast from '@/backoffice/components/ui/notifications/Toast';
import ConfirmationModal from '@/backoffice/components/ui/modals/ConfirmationModal';

export default function MenuPage() {
  const {
    menuItems,
    draftItems,
    isLoading,
    error,
    hasDraft,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    saveDraft,
    publishChanges,
    discardChanges
  } = useAdminMenu();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // État pour la modale de confirmation de suppression
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    itemId: null,
    itemTitle: '',
    hasChildren: false,
    childrenCount: 0
  });

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
    const childrenCount = hasChildren ? itemToDelete.children.length : 0;

    // Ouvrir la modale de confirmation
    setDeleteConfirmation({
      isOpen: true,
      itemId: id,
      itemTitle: itemToDelete.title,
      hasChildren,
      childrenCount
    });
  };

  // Fonction exécutée lorsque l'utilisateur confirme la suppression
  const confirmDelete = async () => {
    const { itemId, itemTitle, hasChildren } = deleteConfirmation;

    try {
      const result = await deleteMenuItem(itemId);

      // Fermer la modale de confirmation
      closeDeleteConfirmation();

      // Message de succès adapté
      let successMessage = `L'élément "${itemTitle}" a été supprimé avec succès`;
      if (result.hasDeletedChildren) {
        successMessage += ` ainsi que ses sous-menus`;
      }

      setNotification({
        message: successMessage,
        type: 'success'
      });

      // Rafraîchir les données après la suppression
      // Dans une implémentation réelle avec API, nous ferions cela après l'appel API
      // refreshMenu();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setNotification({
        message: `Erreur: ${error.message || 'Une erreur est survenue lors de la suppression.'}`,
        type: 'error'
      });
    }
  };

  // Fermer la modale de confirmation
  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
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

  // Fonctions pour le workflow de publication
  const handleSaveDraft = async () => {
    try {
      await saveDraft();
      setNotification({
        message: 'Brouillon sauvegardé avec succès',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: `Erreur: ${error.message || 'Une erreur est survenue lors de la sauvegarde du brouillon.'}`,
        type: 'error'
      });
    }
  };

  const handlePublish = async () => {
    try {
      await publishChanges();
      setNotification({
        message: 'Menu publié avec succès',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: `Erreur: ${error.message || 'Une erreur est survenue lors de la publication.'}`,
        type: 'error'
      });
    }
  };

  const handleDiscardChanges = async () => {
    try {
      await discardChanges();
      setNotification({
        message: 'Modifications annulées',
        type: 'success'
      });
    } catch (error) {
      setNotification({
        message: `Erreur: ${error.message || 'Une erreur est survenue lors de l\'annulation des modifications.'}`,
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        <MenuHeader onCreateItem={handleCreate} />

        {/* Workflow de prévisualisation et publication */}
        <MenuPublishWorkflow
          menuItems={menuItems}
          draftItems={draftItems}
          isLoading={isLoading}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          onDiscardChanges={handleDiscardChanges}
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

        {/* Modale de confirmation de suppression */}
        <ConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          onClose={closeDeleteConfirmation}
          onConfirm={confirmDelete}
          title="Confirmer la suppression"
          message={
            deleteConfirmation.hasChildren
              ? `Vous êtes sur le point de supprimer l'élément "${deleteConfirmation.itemTitle}" du menu ainsi que ses ${deleteConfirmation.childrenCount} sous-menu(s).

Attention : Cette action ne supprime pas les pages associées, mais les visiteurs ne pourront plus y accéder depuis le menu. Cette action est irréversible.`
              : `Vous êtes sur le point de supprimer l'élément "${deleteConfirmation.itemTitle}" du menu.

Attention : Cette action ne supprime pas la page associée, mais les visiteurs ne pourront plus y accéder depuis le menu. Cette action est irréversible.`
          }
          confirmationText="supprimer"
          confirmButtonText="Supprimer"
          cancelButtonText="Annuler"
          isDestructive={true}
        />
      </div>
    </div>
  );
}
