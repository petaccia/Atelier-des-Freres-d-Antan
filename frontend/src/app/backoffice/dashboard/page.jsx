'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/backoffice/components/layouts/Sidebar';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/backoffice/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/backoffice/login');
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <Sidebar />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-whiteAmber">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
          >
            Déconnexion
          </button>
        </div>
        <div className="bg-primary-dark/50 rounded-2xl border border-accent/10 p-6">
          <p className="text-white">Bienvenue dans le backoffice !</p>
        </div>
      </div>
    </div>
  );
}