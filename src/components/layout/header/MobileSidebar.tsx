
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NexoLogo } from '@/components/ui/nexo-logo';
import SidebarNavigation from '../SidebarNavigation';

interface MobileSidebarProps {
  viewAsRole: string;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ viewAsRole }) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <div className="border-b px-6 py-4 flex items-center">
              <NexoLogo className="h-8 w-auto" />
            </div>
            <div className="flex-1 overflow-auto">
              <SidebarNavigation viewAsRole={viewAsRole} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
