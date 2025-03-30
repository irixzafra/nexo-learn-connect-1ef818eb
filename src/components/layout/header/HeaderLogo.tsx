
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NexoLogo } from '@/components/ui/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import SidebarNavigation from '../SidebarNavigation';
import { UserRole } from '@/types/auth';

interface HeaderLogoProps {
  pageTitle?: string;
  viewAsRole?: UserRole | 'current';
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ 
  pageTitle,
  viewAsRole = 'current' 
}) => {
  const isMobile = useIsMobile();
  
  const LogoComponent = () => (
    <Link to="/" className="flex items-center">
      <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
    </Link>
  );
  
  return (
    <div className="flex items-center gap-4">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden h-10 w-10">
              <LogoComponent />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
            <div className="flex flex-col h-full">
              <div className="border-b px-6 py-4 flex items-center">
                <NexoLogo className="h-8 w-auto" />
              </div>
              <div className="flex-1 overflow-auto">
                <SidebarNavigation viewAsRole={viewAsRole as UserRole} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <>
          <SidebarTrigger className="hidden md:flex" />
          <LogoComponent />
        </>
      )}
      
      {!isMobile && pageTitle && <span className="text-lg font-medium">{pageTitle}</span>}
    </div>
  );
};

export default HeaderLogo;
