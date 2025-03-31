
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';

// Import subcomponents
import SidebarFooterSection from './SidebarFooterSection';
import SidebarMainNavigation from './navigation/SidebarMainNavigation';
import SidebarLogoSection from './SidebarLogoSection';
import { useSidebarNavigation } from './hooks/useSidebarNavigation';
import ProfesorNavigation from './navigation/ProfesorNavigation';
import MisCursosNavigation from './navigation/MisCursosNavigation';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

const RefactoredSidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { userRole } = useAuth();
  const { state, toggleSidebar } = useSidebar();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  // State for expandable sections
  const [isProfesorOpen, setIsProfesorOpen] = useState(false);
  const [isMisCursosOpen, setIsMisCursosOpen] = useState(false);
  
  const {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  } = useSidebarNavigation(toUserRoleType(userRole as string), viewAsRole, onRoleChange);

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  // Check if a role should see specific sections
  const canSeeProfesor = effectiveRole === 'admin' || effectiveRole === 'instructor';
  const isAnonymous = effectiveRole === 'anonimo';

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top with full title and subtitle */}
      <SidebarLogoSection isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Navigation Section */}
      <SidebarMainNavigation 
        effectiveRole={effectiveRole}
        isCollapsed={isCollapsed}
        messagesCount={messagesCount}
        notificationsCount={notificationsCount}
        getHomePath={() => getHomePath(effectiveRole)}
      />
      
      {/* Profesor Navigation - Only visible for admin and instructor */}
      {canSeeProfesor && (
        <ProfesorNavigation 
          isOpen={isProfesorOpen} 
          onToggle={() => setIsProfesorOpen(!isProfesorOpen)} 
        />
      )}
      
      {/* Mis Cursos Navigation - Not visible for anonymous users */}
      {!isAnonymous && (
        <MisCursosNavigation 
          isOpen={isMisCursosOpen} 
          onToggle={() => setIsMisCursosOpen(!isMisCursosOpen)} 
        />
      )}
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={toUserRoleType(userRole as string)}
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
