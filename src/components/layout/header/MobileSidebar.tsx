
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
  
  // Always render on mobile devices to ensure the menu button is visible
  // Remove the conditional return that was hiding the component
  
  return (
    <div className="md:hidden fixed bottom-4 left-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          {trigger || (
            <Button variant="primary" size="icon" className="h-12 w-12 rounded-full shadow-lg">
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
