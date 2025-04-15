'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/backoffice/services/adminAuth';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      router.push('/backoffice/login');
    }
  }, [router]);

  const handleLogout = () => {
    adminAuth.logout();
    router.push('/backoffice/login');
  };

  return (
    <div className="min-h-screen bg-primary">
      <nav className="bg-primary-dark/50 border-b border-accent/10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-whiteAmber">
                Backoffice
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/80 rounded-lg"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}