
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { NexoLogo } from '@/components/ui/logo';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Import subcomponents
import SidebarMainNavigation from './navigation/SidebarMainNavigation';
import SidebarFooterSection from './SidebarFooterSection';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const RefactoredSidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for role switching
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRole>(viewAsRole || 'current');
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default language is Spanish
  
  // Determine the effective role
  const getEffectiveRole = (): UserRole => {
    if (!viewAsRole || viewAsRole === 'current') {
      return userRole as UserRole;
    }
    return viewAsRole as UserRole;
  };
  
  const effectiveRole = getEffectiveRole();
  
  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setCurrentViewRole(role);
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // This would typically navigate to a search results page or open a search dialog
      window.location.href = `/admin/users?search=${encodeURIComponent(searchQuery)}`;
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
      
      {/* User search - only shown for admins */}
      {userRole === 'admin' && !isCollapsed && (
        <div className="px-4 mb-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar usuarios..."
                className="pl-8 w-full text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      )}

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
