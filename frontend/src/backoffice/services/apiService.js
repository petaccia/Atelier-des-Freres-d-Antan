import { adminAuth } from './adminAuth';
import { toast } from 'react-toastify';

/**
 * Service pour gérer les requêtes API avec gestion automatique des erreurs d'authentification
 */
export const apiService = {
  /**
   * Effectue une requête API avec gestion des erreurs d'authentification et rafraîchissement automatique du token
   * @param {string} url - L'URL de la requête
   * @param {Object} options - Les options de la requête fetch
   * @param {boolean} redirectOnAuthError - Si true, redirige vers la page de connexion en cas d'erreur d'authentification
   * @param {boolean} attemptedRefresh - Si true, indique qu'un rafraîchissement de token a déjà été tenté
   * @returns {Promise<any>} - La réponse de l'API
   */
  async fetch(url, options = {}, redirectOnAuthError = true, attemptedRefresh = false) {
    // Vérifier si le token est sur le point d'expirer et le rafraîchir si nécessaire
    if (!attemptedRefresh && adminAuth.isAuthenticated() && adminAuth.isTokenExpiringSoon()) {
      try {
        console.log('Token sur le point d\'expirer, tentative de rafraîchissement...');
        await adminAuth.refreshToken();
        console.log('Token rafraîchi avec succès');
      } catch (refreshError) {
        console.error('Échec du rafraîchissement du token:', refreshError);
        // Continuer avec le token actuel même s'il est sur le point d'expirer
      }
    }

    // Ajouter le token d'authentification si disponible
    const token = adminAuth.getToken();
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }

    try {
      // Ajouter un paramètre timestamp pour éviter la mise en cache
      const timestamp = new Date().getTime();
      const separator = url.includes('?') ? '&' : '?';
      const urlWithTimestamp = `${url}${separator}_=${timestamp}`;

      const response = await fetch(urlWithTimestamp, options);

      // Gérer les erreurs d'authentification
      if (response.status === 401) {
        console.error('Erreur d\'authentification: Token expiré ou invalide');

        // Si nous n'avons pas encore tenté de rafraîchir le token, essayer de le rafraîchir
        if (!attemptedRefresh && adminAuth.isAuthenticated()) {
          try {
            console.log('Tentative de rafraîchissement du token après erreur 401...');
            await adminAuth.refreshToken();
            console.log('Token rafraîchi avec succès, nouvelle tentative de requête');

            // Réessayer la requête avec le nouveau token
            return this.fetch(url, options, redirectOnAuthError, true);
          } catch (refreshError) {
            console.error('Échec du rafraîchissement du token après erreur 401:', refreshError);
          }
        }

        // Si le rafraîchissement a échoué ou n'a pas été tenté, afficher un message et rediriger
        toast.error('Votre session a expiré. Veuillez vous reconnecter.', {
          autoClose: 5000,
          onClose: () => {
            if (redirectOnAuthError) {
              // Supprimer le token et rediriger vers la page de connexion
              adminAuth.logout();
              window.location.href = '/backoffice/login';
            }
          }
        });

        throw new Error('Session expirée');
      }

      // Gérer les autres erreurs
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `Erreur ${response.status}: ${response.statusText}`;
        } catch (e) {
          errorMessage = `Erreur ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  },

  /**
   * Effectue une requête GET
   * @param {string} url - L'URL de la requête
   * @param {Object} options - Options supplémentaires pour fetch
   * @returns {Promise<any>} - La réponse de l'API
   */
  async get(url, options = {}) {
    return this.fetch(url, {
      method: 'GET',
      ...options
    });
  },

  /**
   * Effectue une requête POST
   * @param {string} url - L'URL de la requête
   * @param {Object} data - Les données à envoyer
   * @param {Object} options - Options supplémentaires pour fetch
   * @returns {Promise<any>} - La réponse de l'API
   */
  async post(url, data, options = {}) {
    return this.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    });
  },

  /**
   * Effectue une requête PUT
   * @param {string} url - L'URL de la requête
   * @param {Object} data - Les données à envoyer
   * @param {Object} options - Options supplémentaires pour fetch
   * @returns {Promise<any>} - La réponse de l'API
   */
  async put(url, data, options = {}) {
    return this.fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    });
  },

  /**
   * Effectue une requête DELETE
   * @param {string} url - L'URL de la requête
   * @param {Object} options - Options supplémentaires pour fetch
   * @returns {Promise<any>} - La réponse de l'API
   */
  async delete(url, options = {}) {
    return this.fetch(url, {
      method: 'DELETE',
      ...options
    });
  }
};
