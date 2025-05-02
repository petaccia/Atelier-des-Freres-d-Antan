'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/backoffice/services/adminAuth';
import PageLoading from '@/backoffice/components/layouts/PageLoading';

/**
 * Composant qui vérifie si l'utilisateur est authentifié
 * et le redirige vers la page de connexion si ce n'est pas le cas
 */
export default function AuthCheck({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const checkAuth = () => {
      const isAuthenticated = adminAuth.isAuthenticated();
      
      if (!isAuthenticated) {
        // Rediriger vers la page de connexion
        router.push('/backoffice/login');
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();

    // Vérifier périodiquement si le token est toujours valide
    const interval = setInterval(() => {
      if (!adminAuth.isAuthenticated()) {
        // Si le token a été supprimé (par exemple par apiService), rediriger vers la page de connexion
        router.push('/backoffice/login');
      }
    }, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, [router]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isChecking) {
    return <PageLoading text="Vérification de l'authentification..." />;
  }

  // Afficher les enfants si l'utilisateur est authentifié
  return children;
}
