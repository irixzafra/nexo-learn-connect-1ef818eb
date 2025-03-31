
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Calendar,
  Bell,
  User,
  Settings,
  GraduationCap,
  PlusCircle,
  BarChart3,
  LayoutDashboard,
  Library,
  Landmark,
  Database
} from 'lucide-react';

// Importamos los componentes de navegación
import SidebarNavSection from './SidebarNavSection';
import SidebarNavItem from './SidebarNavItem';

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
  // Como solución temporal, utilizaremos esta función mock para feature flags
  // hasta que encontremos la ruta correcta del contexto FeatureFlagsContext
  const isFeatureEnabled = (featureName: string) => {
    // Habilitamos algunas features para pruebas
    const enabledFeatures = ['community', 'messages', 'instructor_analytics', 'finances', 'datos'];
    return enabledFeatures.includes(featureName);
  };
  
  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        {/* Sección "Principal" (SIEMPRE visible) */}
        <SidebarNavSection title="Principal" isCollapsed={isCollapsed}>
          <SidebarNavItem 
            to="/" 
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
              badge={messagesCount > 0 ? messagesCount : undefined} 
              isCollapsed={isCollapsed} 
            />
          )}
        </SidebarNavSection>
        
        {/* Sección "Mi Aprendizaje" (SIEMPRE visible) */}
        <SidebarNavSection title="Mi Aprendizaje" isCollapsed={isCollapsed}>
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
            badge={notificationsCount > 0 ? notificationsCount : undefined} 
            isCollapsed={isCollapsed} 
          />
        </SidebarNavSection>
        
        {/* Sección "Cuenta" (SIEMPRE visible) */}
        <SidebarNavSection title="Cuenta" isCollapsed={isCollapsed}>
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
        
        {/* Sección "Área Instructor" (SOLO si effectiveRole es 'instructor' o 'admin') */}
        {(effectiveRole === 'instructor' || effectiveRole === 'admin') && (
          <SidebarNavSection title="Área Instructor" isCollapsed={isCollapsed}>
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
            {isFeatureEnabled('instructor_analytics') && (
              <SidebarNavItem 
                to="/instructor/analytics" 
                icon={BarChart3} 
                label="Estadísticas" 
                isCollapsed={isCollapsed} 
              />
            )}
          </SidebarNavSection>
        )}
        
        {/* Sección "Área Administración" (SOLO si effectiveRole es 'admin') */}
        {effectiveRole === 'admin' && (
          <SidebarNavSection title="Área Administración" isCollapsed={isCollapsed}>
            <SidebarNavItem 
              to="/admin/dashboard" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              isCollapsed={isCollapsed} 
            />
            <SidebarNavItem 
              to="/admin/users" 
              icon={Users} 
              label="Usuarios" 
              isCollapsed={isCollapsed} 
            />
            <SidebarNavItem 
              to="/admin/courses" 
              icon={Library} 
              label="Cursos (Admin)" 
              isCollapsed={isCollapsed} 
            />
            {isFeatureEnabled('finances') && (
              <SidebarNavItem 
                to="/admin/finanzas" 
                icon={Landmark} 
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
              icon={Settings} 
              label="Configuración Sistema" 
              isCollapsed={isCollapsed} 
            />
          </SidebarNavSection>
        )}
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
