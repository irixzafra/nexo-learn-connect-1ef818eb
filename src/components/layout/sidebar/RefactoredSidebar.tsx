
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useModeToggle } from '@/hooks/useModeToggle';
import { useFeatureFlags } from '@/contexts/features/FeatureFlagsContext';
import { useNotifications } from '@/hooks/useNotifications';

// Importamos componentes auxiliares
import SidebarLogo from './SidebarLogo';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';
import { SidebarSection } from './SidebarSection';

// Importamos iconos
import {
  Home,
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  User,
  Settings,
  ChevronLeft,
  LucideIcon,
  BookMarked,
  LayoutDashboard,
  CreditCard,
  Database,
  Shield,
  PlusCircle,
  BarChart
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  featureFlag?: string;
  badge?: number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export const RefactoredSidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user, profile, userRole } = useAuth();
  const { isFeatureEnabled } = useFeatureFlags();
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const { unreadCount: notificationsCount } = useNotifications();
  
  // Estado para el conteo de mensajes (simulado)
  const [messagesCount, setMessagesCount] = useState(3);
  
  // Determinar si el sidebar está colapsado
  const isCollapsed = state === "collapsed";
  
  // Detectar si el usuario está en la página de login
  const isLoginPage = location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register');

  // No mostrar sidebar en la página de login
  if (isLoginPage) return null;
  
  // Función para obtener navegación según el rol
  const getNavigationByRole = (role: UserRoleType | null): NavSection[] => {
    // Navegación común para todos los roles
    const commonNavigation: NavSection = {
      items: [
        { path: '/', label: 'Inicio', icon: Home },
        { path: '/my-courses', label: 'Mis Cursos', icon: BookOpen },
        { path: '/community', label: 'Comunidad', icon: Users, featureFlag: 'community_section' },
        { path: '/messages', label: 'Mensajes', icon: MessageSquare, badge: messagesCount },
        { path: '/calendar', label: 'Calendario', icon: Calendar },
        { path: '/notifications', label: 'Notificaciones', icon: Bell, badge: notificationsCount },
        { path: '/profile', label: 'Perfil', icon: User },
        { path: '/settings', label: 'Ajustes', icon: Settings },
      ]
    };
    
    // Navegación específica para instructores
    const instructorNavigation: NavSection = {
      title: 'Área Instructor',
      items: [
        { path: '/instructor/courses', label: 'Mis Cursos (Gestión)', icon: BookMarked },
        { path: '/instructor/create-course', label: 'Crear Curso', icon: PlusCircle },
        { path: '/instructor/analytics', label: 'Estadísticas', icon: BarChart },
      ]
    };
    
    // Navegación específica para administradores
    const adminNavigation: NavSection = {
      title: 'Área Administración',
      items: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/users', label: 'Usuarios', icon: Users },
        { path: '/admin/courses', label: 'Cursos (Admin)', icon: BookOpen },
        { path: '/admin/finanzas', label: 'Finanzas', icon: CreditCard },
        { path: '/admin/datos', label: 'Datos', icon: Database },
        { path: '/admin/settings', label: 'Configuración Sistema', icon: Settings },
      ]
    };
    
    // Definir las secciones según el rol
    switch (role) {
      case 'admin':
        return [commonNavigation, instructorNavigation, adminNavigation];
      case 'instructor':
        return [commonNavigation, instructorNavigation];
      case 'student':
      default:
        return [commonNavigation];
    }
  };
  
  // Obtener las secciones de navegación filtradas por feature flags
  const navSections = getNavigationByRole(userRole).map(section => ({
    ...section,
    items: section.items.filter(item => 
      !item.featureFlag || isFeatureEnabled(item.featureFlag)
    )
  }));

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 flex h-full flex-col border-r bg-background transition-all duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[240px]'} hidden md:flex ${className}`}>
      {/* Logo y botón de colapsar */}
      <div className="flex h-16 items-center justify-between px-3 py-2">
        <SidebarLogo isCollapsed={isCollapsed} />
        <button 
          onClick={toggleSidebar} 
          className="rounded-full p-1 hover:bg-accent/50 transition-colors"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.div>
        </button>
      </div>
      
      {/* Navegación principal - scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {navSections.map((section, index) => (
          <SidebarSection 
            key={index} 
            title={section.title} 
            isCollapsed={isCollapsed}
          >
            <SidebarNavigation 
              items={section.items} 
              isCollapsed={isCollapsed} 
            />
          </SidebarSection>
        ))}
      </div>
      
      {/* Footer con controles */}
      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
};

export default RefactoredSidebar;
