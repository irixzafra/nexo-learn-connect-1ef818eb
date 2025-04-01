
import React, { ReactNode } from 'react';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import SectionTag from '@/components/layout/SectionTag';

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
  
  return (
    <div className="min-h-screen w-full relative">
      <SectionTag name="PublicLayout" />
      
      {!hideNav && (
        <header className="relative">
          <SectionTag name="Header" className="z-50" />
          <LandingNav />
          <div className="h-16 md:h-20" aria-hidden="true"></div>
        </header>
      )}
      
      <main className="flex-grow relative w-full">
        <SectionTag name="MainContent" />
        {children}
      </main>
      
      {!hideFooter && (
        <footer className="relative w-full">
          <SectionTag name="Footer" />
          <LandingFooter />
        </footer>
      )}
      
      <Toaster />
    </div>
  );
};

export default PublicLayout;
