
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { useLocation } from 'react-router-dom';

// Import subcomponents
import SidebarFooterSection from './SidebarFooterSection';
import SidebarMainNavigation from './navigation/SidebarMainNavigation';
import SidebarLogoSection from './SidebarLogoSection';
import { useSidebarNavigation } from './hooks/useSidebarNavigation';
import { 
  Home, 
  BookOpen, 
  MessageSquare,
  Users, 
  User,
  Bell
} from 'lucide-react';
import { MenuItem } from './MenuItems';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

const RefactoredSidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { user, session, profile } = useAuth();
  const { state, toggleSidebar } = useSidebar();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  const location = useLocation();
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/landing' || location.pathname === '/';
  
  // Extract the user role from the profile
  const currentUserRole = profile?.role || 'student';
  
  const {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(currentUserRole), viewAsRole, onRoleChange);

  // Don't show sidebar for anonymous users on landing page
  if (effectiveRole === 'anonimo' && isLandingPage) {
    return null;
  }

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  // Main navigation items based on role
  const getNavItems = () => {
    const commonItems = [
      { to: getHomePath(effectiveRole), icon: Home, label: "Inicio" },
      { to: "/courses", icon: BookOpen, label: "Cursos" },
      { to: "/community", icon: Users, label: "Comunidad" },
      { to: "/messages", icon: MessageSquare, label: "Mensajes", badge: messagesCount },
      { to: "/notifications", icon: Bell, label: "Notificaciones", badge: notificationsCount },
      { to: "/profile", icon: User, label: "Perfil" }
    ];
    
    return commonItems;
  };

  return (
    <div className="h-full flex flex-col py-2">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Navigation Section - Simplified */}
      <div className={`flex-1 overflow-auto px-${isCollapsed ? '2' : '3'} mt-6`}>
        <div className="space-y-1">
          {getNavItems().map((item) => (
            <MenuItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              badge={item.badge} 
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={toUserRoleType(currentUserRole)}
        isCollapsed={isCollapsed}
        effectiveRole={effectiveRole}
        currentViewRole={currentViewRole}
        handleRoleChange={handleRoleChange}
        getRoleName={getRoleName}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
      />
    </div>
  );
};

export default RefactoredSidebarNavigation;
