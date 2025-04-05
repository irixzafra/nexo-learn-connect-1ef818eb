
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

  // Use the language context with a fallback for testing or when the provider isn't available
  let languageProps = {
    currentLanguage: 'es',
    changeLanguage: (lang: string) => console.log('Language change:', lang),
    languages: [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' },
      { code: 'pt', name: 'Português' }
    ]
  };

  try {
    // Only use the context if it's available
    const langContext = useLanguage();
    if (langContext) {
      languageProps = {
        currentLanguage: langContext.currentLanguage,
        changeLanguage: langContext.changeLanguage,
        languages: langContext.supportedLanguages.map(code => ({
          code,
          name: code === 'es' ? 'Español' : code === 'en' ? 'English' : code === 'pt' ? 'Português' : code
        }))
      };
    }
  } catch (e) {
    console.log('Language provider not available, using fallback');
  }

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
        currentLanguage={languageProps.currentLanguage}
        languages={languageProps.languages}
        changeLanguage={languageProps.changeLanguage}
        logout={logout}
        isViewingAsOtherRole={isViewingAsOtherRole}
        resetToOriginalRole={resetToOriginalRole}
        forceAdminRole={handleForceAdminRole}
      />
    </ShadcnSidebarFooter>
  );
};

export default SidebarFooter;
