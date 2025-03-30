
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { 
  Home, 
  BookOpen, 
  Compass, 
  Users, 
  User, 
  MessageSquare,
  Settings,
  Shield,
  School,
  Bell
} from 'lucide-react';
import { MenuItem } from '../MenuItems';

interface SidebarNavItemsProps {
  role: UserRoleType;
  isCollapsed: boolean;
  notificationsCount: number;
  messagesCount: number;
}

export const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({
  role,
  isCollapsed,
  notificationsCount,
  messagesCount
}) => {
  
  // Base navigation items for all users
  const baseItems = () => (
    <>
      <MenuItem to="/home" icon={Home} label="Inicio" isCollapsed={isCollapsed} />
      <MenuItem to="/courses" icon={Compass} label="Explorar" isCollapsed={isCollapsed} />
      <MenuItem to="/community" icon={Users} label="Comunidad" isCollapsed={isCollapsed} />
      <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={messagesCount} isCollapsed={isCollapsed} />
      <MenuItem to="/notifications" icon={Bell} label="Notificaciones" badge={notificationsCount} isCollapsed={isCollapsed} />
      <MenuItem to="/profile" icon={User} label="Perfil" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos adicionales para estudiantes
  const studentItems = () => (
    <>
      {baseItems()}
      <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos adicionales para instructores (ahora llamados "profesores")
  const instructorItems = () => (
    <>
      {baseItems()}
      <MenuItem to="/instructor/dashboard" icon={School} label="Profesor" isCollapsed={isCollapsed} />
      <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos adicionales para administradores
  const adminItems = () => (
    <>
      {baseItems()}
      <MenuItem to="/admin/dashboard" icon={Shield} label="Administración" isCollapsed={isCollapsed} />
      <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos para sistemas (acceso técnico)
  const systemsItems = () => (
    <>
      {baseItems()}
      <MenuItem to="/admin/systems" icon={Settings} label="Sistemas" isCollapsed={isCollapsed} />
      <MenuItem to="/admin/dashboard" icon={Shield} label="Administración" isCollapsed={isCollapsed} />
    </>
  );

  // Renderizar elementos según el rol
  const renderNavItems = () => {
    switch (role) {
      case 'admin':
        return adminItems();
      case 'instructor':
        return instructorItems();
      case 'sistemas':
        return systemsItems();
      default:
        return studentItems();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {renderNavItems()}
    </div>
  );
};

export default SidebarNavItems;
