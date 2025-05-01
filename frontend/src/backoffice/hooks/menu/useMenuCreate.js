import { useState } from 'react';
import { toast } from 'react-toastify';

export const useMenuCreate = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMenuItem = async (menuData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(menuData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success('Menu ajouté avec succès');
      if (onSuccess) onSuccess();
      return data;

    } catch (err) {
      const errorMessage = err.message || 'Une erreur est survenue lors de la création';
      setError(errorMessage);
      toast.error(errorMessage);

      if (err.response?.status === 401) {
        window.location.href = '/backoffice/login';
      }

      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return { createMenuItem, isLoading, error };
};
