
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { UserRoleType } from '@/types/auth';
import { 
  Home, 
  Compass, 
  MessageSquare, 
  User, 
  Phone,
  Shield,
  BookOpen,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  // Check if a role should see specific sections
  const canSeeAdmin = effectiveRole === 'admin' || effectiveRole === 'instructor';
  const canSeeInstructor = effectiveRole === 'admin' || effectiveRole === 'instructor';
  const isAnonymous = effectiveRole === 'anonimo';

  return (
    <div className={cn(
      "flex-1 overflow-auto",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <div className="space-y-1 pt-4">
        <NavItem 
          to={getHomePath()} 
          icon={Home} 
          label="Inicio" 
          isCollapsed={isCollapsed} 
        />
        
        <NavItem 
          to="/courses" 
          icon={Compass} 
          label="Explorar" 
          isCollapsed={isCollapsed} 
        />
        
        <NavItem 
          to="/messages" 
          icon={MessageSquare} 
          label="Mensajes" 
          badge={messagesCount > 0 ? messagesCount : undefined} 
          isCollapsed={isCollapsed} 
        />
        
        {!isAnonymous && (
          <NavItem 
            to="/my-courses" 
            icon={BookOpen} 
            label="Mis Cursos" 
            isCollapsed={isCollapsed} 
          />
        )}
        
        {canSeeInstructor && (
          <NavItem 
            to="/instructor/dashboard" 
            icon={GraduationCap} 
            label="Profesor" 
            isCollapsed={isCollapsed} 
          />
        )}
        
        {effectiveRole === 'admin' && (
          <NavItem 
            to="/admin/dashboard" 
            icon={Shield} 
            label="Administración" 
            isCollapsed={isCollapsed} 
          />
        )}
        
        <NavItem 
          to="/profile" 
          icon={User} 
          label="Perfil" 
          badge={notificationsCount > 0 ? notificationsCount : undefined} 
          isCollapsed={isCollapsed} 
        />
        
        <NavItem 
          to="/contact" 
          icon={Phone} 
          label="Contacto" 
          isCollapsed={isCollapsed} 
        />

        <NavItem 
          to="/landing" 
          icon={ExternalLink} 
          label="Landing Page" 
          isCollapsed={isCollapsed} 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, badge, isCollapsed }) => {
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink 
            to={to}
            className={({ isActive }) => cn(
              "flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent transition-colors mx-auto relative",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {badge && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 rounded-md text-sm hover:bg-accent transition-colors",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarMainNavigation;
