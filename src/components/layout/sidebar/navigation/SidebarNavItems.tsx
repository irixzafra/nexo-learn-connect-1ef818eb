
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
  School
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
  
  // Elementos de navegación para estudiantes (base)
  const studentItems = () => (
    <>
      <MenuItem to="/home" icon={Home} label="Inicio" isCollapsed={isCollapsed} />
      <MenuItem to="/courses" icon={BookOpen} label="Cursos" isCollapsed={isCollapsed} />
      <MenuItem to="/explore" icon={Compass} label="Explorar" isCollapsed={isCollapsed} />
      <MenuItem to="/community" icon={Users} label="Comunidad" isCollapsed={isCollapsed} />
      <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={messagesCount} isCollapsed={isCollapsed} />
      <MenuItem to="/profile" icon={User} label="Perfil" badge={notificationsCount} isCollapsed={isCollapsed} />
    </>
  );

  // Elementos adicionales para instructores (ahora llamados "profesores")
  const instructorItems = () => (
    <>
      {studentItems()}
      <MenuItem to="/instructor/dashboard" icon={School} label="Profesor" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos adicionales para administradores
  const adminItems = () => (
    <>
      {instructorItems()}
      <MenuItem to="/admin/dashboard" icon={Shield} label="Administración" isCollapsed={isCollapsed} />
    </>
  );

  // Elementos para sistemas (acceso técnico)
  const systemsItems = () => (
    <>
      <MenuItem to="/admin/systems" icon={Settings} label="Sistemas" isCollapsed={isCollapsed} />
      <MenuItem to="/admin/dashboard" icon={Shield} label="Administración" isCollapsed={isCollapsed} />
      {studentItems()}
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
