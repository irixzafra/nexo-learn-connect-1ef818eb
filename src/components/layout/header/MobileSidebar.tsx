
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import SidebarNavigation from '../SidebarNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserRoleType } from '@/types/auth';

interface MobileSidebarProps {
  viewAsRole: 'current' | UserRoleType;
  trigger?: React.ReactNode;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ viewAsRole, trigger }) => {
  const isMobile = useIsMobile();
  
  // Si no estamos en mobile, no renderizamos nada
  if (!isMobile) return null;
  
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          {trigger || (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          )}
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <SidebarNavigation viewAsRole={viewAsRole} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
