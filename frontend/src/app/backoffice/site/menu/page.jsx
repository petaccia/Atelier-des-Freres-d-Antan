'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminMenu } from '@/backoffice/hooks/useAdminMenu';
import BackofficeLayout from '@/backoffice/components/layouts/BackofficeLayout';
import MenuHeader from '@/backoffice/components/menu/MenuHeader';
import MenuList from '@/backoffice/components/menu/MenuList';
import LoadingState from '@/backoffice/components/common/LoadingState';
import ErrorState from '@/backoffice/components/common/ErrorState';

export default function MenuPage() {
  const router = useRouter();
  const { 
    menuItems, 
    isLoading, 
    error, 
    createMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
  } = useAdminMenu();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/backoffice/login');
    }
  }, [router]);

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    return (
      <>
        <MenuHeader onCreateItem={createMenuItem} />
        <div className="bg-primary-dark/50 rounded-xl p-6 border border-accent/10">
          <MenuList 
            items={menuItems}
            onUpdate={updateMenuItem}
            onDelete={deleteMenuItem}
          />
        </div>
      </>
    );
  };

  return (
    <BackofficeLayout>
      {renderContent()}
    </BackofficeLayout>
  );
}
