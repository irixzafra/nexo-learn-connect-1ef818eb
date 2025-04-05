
import React from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavGroup from './SidebarNavGroup';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { NavigationMenus } from '@/types/navigation';
import { 
  Activity, 
  Home,
  Users, 
  BookOpen, 
  Bot, 
  FileText, 
  Settings, 
  GraduationCap, 
  LineChart, 
  MessageSquare, 
  Landmark,
  UserSquare,
  Award,
  LayoutGrid,
  Calendar,
  Send,
  Bell,
  Heart,
  BarChart,
  Briefcase,
  FileCode,
  HelpCircle,
  Compass,
  Navigation,
  CheckSquare,
  Layers,
  Globe,
  Code,
  Database,
  Sliders,
  Shield,
  ToggleLeft
} from 'lucide-react';

interface SidebarMainNavigationProps {
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
  navigationMenus?: NavigationMenus;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  effectiveRole = 'student',
  messagesCount = 0,
  notificationsCount = 0,
  navigationMenus = {}
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  console.log('SidebarMainNavigation rendering with role:', effectiveRole);
  
  if (navigationMenus && Object.keys(navigationMenus).length > 0) {
    return (
      <div className="space-y-1 py-2">
        {Object.entries(navigationMenus).map(([groupName, items], index) => (
          <SidebarNavGroup
            key={`${effectiveRole}-${groupName}`}
            title={groupName}
            icon={items[0]?.icon || Activity}
            isCollapsed={isCollapsed}
            defaultOpen={index === 0}
            id={`${effectiveRole}-${groupName}`}
            items={items.map(item => ({
              label: item.label,
              path: item.path || '#',
              icon: item.icon,
              badge: groupName.toLowerCase() === 'mensajes' ? messagesCount : 
                     groupName.toLowerCase() === 'notificaciones' ? notificationsCount : 
                     undefined,
              disabled: item.disabled,
              isHighlighted: item.isHighlighted
            }))}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-1 py-2">
      {/* Admin Role Navigation */}
      {effectiveRole === 'admin' && (
        <>
          {/* Dashboard Group */}
          <SidebarNavGroup
            title="Dashboard"
            icon={Activity}
            isCollapsed={isCollapsed}
            defaultOpen={true}
            id="admin-dashboard"
            items={[
              { label: 'Visión General', path: '/app/admin/dashboard', icon: Home },
              { label: 'KPIs clave', path: '/app/admin/dashboard/kpis', icon: BarChart, disabled: true },
              { label: 'Resumen de actividad', path: '/app/admin/dashboard/activity', icon: LineChart, disabled: true },
              { label: 'Alertas', path: '/app/admin/dashboard/alerts', icon: Bell, disabled: true }
            ]}
          />

          {/* Academic (LMS) Group */}
          <SidebarNavGroup
            title="Académico (LMS)"
            icon={GraduationCap}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="admin-academic"
            items={[
              { label: 'Gestión de cursos', path: '/app/admin/courses', icon: BookOpen },
              { label: 'Contenido Global', path: '/app/admin/content', icon: FileText, disabled: true },
              { label: 'Categorías', path: '/app/admin/categories', icon: LayoutGrid, disabled: true },
              { label: 'Rutas de Aprendizaje', path: '/app/admin/learning-paths', icon: LineChart, disabled: true },
              { label: 'Certificados', path: '/app/admin/certificates', icon: Award, disabled: true },
              { label: 'Analíticas Académicas', path: '/app/admin/analytics/academic', icon: LineChart, disabled: true }
            ]}
          />

          {/* Management (ERP) Group */}
          <SidebarNavGroup
            title="Gestión Central (ERP)"
            icon={Briefcase}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="admin-management"
            items={[
              { label: 'Gestión de usuarios', path: '/app/admin/users', icon: Users },
              { label: 'Roles y permisos', path: '/app/admin/roles', icon: UserSquare, disabled: true },
              { label: 'Analíticas de usuarios', path: '/app/admin/analytics/users', icon: LineChart, disabled: true },
              { label: 'Comunicación', path: '/app/admin/communication', icon: MessageSquare, disabled: true }
            ]}
          />

          {/* Finance Group */}
          <SidebarNavGroup
            title="Finanzas"
            icon={Landmark}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="admin-finance"
            items={[
              { label: 'Transacciones', path: '/app/admin/finance/transactions', icon: Landmark, disabled: true },
              { label: 'Suscripciones', path: '/app/admin/finance/subscriptions', icon: Calendar, disabled: true },
              { label: 'Analíticas Financieras', path: '/app/admin/analytics/finance', icon: LineChart, disabled: true },
              { label: 'Configuración de pagos', path: '/app/admin/finance/settings', icon: Settings, disabled: true }
            ]}
          />

          {/* System Group */}
          <SidebarNavGroup
            title="Sistema (Plataforma)"
            icon={Settings}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="admin-system"
            items={[
              { label: 'Configuración General', path: '/app/admin/settings', icon: Settings },
              { label: 'Diseño', path: '/app/admin/design', icon: LayoutGrid, disabled: true },
              { label: 'Páginas CMS', path: '/app/admin/system-pages', icon: FileText },
              { label: 'Gestión de Features', path: '/app/admin/features', icon: LayoutGrid },
              { label: 'Integraciones', path: '/app/admin/integrations', icon: FileCode, disabled: true },
              { label: 'Analíticas de Plataforma', path: '/app/admin/analytics/platform', icon: LineChart, disabled: true },
              { label: 'Salud/Logs', path: '/app/admin/system/health', icon: Activity, disabled: true }
            ]}
          />

          {/* Dev Tools Group */}
          <SidebarNavGroup
            title="Herramientas Dev"
            icon={FileCode}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="admin-dev"
            items={[
              { label: 'Diagrama de navegación', path: '/app/admin/navigation-diagram', icon: Navigation },
              { label: 'Revisión de elementos', path: '/app/admin/review-elements', icon: CheckSquare },
              { label: 'Revisión de huérfanos', path: '/app/admin/orphan-review', icon: Layers },
              { label: 'Herramientas de desarrollo', path: '/app/admin/development', icon: FileCode },
              { label: 'Configuraciones avanzadas', path: '/app/admin/dev/settings', icon: Settings, disabled: true }
            ]}
          />
        </>
      )}

      {/* Instructor Role Navigation */}
      {effectiveRole === 'instructor' && (
        <>
          {/* Dashboard Group */}
          <SidebarNavGroup
            title="Dashboard"
            icon={Activity}
            isCollapsed={isCollapsed}
            defaultOpen={true}
            id="instructor-dashboard"
            items={[
              { label: 'Panel Instructor', path: '/app/instructor/dashboard', icon: Home },
              { label: 'Resumen de actividad', path: '/app/instructor/dashboard/activity', icon: Activity, disabled: true },
              { label: 'Métricas de cursos', path: '/app/instructor/dashboard/metrics', icon: LineChart, disabled: true },
              { label: 'Próximas sesiones', path: '/app/instructor/dashboard/upcoming', icon: Calendar, disabled: true },
              { label: 'Notificaciones', path: '/app/instructor/dashboard/notifications', icon: Bell, disabled: true }
            ]}
          />

          {/* Academic Management */}
          <SidebarNavGroup
            title="Gestión Académica"
            icon={BookOpen}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="instructor-academic"
            items={[
              { label: 'Mis Cursos', path: '/app/instructor/courses', icon: BookOpen },
              { label: 'Crear Curso', path: '/app/instructor/courses/create', icon: FileText },
              { label: 'Biblioteca de Contenido', path: '/app/instructor/content', icon: FileText, disabled: true }
            ]}
          />

          {/* Participants */}
          <SidebarNavGroup
            title="Participantes"
            icon={Users}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="instructor-participants"
            items={[
              { label: 'Mis Participantes', path: '/app/instructor/students', icon: Users },
              { label: 'Progreso/Retroalimentación', path: '/app/instructor/students/progress', icon: LineChart, disabled: true },
              { label: 'Comunicación', path: '/app/instructor/communication', icon: MessageSquare, disabled: true }
            ]}
          />

          {/* Performance */}
          <SidebarNavGroup
            title="Rendimiento"
            icon={LineChart}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="instructor-performance"
            items={[
              { label: 'Analíticas de Cursos', path: '/app/instructor/analytics', icon: LineChart, disabled: true }
            ]}
          />

          {/* Extras Group */}
          <SidebarNavGroup
            title="Extras"
            icon={Globe}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="instructor-extras"
            items={[
              { label: 'Comunidad', path: '/app/community', icon: Users },
              { label: 'Calendario', path: '/app/calendar', icon: Calendar },
              { label: 'Mensajes', path: '/app/messages', icon: MessageSquare, badge: messagesCount },
              { label: 'Certificados', path: '/app/certificates', icon: Award }
            ]}
          />

          {/* Account */}
          <SidebarNavGroup
            title="Cuenta"
            icon={UserSquare}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="instructor-account"
            items={[
              { label: 'Mi Perfil', path: '/app/profile', icon: UserSquare },
              { label: 'Mi Facturación', path: '/app/instructor/billing', icon: Landmark, disabled: true },
              { label: 'Centro de Ayuda', path: '/app/help', icon: HelpCircle },
              { label: 'Configuración', path: '/app/settings', icon: Settings }
            ]}
          />
        </>
      )}

      {/* Student Role Navigation */}
      {(effectiveRole === 'student' || (effectiveRole !== 'admin' && effectiveRole !== 'instructor')) && (
        <>
          {/* Dashboard Group */}
          <SidebarNavGroup
            title="Dashboard"
            icon={Activity}
            isCollapsed={isCollapsed}
            defaultOpen={true}
            id="student-dashboard"
            items={[
              { label: 'Mi Panel', path: '/app/dashboard', icon: Home },
              { label: 'Resumen de actividad', path: '/app/dashboard/activity', icon: Activity, disabled: true },
              { label: 'Próximas entregas', path: '/app/dashboard/upcoming', icon: Calendar, disabled: true },
              { label: 'Recomendaciones', path: '/app/dashboard/recommendations', icon: Heart, disabled: true },
              { label: 'Notificaciones', path: '/app/notifications', icon: Bell, badge: notificationsCount }
            ]}
          />

          {/* Community Group */}
          <SidebarNavGroup
            title="Comunidad"
            icon={Users}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="student-community"
            items={[
              { label: 'Feed', path: '/app/community', icon: Users },
              { label: 'Leaderboard', path: '/app/community/leaderboard', icon: Award, disabled: true },
              { label: 'Mensajes', path: '/app/messages', icon: MessageSquare, badge: messagesCount },
              { label: 'Notificaciones', path: '/app/notifications', icon: Bell, badge: notificationsCount }
            ]}
          />

          {/* Learning Group */}
          <SidebarNavGroup
            title="Aprendizaje"
            icon={BookOpen}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="student-learning"
            items={[
              { label: 'Mis Cursos', path: '/app/my-courses', icon: BookOpen, isHighlighted: true },
              { label: 'Explorar Cursos', path: '/app/courses', icon: Compass },
              { label: 'Rutas de Aprendizaje', path: '/app/learning-paths', icon: LineChart },
              { label: 'Calendario', path: '/app/calendar', icon: Calendar }
            ]}
          />

          {/* Account Group */}
          <SidebarNavGroup
            title="Mi Cuenta"
            icon={UserSquare}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="student-account"
            items={[
              { label: 'Mi Perfil', path: '/app/profile', icon: UserSquare },
              { label: 'Certificados', path: '/app/certificates', icon: Award },
              { label: 'Facturación/Participaciones', path: '/app/profile/billing', icon: Landmark, disabled: true },
              { label: 'Configuración', path: '/app/settings', icon: Settings }
            ]}
          />

          {/* Help Group */}
          <SidebarNavGroup
            title="Ayuda"
            icon={HelpCircle}
            isCollapsed={isCollapsed}
            defaultOpen={false}
            id="student-help"
            items={[
              { label: 'Centro de Ayuda', path: '/app/help', icon: HelpCircle },
              { label: 'Contactar Soporte', path: '/app/support', icon: Send, disabled: true }
            ]}
          />
        </>
      )}
    </div>
  );
};

export default SidebarMainNavigation;
