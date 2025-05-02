const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_AUTH_LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_ADMIN_AUTH_LOGIN_ENDPOINT || '/api/admin/auth/login';
const ADMIN_AUTH_REFRESH_ENDPOINT = process.env.NEXT_PUBLIC_ADMIN_AUTH_REFRESH_ENDPOINT || '/api/admin/auth/refresh';

export const adminAuth = {
  async login(credentials) {
    const response = await fetch(`${API_URL}${ADMIN_AUTH_LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Identifiants invalides");
    }

    const data = await response.json();
    localStorage.setItem("adminToken", data.access_token);

    // Stocker la date d'expiration (8 heures à partir de maintenant)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 8);
    localStorage.setItem("tokenExpiresAt", expiresAt.toISOString());

    return data;
  },

  async refreshToken() {
    const token = this.getToken();

    if (!token) {
      throw new Error("Aucun token à rafraîchir");
    }

    try {
      const response = await fetch(`${API_URL}${ADMIN_AUTH_REFRESH_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Impossible de rafraîchir le token");
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.access_token);

      // Mettre à jour la date d'expiration (8 heures à partir de maintenant)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8);
      localStorage.setItem("tokenExpiresAt", expiresAt.toISOString());

      return data;
    } catch (error) {
      // En cas d'échec, déconnecter l'utilisateur
      this.logout();
      throw error;
    }
  },

  async logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("tokenExpiresAt");
  },

  getToken() {
    return localStorage.getItem("adminToken");
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Vérifie si le token est sur le point d'expirer (moins de 30 minutes restantes)
   * @returns {boolean} True si le token est sur le point d'expirer
   */
  isTokenExpiringSoon() {
    const expiresAtStr = localStorage.getItem("tokenExpiresAt");
    if (!expiresAtStr) return false;

    const expiresAt = new Date(expiresAtStr);
    const now = new Date();

    // Considérer que le token expire bientôt s'il reste moins de 30 minutes
    const thirtyMinutesInMs = 30 * 60 * 1000;
    return expiresAt.getTime() - now.getTime() < thirtyMinutesInMs;
  },
};
