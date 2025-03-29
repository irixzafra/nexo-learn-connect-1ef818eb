import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Book, 
  Users, 
  MessageSquare, 
  CalendarDays, 
  CreditCard, 
  Settings, 
  Layers, 
  Database, 
  GraduationCap, 
  PanelTop, 
  FileText,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string | number;
  highlight?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const isActive = (pathname: string, href: string): boolean => {
  return pathname === href || (href !== '/' && pathname.startsWith(href));
};

export const SidebarNavigation = ({ viewAsRole = 'current' }: SidebarNavigationProps) => {
  const { userRole } = useAuth();
  const effectiveRole = viewAsRole === 'current' ? userRole : viewAsRole;
  const { pathname } = useLocation();

  const studentSections: NavSection[] = [
    {
      items: [
        { label: 'Inicio', href: '/home', icon: Home },
        { label: 'Mis Cursos', href: '/my-courses', icon: Book, badge: '2', highlight: true },
      ]
    },
    {
      title: 'Comunicación',
      items: [
        { label: 'Mensajes', href: '/messages', icon: MessageSquare, badge: '3' },
        { label: 'Calendario', href: '/calendar', icon: CalendarDays },
      ]
    },
    {
      title: 'Cuenta',
      items: [
        { label: 'Facturación', href: '/billing', icon: CreditCard },
        { label: 'Configuración', href: '/settings', icon: Settings },
      ]
    }
  ];

  const instructorSections: NavSection[] = [
    {
      items: [
        { label: 'Inicio', href: '/home', icon: Home },
        { label: 'Panel Instructor', href: '/instructor/dashboard', icon: PanelTop },
      ]
    },
    {
      title: 'Enseñanza',
      items: [
        { label: 'Mis Cursos', href: '/instructor/courses', icon: Book },
        { label: 'Crear Curso', href: '/instructor/courses/new', icon: Plus, highlight: true },
        { label: 'Estudiantes', href: '/instructor/students', icon: GraduationCap },
      ]
    },
    {
      title: 'Comunicación',
      items: [
        { label: 'Mensajes', href: '/messages', icon: MessageSquare, badge: '3' },
        { label: 'Calendario', href: '/calendar', icon: CalendarDays },
      ]
    },
    {
      title: 'Cuenta',
      items: [
        { label: 'Facturación', href: '/billing', icon: CreditCard },
        { label: 'Configuración', href: '/settings', icon: Settings },
      ]
    }
  ];

  const adminSections: NavSection[] = [
    {
      items: [
        { label: 'Inicio', href: '/home', icon: Home },
        { label: 'Panel Admin', href: '/admin/dashboard', icon: PanelTop },
      ]
    },
    {
      title: 'Gestión',
      items: [
        { label: 'Cursos', href: '/courses', icon: Book },
        { label: 'Usuarios', href: '/users', icon: Users },
        { label: 'Contenido', href: '/admin/content', icon: FileText },
      ]
    },
    {
      title: 'Comunicación',
      items: [
        { label: 'Mensajes', href: '/messages', icon: MessageSquare },
        { label: 'Calendario', href: '/calendar', icon: CalendarDays },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { label: 'Facturación', href: '/billing', icon: CreditCard },
        { label: 'Datos de Prueba', href: '/admin/test-data', icon: Database },
        { label: 'Configuración', href: '/settings', icon: Settings },
      ]
    }
  ];

  let navigationSections: NavSection[] = [];

  switch (effectiveRole) {
    case 'admin':
      navigationSections = adminSections;
      break;
    case 'instructor':
      navigationSections = instructorSections;
      break;
    case 'student':
    default:
      navigationSections = studentSections;
      break;
  }

  return (
    <div className="flex flex-col space-y-6 py-2">
      {navigationSections.map((section, idx) => (
        <div key={idx}>
          {section.title && (
            <h3 className="mb-2 ml-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.title}
            </h3>
          )}
          <div className="space-y-1">
            {section.items.map((item) => (
              <Tooltip key={item.href} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors",
                      isActive(pathname, item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      item.highlight && !isActive(pathname, item.href) && "text-primary hover:text-primary-foreground"
                    )}
                  >
                    <span className="flex items-center">
                      <item.icon className={cn("mr-2 h-4 w-4", 
                        item.highlight && !isActive(pathname, item.href) && "text-primary"
                      )} />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <Badge 
                        variant={isActive(pathname, item.href) ? "outline" : "default"} 
                        className={cn(
                          "ml-auto",
                          !isActive(pathname, item.href) && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-50">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarNavigation;
