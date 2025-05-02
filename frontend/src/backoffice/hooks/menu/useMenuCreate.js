import { useState } from 'react';
import { toast } from 'react-toastify';
import { apiService } from '@/backoffice/services/apiService';

export const useMenuCreate = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMenuItem = async (menuData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Utiliser le service API pour effectuer la requête POST
      const data = await apiService.post(`${process.env.NEXT_PUBLIC_API_URL}/menu`, menuData);

      toast.success('Menu ajouté avec succès');
      if (onSuccess) onSuccess();
      return data;

    } catch (err) {
      // Ne pas afficher d'erreur si c'est une erreur d'authentification (déjà gérée par apiService)
      if (err.message !== 'Session expirée') {
        const errorMessage = err.message || 'Une erreur est survenue lors de la création';
        setError(errorMessage);
        toast.error(errorMessage);
      }

      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return { createMenuItem, isLoading, error };
};
