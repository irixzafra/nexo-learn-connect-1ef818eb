
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  School, 
  Shield, 
  Settings, 
  CreditCard,
  Database,
  History,
  FileText,
  KeyRound
} from 'lucide-react';
import { Button } from '../ui/button';

const AdminNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    return path.includes(route);
  };
  
  return (
    <div className="w-full border-b mb-6">
      <div className="container mx-auto py-2">
        <NavigationMenu className="max-w-none w-full justify-start">
          <NavigationMenuList className="flex flex-wrap gap-1">
            <NavigationMenuItem>
              <Link to="/admin/dashboard">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/dashboard') ? "bg-secondary" : ""
                )}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                isActive('/admin/users') || isActive('/admin/roles') ? "bg-secondary" : ""
              )}>
                <Users className="h-4 w-4 mr-2" />
                Usuarios
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-1 p-2 w-[220px]">
                  <Link to="/admin/users" className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                    isActive('/admin/users') && !isActive('/admin/roles') ? "bg-accent" : ""
                  )}>
                    <Users className="h-4 w-4" />
                    <span>Gestionar Usuarios</span>
                  </Link>
                  <Link to="/admin/roles" className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                    isActive('/admin/roles') ? "bg-accent" : ""
                  )}>
                    <KeyRound className="h-4 w-4" />
                    <span>Roles y Permisos</span>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                isActive('/admin/courses') || isActive('/admin/instructors') ? "bg-secondary" : ""
              )}>
                <BookOpen className="h-4 w-4 mr-2" />
                Educación
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-1 p-2 w-[220px]">
                  <Link to="/admin/courses" className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                    isActive('/admin/courses') ? "bg-accent" : ""
                  )}>
                    <BookOpen className="h-4 w-4" />
                    <span>Cursos</span>
                  </Link>
                  <Link to="/admin/instructors" className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent",
                    isActive('/admin/instructors') ? "bg-accent" : ""
                  )}>
                    <School className="h-4 w-4" />
                    <span>Instructores</span>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/admin/billing">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/billing') ? "bg-secondary" : ""
                )}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Facturación
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/admin/categories">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/categories') ? "bg-secondary" : ""
                )}>
                  <FileText className="h-4 w-4 mr-2" />
                  Categorías
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/admin/test-data">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/test-data') ? "bg-secondary" : ""
                )}>
                  <Database className="h-4 w-4 mr-2" />
                  Datos de Prueba
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/admin/audit-log">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/audit-log') ? "bg-secondary" : ""
                )}>
                  <History className="h-4 w-4 mr-2" />
                  Auditoría
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/admin/settings">
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/admin/settings') ? "bg-secondary" : ""
                )}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default AdminNavigation;
