'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/backoffice/components/layouts/Sidebar';

export default function SitePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/backoffice/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-primary p-8">
      <Sidebar />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-whiteAmber mb-8">Site Internet</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
              <h2 className="text-xl font-semibold text-accent mb-4">Menu</h2>
              <p className="text-white/80 mb-4">
                Gérez la structure et le contenu du menu principal du site.
              </p>
              <a 
                href="/backoffice/menu"
                className="text-accent hover:text-accent-light transition-colors"
              >
                Gérer le menu →
              </a>
            </div>

            <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
              <h2 className="text-xl font-semibold text-accent mb-4">Pages</h2>
              <p className="text-white/80 mb-4">
                Modifiez le contenu des différentes pages du site.
              </p>
              <a 
                href="/backoffice/pages"
                className="text-accent hover:text-accent-light transition-colors"
              >
                Gérer les pages →
              </a>
            </div>

            <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
              <h2 className="text-xl font-semibold text-accent mb-4">Médias</h2>
              <p className="text-white/80 mb-4">
                Gérez les images et autres fichiers médias du site.
              </p>
              <a 
                href="/backoffice/medias"
                className="text-accent hover:text-accent-light transition-colors"
              >
                Gérer les médias →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}