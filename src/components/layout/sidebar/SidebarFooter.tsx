
import React from 'react';
import { useAuth } from '@/contexts/auth';
import SidebarFooterSection from './SidebarFooterSection';
import { useLanguage } from '@/contexts/LanguageContext';

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
    setSimulatedRole
  } = useAuth();

  // Get language context
  const { currentLanguage, changeLanguage, supportedLanguages } = useLanguage();

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

  console.log('SidebarFooter rendering with:', { isCollapsed, userRole, currentLanguage });

  return (
    <div className="border-t border-border p-3">
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
    </div>
  );
};

export default SidebarFooter;
