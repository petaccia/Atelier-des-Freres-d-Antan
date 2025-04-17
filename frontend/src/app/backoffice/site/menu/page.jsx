'use client';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import Link from 'next/link';

export default function MenuPage() {
  const router = useRouter();
  const { menuItems, isLoading, error, createMenuItem, updateMenuItem, deleteMenuItem } = useAdminMenu();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/backoffice/login');
      return;
    }
  }, [router]);

  const handleCreate = () => {
    // TODO: Implémenter la logique de création
    createMenuItem();
  };

  const handleUpdate = (itemId) => {
    // TODO: Implémenter la logique de mise à jour
    updateMenuItem(itemId);
  };

  const handleDelete = (itemId) => {
    // TODO: Implémenter la logique de suppression
    deleteMenuItem(itemId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary p-8">
        <Sidebar />
        <div className="ml-64">
          <div className="max-w-7xl mx-auto">
            <p className="text-white">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary p-8">
        <Sidebar />
        <div className="ml-64">
          <div className="max-w-7xl mx-auto">
            <p className="text-center font-bold text-red-500">Erreur: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-8">
      <Sidebar />
      <div className="ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link href="/backoffice/site" className="hover:text-accent">
              Site Internet
            </Link>
            <span>/</span>
            <span className="text-accent">Menu</span>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-whiteAmber">Gestion du Menu</h1>
            <button 
              className="bg-accent hover:bg-accent-light text-primary px-4 py-2 rounded-lg transition-colors"
              onClick={handleCreate}
            >
              Ajouter un item
            </button>
          </div>

          <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
            {!menuItems || menuItems.length === 0 ? (
              <p className="text-white/80">Aucun élément dans le menu</p>
            ) : (
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li 
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-primary-dark/30 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-accent">{item.title}</h3>
                      <p className="text-white/60 text-sm">Path: {item.path}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        className="text-white/80 hover:text-accent transition-colors"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Éditer
                      </button>
                      <button 
                        className="text-white/80 hover:text-red-500 transition-colors"
                        onClick={() => handleDelete(item.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
