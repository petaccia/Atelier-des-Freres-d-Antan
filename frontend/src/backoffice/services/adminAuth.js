const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const adminAuth = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/admin/auth/login`, {
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
