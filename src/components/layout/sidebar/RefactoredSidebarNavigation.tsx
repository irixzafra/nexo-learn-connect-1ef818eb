
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { NexoLogo } from '@/components/ui/logo';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Import subcomponents
import SidebarMainNavigation from './navigation/SidebarMainNavigation';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
  onRoleChange?: (role: UserRole) => void;
}

const RefactoredSidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  // State for role switching
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRole>(viewAsRole || 'current');
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default language is Spanish
  
  // Effect to update currentViewRole when viewAsRole prop changes
  useEffect(() => {
    if (viewAsRole !== undefined) {
      setCurrentViewRole(viewAsRole);
    }
  }, [viewAsRole]);
  
  // Determine the effective role
  const getEffectiveRole = (): UserRole => {
    if (currentViewRole === 'current') {
      return userRole as UserRole;
    }
    return currentViewRole as UserRole;
  };
  
  const effectiveRole = getEffectiveRole();
  
  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setCurrentViewRole(role);
    
    // Call the parent's onRoleChange if provided
    if (onRoleChange) {
      onRoleChange(role);
    }
    
    // Store selected role in localStorage for persistence
    localStorage.setItem('viewAsRole', role);
    
    toast.success(`Vista cambiada a: ${getRoleName(role)}`);
  };

  // Get role display name
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'sistemas': return 'Sistemas';
      case 'anonimo': return 'Anónimo';
      default: return 'Usuario';
    }
  };

  // Determine the home path based on the user's role
  const getHomePath = () => {
    switch (effectiveRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'student':
      default:
        return '/home';
    }
  };

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    // Here you would typically change the language in your app's state/context
    console.log(`Language changed to ${langCode}`);
  };

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top with full title and subtitle */}
      <div className={cn(
        "flex items-center justify-start",
        isCollapsed ? "px-2 mb-4" : "px-4 mb-6"
      )}>
        {isCollapsed ? (
          <NexoLogo variant="icon" className="h-8 w-auto mx-auto" />
        ) : (
          <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
        )}
      </div>

      {/* Main Navigation Section */}
      <SidebarMainNavigation 
        effectiveRole={effectiveRole}
        isCollapsed={isCollapsed}
        messagesCount={messagesCount}
        notificationsCount={notificationsCount}
        getHomePath={getHomePath}
      />
      
      {/* Footer Section with Role Switcher and Language Selector */}
      <SidebarFooterSection 
        userRole={userRole}
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
