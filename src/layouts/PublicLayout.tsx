
import React, { ReactNode } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { Toaster } from '@/components/ui/toaster';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
      <Toaster />
    </div>
  );
};

export default PublicLayout;
