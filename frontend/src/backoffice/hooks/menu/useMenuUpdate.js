import { useState } from "react";
import { toast } from "react-toastify";
import { apiService } from "@/backoffice/services/apiService";

export const useMenuUpdate = (onSuccess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMenuItem = async (id, menuData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Vérifier si l'URL de l'API est définie
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        throw new Error("API URL is not configured. Please check your environment variables.");
      }

      // Supprimer le champ path des données à envoyer pour éviter de le modifier
      const { path, ...dataToUpdate } = menuData;
      console.log("Données à mettre à jour (sans le path):", dataToUpdate);

      // Utiliser le service API pour effectuer la requête PUT
      const data = await apiService.put(`${apiUrl}/menu/${id}`, dataToUpdate);

      toast.success("Menu mis à jour avec succès");
      if (onSuccess) onSuccess();
      return data;
    } catch (err) {
      // Ne pas afficher d'erreur si c'est une erreur d'authentification (déjà gérée par apiService)
      if (err.message !== "Session expirée") {
        const errorMessage = err.message || "Une erreur est survenue lors de la mise à jour";
        setError(errorMessage);
        toast.error(errorMessage);
      }

      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateMenuItem,
    isLoading,
    error,
  };
};
