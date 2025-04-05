
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import SidebarFooterSection from './SidebarFooterSection';
import { SidebarFooter as ShadcnSidebarFooter } from '@/components/ui/sidebar';

const SidebarFooter: React.FC = () => {
  const { 
    userRole, 
    effectiveRole, 
    logout, 
    isViewingAsOtherRole,
    resetToOriginalRole,
    setSimulatedRole
  } = useAuth();

  // Get sidebar collapse state
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Use the language context
  const { currentLanguage, changeLanguage } = useLanguage();

  // Language options mapping
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  // Handler for forcing admin role
  const handleForceAdminRole = async () => {
    if (setSimulatedRole) {
      await setSimulatedRole('admin');
    }
  };

  return (
    <ShadcnSidebarFooter className="mt-auto border-t border-border/70">
      <SidebarFooterSection
        userRole={userRole}
        effectiveRole={effectiveRole}
        isCollapsed={isCollapsed}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
        logout={logout}
        isViewingAsOtherRole={isViewingAsOtherRole}
        resetToOriginalRole={resetToOriginalRole}
        forceAdminRole={handleForceAdminRole}
      />
    </ShadcnSidebarFooter>
  );
};

export default SidebarFooter;
