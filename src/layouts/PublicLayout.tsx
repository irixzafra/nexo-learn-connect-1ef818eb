
import React from 'react';
import PublicNavigation from '@/components/navigation/PublicNavigation';
import PublicFooter from '@/components/layout/PublicFooter';

interface PublicLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  hideFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children,
  hideNavigation = false,
  hideFooter = false
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavigation && (
        <header className="border-b bg-white">
          <PublicNavigation />
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {!hideFooter && <PublicFooter />}
    </div>
  );
};

export default PublicLayout;
