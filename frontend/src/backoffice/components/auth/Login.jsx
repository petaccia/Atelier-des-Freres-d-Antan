"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuth } from "@/backoffice/services/adminAuth";

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await adminAuth.login(credentials);
      router.push("/backoffice/dashboard");
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-primary-dark/50 rounded-2xl border border-accent/10">
        <div>
          <h2 className="text-center text-3xl font-bold text-whiteAmber">Connexion Backoffice</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}

          <div className="space-y-4">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-accent/20 placeholder-gray-400 text-white rounded-lg bg-primary-dark/50 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Nom d'utilisateur"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-accent/20 placeholder-gray-400 text-white rounded-lg bg-primary-dark/50 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
