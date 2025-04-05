
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import SidebarFooterSection from './SidebarFooterSection';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  const { 
    userRole, 
    effectiveRole, 
    logout, 
    isViewingAsOtherRole,
    resetToOriginalRole,
    forceUpdateRole
  } = useAuth();

  const { currentLanguage, changeLanguage } = useLanguage();

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  // Handler for forcing admin role
  const handleForceAdminRole = async () => {
    if (forceUpdateRole) {
      await forceUpdateRole('admin@nexo.com', 'admin');
    }
  };

  return (
    <div className="border-t border-border p-3">
      <SidebarFooterSection
        userRole={userRole as UserRoleType}
        effectiveRole={effectiveRole as UserRoleType}
        isCollapsed={isCollapsed}
        currentLanguage={currentLanguage}
        languages={languages}
        changeLanguage={changeLanguage}
        logout={logout}
        isViewingAsOtherRole={isViewingAsOtherRole}
        resetToOriginalRole={resetToOriginalRole}
        forceAdminRole={handleForceAdminRole}
      />
    </div>
  );
};

export default SidebarFooter;
