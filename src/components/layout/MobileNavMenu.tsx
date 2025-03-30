
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NexoLogo } from '@/components/ui/logo';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { adminMobileMenuItems, adminMainMenuItems } from '@/components/ui/admin-menu/AdminMenuPresets';
import { UserRole } from '@/types/auth';

interface MobileNavMenuProps {
  userRole: UserRole | null;
  className?: string;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ userRole, className }) => {
  const isAdmin = userRole === 'admin';
  
  return (
    <div className={cn("md:hidden", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <NexoLogo className="h-8 w-auto" />
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-6">
              {/* Menú principal */}
              <div>
                <h3 className="font-medium mb-2">Menú Principal</h3>
                <AdminMenu 
                  items={adminMobileMenuItems}
                  variant="buttons"
                />
              </div>
              
              {/* Menú de administración si es admin */}
              {isAdmin && (
                <div>
                  <h3 className="font-medium mb-2">Administración</h3>
                  <AdminMenu 
                    items={adminMainMenuItems}
                    variant="buttons"
                  />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t text-xs text-center text-muted-foreground">
              © Nexo Education {new Date().getFullYear()}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavMenu;
