import { useState } from 'react';
import { toast } from 'react-toastify';
import { showConfirmationToast } from '@/backoffice/components/ui/confirmation/ShowConfirmationToast';

export function useDeleteMenu({ onSuccess } = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmAndDeleteMenuItem = (item) => {
    // Afficher une confirmation avant de supprimer
    const hasChildren = item.children && item.children.length > 0;
    const warningMessage = hasChildren
      ? `Attention : La suppression de "${item.title}" entraînera également la suppression de tous ses sous-menus (${item.children.length} élément${item.children.length > 1 ? 's' : ''}).`
      : `Êtes-vous sûr de vouloir supprimer "${item.title}" ?`;

    showConfirmationToast({
      message: (
        <div>
          <div className="mb-2">{warningMessage}</div>
          <div className="text-sm text-amber-300">Cette action est irréversible.</div>
        </div>
      ),
      onConfirm: () => executeDeleteMenuItem(item),
      confirmText: 'Supprimer',
      confirmClass: 'bg-red-600 hover:bg-red-700'
    });
  };

  const executeDeleteMenuItem = async (item) => {
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier si l'URL de l'API est définie
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is not defined');
        throw new Error('API URL is not configured. Please check your environment variables.');
      }

      const token = localStorage.getItem('adminToken');
      const path = item.path.startsWith('/') ? item.path : `/${item.path}`;
      const encodedPath = encodeURIComponent(path);

      // Ajouter un paramètre timestamp pour éviter la mise en cache
      const timestamp = new Date().getTime();
      const url = `${apiUrl}/menu/${encodedPath}?_=${timestamp}`;

      console.log('Deleting menu item from URL:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message;
        } catch (e) {
          errorMessage = `Erreur ${response.status}: Impossible de supprimer l'élément de menu`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      toast.success('Élément de menu supprimé avec succès');

      // Appel du callback avec un délai pour s'assurer que le toast est affiché
      console.log('Suppression réussie, appel du callback onSuccess dans 500ms');
      setTimeout(() => {
        if (onSuccess) {
          console.log('Appel du callback onSuccess après suppression');
          onSuccess();
        } else {
          console.warn('onSuccess n\'est pas défini dans useDeleteMenu');
        }
      }, 500);

      return result;
    } catch (err) {
      console.error('Erreur lors de la suppression du menu:', err);
      setError(err.message);
      toast.error(err.message);

      // Simuler un succès en développement pour tester l'interface
      if (process.env.NODE_ENV === 'development') {
        console.log('En mode développement, simulation de suppression réussie malgré l\'erreur');
        setTimeout(() => {
          if (onSuccess) {
            console.log('Appel du callback onSuccess (simulation)');
            onSuccess();
          } else {
            console.warn('onSuccess n\'est pas défini dans useDeleteMenu (simulation)');
          }
        }, 500);
      }

      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMenuItem: confirmAndDeleteMenuItem, isLoading, error };
}