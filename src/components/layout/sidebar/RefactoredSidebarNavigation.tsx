
import React, { useState, useEffect } from 'react';
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
import { AdminSection } from './AdminSection';
import { AccountSection } from './AccountSection';
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

  // Admin and Account sections expand state
  const [adminExpanded, setAdminExpanded] = useState(location.pathname.startsWith('/admin'));
  const [accountExpanded, setAccountExpanded] = useState(false);
  
  // Update admin expanded state when route changes
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setAdminExpanded(true);
    }
    if (location.pathname === '/profile' || location.pathname === '/settings') {
      setAccountExpanded(true);
    }
  }, [location.pathname]);

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

  // Log the effectiveRole for debugging
  console.log("Current effective role:", effectiveRole);

  // Check if user should see admin menu
  const shouldShowAdminMenu = effectiveRole === 'admin';

  return (
    <div className="h-full flex flex-col py-2">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Display role indicator */}
      {!isCollapsed && (
        <div className="px-3 py-2 mb-2">
          <div className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded text-center">
            {getRoleName(effectiveRole)}
          </div>
        </div>
      )}

      {/* Admin Section - Only show for admin role */}
      {shouldShowAdminMenu && (
        <AdminSection 
          expanded={adminExpanded} 
          onToggle={() => setAdminExpanded(!adminExpanded)} 
        />
      )}

      {/* Main Navigation Section - Simplified */}
      <div className={`flex-1 overflow-auto px-${isCollapsed ? '2' : '3'} mt-2`}>
        <div className="space-y-1">
          <MenuItem to={getHomePath(effectiveRole)} icon={Home} label="Inicio" isCollapsed={isCollapsed} />
          <MenuItem to="/courses" icon={BookOpen} label="Cursos" isCollapsed={isCollapsed} />
          <MenuItem to="/community" icon={Users} label="Comunidad" isCollapsed={isCollapsed} />
          <MenuItem 
            to="/messages" 
            icon={MessageSquare} 
            label="Mensajes" 
            badge={messagesCount} 
            isCollapsed={isCollapsed} 
          />
          <MenuItem 
            to="/notifications" 
            icon={Bell} 
            label="Notificaciones" 
            badge={notificationsCount} 
            isCollapsed={isCollapsed} 
          />
          <MenuItem to="/profile" icon={User} label="Perfil" isCollapsed={isCollapsed} />
        </div>
      </div>
      
      {/* Account Section - Added for user account management */}
      <div className="mt-auto mb-4">
        <AccountSection
          expanded={accountExpanded}
          onToggle={() => setAccountExpanded(!accountExpanded)}
          isCollapsed={isCollapsed}
        />
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
