'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/backoffice/components/layouts/Sidebar';
import ManagementCard from '@/backoffice/components/cards/CardSite';
import { managementCards } from '@/backoffice/backofficeData/maganementCards';

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
            {managementCards.map((card, index) => (
              <ManagementCard
                key={index}
                title={card.title}
                description={card.description}
                href={card.href}
                linkText={card.linkText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}