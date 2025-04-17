"use client";
import { useEffect } from 'react';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import MenuList from '@/backoffice/components/menu/MenuList';
import MenuHeader from '@/backoffice/components/menu/MenuHeader';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import LoadingState from '@/backoffice/components/ui/loading/LoadingState';

export default function MenuPage() {
  const { menuItems, isLoading, error, refreshMenu } = useAdminMenu();

  const handleUpdate = async (id) => {
    console.log('Mise à jour de l\'item:', id);
  };

  const handleDelete = async (id) => {
    console.log('Suppression de l\'item:', id);
  };

  const handleCreate = () => {
    console.log('Création d\'un nouvel item');
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
      </div>
    </div>
  );
}
