"use client";
import { useState } from 'react';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import MenuList from '@/backoffice/components/menu/MenuList';
import MenuHeader from '@/backoffice/components/menu/MenuHeader';
import MenuFormModal from '@/backoffice/components/menu/MenuFormModal';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import LoadingState from '@/backoffice/components/ui/loading/LoadingState';

export default function MenuPage() {
  const { menuItems, isLoading, error, createMenuItem, updateMenuItem, deleteMenuItem } = useAdminMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        await deleteMenuItem(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Une erreur est survenue lors de la suppression.');
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
      } else {
        // Création d'un nouvel élément
        await createMenuItem(formData);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      throw new Error('Une erreur est survenue lors de l\'enregistrement.');
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
      </div>
    </div>
  );
}
