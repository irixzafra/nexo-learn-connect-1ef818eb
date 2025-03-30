
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NexoLogo } from '@/components/ui/logo';
import { UserRoleType } from '@/types/auth';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Database, 
  Shield, 
  History,
  FileText,
  Folder,
  Route,
  LineChart
} from 'lucide-react';

interface MobileNavMenuProps {
  userRole: UserRoleType | null;
  className?: string;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ userRole, className }) => {
  const isAdmin = userRole === 'admin';
  const location = useLocation();
  
  // Check if we're on an admin page to avoid duplicate menus
  const isAdminPage = location.pathname.includes('/admin/');
  
  // If we're on an admin page, don't render the mobile menu
  if (isAdminPage) {
    return null;
  }
  
  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Usuarios', href: '/admin/users' },
    { icon: BookOpen, label: 'Educación', href: '/admin/courses' },
    { icon: CreditCard, label: 'Facturación', href: '/admin/finanzas' },
    { icon: Folder, label: 'Contenido', href: '/admin/content' },
    { icon: Database, label: 'Datos', href: '/admin/test-data' },
    { icon: History, label: 'Auditoría', href: '/admin/audit-log' },
    { icon: Shield, label: 'Roles', href: '/admin/roles' },
    { icon: Route, label: 'Rutas', href: '/admin/learning-paths' },
    { icon: LineChart, label: 'Analíticas', href: '/admin/analytics' },
    { icon: Settings, label: 'Config', href: '/admin/settings' }
  ];
  
  return (
    <div className={cn("lg:hidden", className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <NexoLogo className="h-8 w-auto" />
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-6">
              {/* Menú de administración si es admin */}
              {isAdmin && (
                <div>
                  <h3 className="font-medium mb-2">Administración</h3>
                  <div className="grid gap-2">
                    {adminMenuItems.map(item => (
                      <Link 
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
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
