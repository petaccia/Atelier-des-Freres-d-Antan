"use client";

import { usePathname } from "next/navigation";
import AuthCheck from "@/backoffice/components/auth/AuthCheck";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BackofficeLayout({ children }) {
  const pathname = usePathname();

  // Ne pas vérifier l'authentification sur la page de connexion
  const isLoginPage = pathname === "/backoffice/login";

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {isLoginPage ? (
        // Afficher directement les enfants pour la page de connexion
        children
      ) : (
        // Vérifier l'authentification pour toutes les autres pages du backoffice
        <AuthCheck>{children}</AuthCheck>
      )}
    </>
  );
}
