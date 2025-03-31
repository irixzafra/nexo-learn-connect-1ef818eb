
import React from 'react';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { Separator } from '@/components/ui/separator';
import SidebarNavItem from './SidebarNavItem';
import SidebarNavSection from './SidebarNavSection';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  User, 
  Calendar,
  BookOpen,
  Bell,
  Settings,
  BarChart,
  PlusCircle,
  LayoutDashboard,
  UsersRound,
  GraduationCap,
  DollarSign,
  Database,
  CogIcon
} from 'lucide-react';

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
  const { isFeatureEnabled } = useFeatureFlags();
  
  return (
    <div className={cn(
      "flex-1 overflow-auto py-2",
      isCollapsed ? "px-2" : "px-4"
    )}>
      {/* Sección Base (Todos los usuarios) */}
      <SidebarNavSection
        title="Principal"
        isCollapsed={isCollapsed}
      >
        <SidebarNavItem 
          to={getHomePath()} 
          icon={Home} 
          label="Inicio" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          to="/courses" 
          icon={Compass} 
          label="Explorar" 
          isCollapsed={isCollapsed} 
        />
        {isFeatureEnabled('community') && (
          <SidebarNavItem 
            to="/community" 
            icon={Users} 
            label="Comunidad" 
            isCollapsed={isCollapsed} 
          />
        )}
        {isFeatureEnabled('messages') && (
          <SidebarNavItem 
            to="/messages" 
            icon={MessageSquare} 
            label="Mensajes" 
            badge={messagesCount} 
            isCollapsed={isCollapsed} 
          />
        )}
      </SidebarNavSection>
      
      {/* Sección Estudiante (y roles superiores) */}
      {['student', 'instructor', 'admin'].includes(effectiveRole) && (
        <SidebarNavSection
          title="Mi Aprendizaje"
          isCollapsed={isCollapsed}
        >
          <SidebarNavItem 
            to="/my-courses" 
            icon={BookOpen} 
            label="Mis Cursos" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/calendar" 
            icon={Calendar} 
            label="Calendario" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/notifications" 
            icon={Bell} 
            label="Notificaciones" 
            badge={notificationsCount} 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/profile" 
            icon={User} 
            label="Perfil" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/settings" 
            icon={Settings} 
            label="Ajustes" 
            isCollapsed={isCollapsed} 
          />
        </SidebarNavSection>
      )}
      
      {/* Sección Instructor (y roles superiores) */}
      {['instructor', 'admin'].includes(effectiveRole) && (
        <>
          {!isCollapsed && (
            <div className="my-4 px-3">
              <Separator />
              <div className="mt-4 mb-2 text-xs font-medium text-muted-foreground">
                Área Instructor
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="my-4">
              <Separator />
            </div>
          )}
          <SidebarNavSection
            title=""
            isCollapsed={isCollapsed}
          >
            <SidebarNavItem 
              to="/instructor/courses" 
              icon={GraduationCap} 
              label="Mis Cursos (Gestión)" 
              isCollapsed={isCollapsed} 
            />
            <SidebarNavItem 
              to="/instructor/create-course" 
              icon={PlusCircle} 
              label="Crear Curso" 
              isCollapsed={isCollapsed} 
            />
            {isFeatureEnabled('analytics') && (
              <SidebarNavItem 
                to="/instructor/analytics" 
                icon={BarChart} 
                label="Estadísticas" 
                isCollapsed={isCollapsed} 
              />
            )}
          </SidebarNavSection>
        </>
      )}
      
      {/* Sección Admin (solo administradores) */}
      {effectiveRole === 'admin' && (
        <>
          {!isCollapsed && (
            <div className="my-4 px-3">
              <Separator />
              <div className="mt-4 mb-2 text-xs font-medium text-muted-foreground">
                Área Administración
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="my-4">
              <Separator />
            </div>
          )}
          <SidebarNavSection
            title=""
            isCollapsed={isCollapsed}
          >
            <SidebarNavItem 
              to="/admin/dashboard" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              isCollapsed={isCollapsed} 
            />
            <SidebarNavItem 
              to="/admin/users" 
              icon={UsersRound} 
              label="Usuarios" 
              isCollapsed={isCollapsed} 
            />
            <SidebarNavItem 
              to="/admin/courses" 
              icon={BookOpen} 
              label="Cursos (Admin)" 
              isCollapsed={isCollapsed} 
            />
            {isFeatureEnabled('finanzas') && (
              <SidebarNavItem 
                to="/admin/finanzas" 
                icon={DollarSign} 
                label="Finanzas" 
                isCollapsed={isCollapsed} 
              />
            )}
            {isFeatureEnabled('datos') && (
              <SidebarNavItem 
                to="/admin/datos" 
                icon={Database} 
                label="Datos" 
                isCollapsed={isCollapsed} 
              />
            )}
            <SidebarNavItem 
              to="/admin/settings" 
              icon={CogIcon} 
              label="Configuración Sistema" 
              isCollapsed={isCollapsed} 
            />
          </SidebarNavSection>
        </>
      )}
    </div>
  );
};

export default SidebarMainNavigation;
