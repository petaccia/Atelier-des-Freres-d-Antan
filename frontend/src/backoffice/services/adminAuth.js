const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_AUTH_LOGIN_ENDPOINT = process.env.NEXT_PUBLIC_ADMIN_AUTH_LOGIN_ENDPOINT ;

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
    return data;
  },

  async logout() {
    localStorage.removeItem("adminToken");
  },

  getToken() {
    return localStorage.getItem("adminToken");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
