
import React, { ReactNode } from 'react';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  // Check if we're on the landing page - if yes, we'll hide the navbar
  // since the landing page has its own header
  const isLandingPage = location.pathname === '/landing';
  const shouldHideNav = hideNav || isLandingPage;
  
  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNav && <LandingNav />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {!hideFooter && <LandingFooter />}
      
      <Toaster />
    </div>
  );
};

export default PublicLayout;
