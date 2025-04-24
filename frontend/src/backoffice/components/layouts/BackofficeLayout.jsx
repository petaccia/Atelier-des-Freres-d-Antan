import { useState } from 'react';
import Sidebar from '@/backoffice/components/layouts/Sidebar';

const BackofficeLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary">
      <Sidebar />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
};

export default BackofficeLayout;

