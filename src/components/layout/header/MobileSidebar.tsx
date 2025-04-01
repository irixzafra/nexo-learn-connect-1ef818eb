
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import RefactoredSidebarNavigation from '../sidebar/RefactoredSidebarNavigation';
import { UserRoleType } from '@/types/auth';

interface MobileSidebarProps {
  viewAsRole: 'current' | UserRoleType;
  trigger?: React.ReactNode;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ viewAsRole, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Fix for sidebar toggle not working
  const handleToggle = () => {
    console.log('Toggling mobile sidebar:', !isOpen);
    setIsOpen(!isOpen);
  };
  
  // Log when sidebar state changes
  useEffect(() => {
    console.log('Mobile sidebar state changed:', isOpen);
  }, [isOpen]);
  
  return (
    <div className="md:hidden fixed bottom-4 left-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild onClick={handleToggle}>
          {trigger || (
            <Button variant="primary" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          )}
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <RefactoredSidebarNavigation viewAsRole={viewAsRole} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
