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
    const checkAuth = async () => {
      const isAuthenticated = adminAuth.isAuthenticated();

      if (!isAuthenticated) {
        // Rediriger vers la page de connexion
        router.push('/backoffice/login');
      } else {
        // Vérifier si le token est sur le point d'expirer et le rafraîchir si nécessaire
        if (adminAuth.isTokenExpiringSoon()) {
          try {
            console.log('Token sur le point d\'expirer, tentative de rafraîchissement...');
            await adminAuth.refreshToken();
            console.log('Token rafraîchi avec succès');
          } catch (error) {
            console.error('Échec du rafraîchissement du token:', error);
            // Si le rafraîchissement échoue, rediriger vers la page de connexion
            router.push('/backoffice/login');
            return;
          }
        }

        setIsChecking(false);
      }
    };

    checkAuth();

    // Vérifier périodiquement si le token est toujours valide et le rafraîchir si nécessaire
    const interval = setInterval(async () => {
      if (!adminAuth.isAuthenticated()) {
        // Si le token a été supprimé (par exemple par apiService), rediriger vers la page de connexion
        router.push('/backoffice/login');
      } else if (adminAuth.isTokenExpiringSoon()) {
        // Si le token est sur le point d'expirer, essayer de le rafraîchir
        try {
          console.log('Token sur le point d\'expirer, tentative de rafraîchissement...');
          await adminAuth.refreshToken();
          console.log('Token rafraîchi avec succès');
        } catch (error) {
          console.error('Échec du rafraîchissement du token:', error);
          // Si le rafraîchissement échoue, rediriger vers la page de connexion
          router.push('/backoffice/login');
        }
      }
    }, 5 * 60 * 1000); // Vérifier toutes les 5 minutes

    return () => clearInterval(interval);
  }, [router]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isChecking) {
    return <PageLoading text="Vérification de l'authentification..." />;
  }

  // Afficher les enfants si l'utilisateur est authentifié
  return children;
}
