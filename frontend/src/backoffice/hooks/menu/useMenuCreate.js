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
      
      if (!token) {
        const error = new Error('Token d\'authentification manquant');
        error.code = 'AUTH_ERROR';
        throw error;
      }

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const isTokenExpired = Date.now() >= tokenPayload.exp * 1000;

      if (isTokenExpired) {
        localStorage.removeItem('adminToken');
        const error = new Error('Session expirée. Veuillez vous reconnecter.');
        error.code = 'AUTH_ERROR';
        throw error;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        const error = new Error('Session invalide. Veuillez vous reconnecter.');
        error.code = 'AUTH_ERROR';
        throw error;
      }

      if (response.status === 409) {
        const error = new Error(`Le chemin "${menuData.path}" existe déjà dans le menu`);
        error.code = 'PATH_EXISTS';
        throw error;
      }

      if (!response.ok) {
        const error = new Error(data.message || 'Erreur lors de la création du menu');
        error.code = 'API_ERROR';
        throw error;
      }

      toast.success('Page ajoutée avec succès');
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Une erreur est survenue lors de la création';
      setError(errorMessage);
      
      if (err.code === 'AUTH_ERROR') {
        window.location.href = '/backoffice/login';
      } else {
        toast.error(errorMessage);
      }
      
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return { createMenuItem, isLoading, error };
};
