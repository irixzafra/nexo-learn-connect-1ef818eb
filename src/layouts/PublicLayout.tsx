
import React, { ReactNode } from 'react';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';
import { Toaster } from '@/components/ui/toaster';

interface PublicLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children, 
  hideNav = false, 
  hideFooter = false 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <PublicHeader />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <PublicFooter />}
      <Toaster />
    </div>
  );
};

export default PublicLayout;
