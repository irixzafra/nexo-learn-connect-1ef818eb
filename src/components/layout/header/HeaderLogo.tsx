
import React from 'react';
import { Link } from 'react-router-dom';
import { NexoLogo } from '@/components/ui/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ChevronLeft } from 'lucide-react';
import SidebarNavigation from '../SidebarNavigation';
import { UserRoleType } from '@/types/auth';

interface HeaderLogoProps {
  pageTitle?: string;
  viewAsRole?: UserRoleType | 'current';
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ 
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
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
            <div className="flex flex-col h-full">
              <SidebarNavigation viewAsRole={viewAsRole} />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <>
          <SidebarTrigger className="hidden md:flex" />
          <LogoComponent />
        </>
      )}
    </div>
  );
};

export default HeaderLogo;
