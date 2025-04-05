
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  FileText, 
  PanelLeft,
  Shield
} from 'lucide-react';
import { routeMap } from '@/utils/routeUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const AdminMenuItem: React.FC<AdminMenuItemProps> = ({ icon, title, description, href }) => {
  return (
    <Link to={href} className="block">
      <Card className="h-full transition-all hover:bg-accent/50 hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export const AdminMenu: React.FC = () => {
  const menuItems = [
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: "Dashboard",
      description: "Vista general y estadísticas",
      href: routeMap.adminDashboard
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Usuarios",
      description: "Gestión de usuarios y permisos",
      href: routeMap.adminUsers
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Cursos",
      description: "Gestión de cursos y contenido",
      href: routeMap.adminCourses
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Páginas",
      description: "Gestión de páginas del sistema",
      href: routeMap.adminSystemPages
    },
    {
      icon: <PanelLeft className="h-6 w-6" />,
      title: "Navegación",
      description: "Gestión de navegación",
      href: routeMap.adminNavigationManager
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Roles",
      description: "Gestión de roles y permisos",
      href: routeMap.adminRoles
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Configuración",
      description: "Configuración general",
      href: routeMap.adminSettings
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item, index) => (
              <AdminMenuItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                href={item.href}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMenu;
