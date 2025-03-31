
import React, { ReactNode } from 'react';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { useAuth } from '@/contexts/AuthContext';
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
  const { userRole } = useAuth();
  
  console.info('PublicLayout rendering, userRole:', userRole);
  
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <LandingNav />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <LandingFooter />}
      
      <Toaster />
    </div>
  );
};

export default PublicLayout;
