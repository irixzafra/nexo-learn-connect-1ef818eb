
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  BarChart, 
  Activity, 
  Clock, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  Award, 
  FileText,
  Users,
  Rss,
  MessageSquare,
  Bell,
  Calendar,
  Trophy,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  badge?: number;
}

interface NavGroupProps {
  title: string;
  icon: React.ElementType;
  isCollapsed: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCollapsed, badge }) => {
  const content = (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {!isCollapsed && (
        <>
          <span>{label}</span>
          {badge && badge > 0 && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {label}
          {badge && badge > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

const NavGroup: React.FC<NavGroupProps> = ({ title, icon: Icon, isCollapsed, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (isCollapsed) {
    return <div className="mb-4 space-y-1">{children}</div>;
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      
      <div
        className={cn(
          "mt-1 space-y-1 overflow-hidden transition-all",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isCollapsed }) => {
  return (
    <div className="space-y-2">
      <NavItem 
        to="/" 
        icon={Home}
        label="Inicio"
        isCollapsed={isCollapsed}
      />
      
      <NavGroup 
        title="Dashboard" 
        icon={LayoutDashboard}
        isCollapsed={isCollapsed}
        defaultOpen={true}
      >
        <NavItem 
          to="/app/dashboard" 
          icon={LayoutDashboard}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/dashboard/stats" 
          icon={BarChart}
          label="Estadísticas"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/dashboard/activity" 
          icon={Activity}
          label="Actividad"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/dashboard/history" 
          icon={Clock}
          label="Historial"
          isCollapsed={isCollapsed}
        />
      </NavGroup>
      
      <NavGroup 
        title="Cursos" 
        icon={BookOpen}
        isCollapsed={isCollapsed}
        defaultOpen={true}
      >
        <NavItem 
          to="/courses" 
          icon={Compass}
          label="Oferta Académica"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/learning-paths" 
          icon={GraduationCap}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/certificates" 
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/course-documents" 
          icon={FileText}
          label="Documentos"
          isCollapsed={isCollapsed}
        />
      </NavGroup>
      
      <NavGroup 
        title="Aprendizaje" 
        icon={GraduationCap}
        isCollapsed={isCollapsed}
      >
        <NavItem 
          to="/app/dashboard" 
          icon={GraduationCap}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/my-courses" 
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/learning-paths" 
          icon={GraduationCap}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/achievements" 
          icon={Trophy}
          label="Logros y Certificados"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/calendar" 
          icon={Calendar}
          label="Calendario Académico"
          isCollapsed={isCollapsed}
        />
      </NavGroup>
      
      <NavGroup 
        title="Comunidad" 
        icon={Users}
        isCollapsed={isCollapsed}
      >
        <NavItem 
          to="/app/community" 
          icon={Rss}
          label="Feed"
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/messages" 
          icon={MessageSquare}
          label="Mensajes"
          badge={3}
          isCollapsed={isCollapsed}
        />
        <NavItem 
          to="/app/notifications" 
          icon={Bell}
          label="Notificaciones"
          badge={2}
          isCollapsed={isCollapsed}
        />
      </NavGroup>
    </div>
  );
};

export default SidebarNavigation;
