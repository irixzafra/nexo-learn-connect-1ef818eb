import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Users, MessageSquare, CalendarDays, CreditCard, Settings, Layers, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const isActive = (pathname: string, href: string): boolean => {
  return pathname === href || (href !== '/' && pathname.startsWith(href));
};

export const SidebarNavigation = ({ viewAsRole = 'current' }: { viewAsRole?: 'current' | UserRole }) => {
  const { userRole } = useAuth();
  const effectiveRole = viewAsRole === 'current' ? userRole : viewAsRole;
  const { pathname } = useLocation();

  // Navigation items based on role
  const studentItems = [
    { label: 'Inicio', href: '/home', icon: Home },
    { label: 'Mis Cursos', href: '/my-courses', icon: Book },
    { label: 'Mensajes', href: '/messages', icon: MessageSquare },
    { label: 'Calendario', href: '/calendar', icon: CalendarDays },
    { label: 'Facturación', href: '/billing', icon: CreditCard },
    { label: 'Configuración', href: '/settings', icon: Settings },
  ];

  const instructorItems = [
    { label: 'Inicio', href: '/home', icon: Home },
    { label: 'Mis Cursos', href: '/instructor/courses', icon: Book },
    { label: 'Estudiantes', href: '/instructor/students', icon: Users },
    { label: 'Mensajes', href: '/messages', icon: MessageSquare },
    { label: 'Calendario', href: '/calendar', icon: CalendarDays },
    { label: 'Facturación', href: '/billing', icon: CreditCard },
    { label: 'Configuración', href: '/settings', icon: Settings },
  ];

  const adminItems = [
    { label: 'Inicio', href: '/home', icon: Home },
    { label: 'Cursos', href: '/courses', icon: Book },
    { label: 'Usuarios', href: '/users', icon: Users },
    { label: 'Mensajes', href: '/messages', icon: MessageSquare },
    { label: 'Calendario', href: '/calendar', icon: CalendarDays },
    { label: 'Facturación', href: '/billing', icon: CreditCard },
    { label: 'Datos de Prueba', href: '/admin/test-data', icon: Database },
    { label: 'Configuración', href: '/settings', icon: Settings },
  ];

  let navigationItems: NavItem[] = [];

  switch (effectiveRole) {
    case 'admin':
      navigationItems = adminItems;
      break;
    case 'instructor':
      navigationItems = instructorItems;
      break;
    case 'student':
    default:
      navigationItems = studentItems;
      break;
  }

  return (
    <div className="flex flex-col space-y-1">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            isActive(pathname, item.href)
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
