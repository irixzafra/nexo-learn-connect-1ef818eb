
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useSidebarState } from './sidebar/useSidebarState';
import { GeneralSection } from './sidebar/GeneralSection';
import { LearningSection } from './sidebar/LearningSection';
import { CommunitySection } from './sidebar/CommunitySection';
import { InstructorSection } from './sidebar/InstructorSection';
import { AdminSection } from './sidebar/AdminSection';
import { AccountSection } from './sidebar/AccountSection';
import { SistemasSection } from './sidebar/SistemasSection';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { expanded, toggleGroup } = useSidebarState();
  
  // Determine the effective role for navigation
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  // Generate content based on role - using a more modern approach with role-based configuration
  const renderSections = () => {
    // Common sections for all authenticated users
    const commonSections = (
      <>
        <GeneralSection 
          expanded={expanded.general} 
          onToggle={() => toggleGroup('general')} 
        />
        <SistemasSection 
          expanded={expanded.sistemas} 
          onToggle={() => toggleGroup('sistemas')} 
        />
        <AccountSection 
          expanded={expanded.account} 
          onToggle={() => toggleGroup('account')} 
        />
      </>
    );

    // Role-specific sections
    switch (effectiveRole) {
      case 'admin':
        return (
          <>
            {commonSections}
            <LearningSection 
              expanded={expanded.learning} 
              onToggle={() => toggleGroup('learning')} 
            />
            <CommunitySection 
              expanded={expanded.community} 
              onToggle={() => toggleGroup('community')} 
            />
            <InstructorSection 
              expanded={expanded.instructor} 
              onToggle={() => toggleGroup('instructor')} 
            />
            <AdminSection 
              expanded={expanded.administration} 
              onToggle={() => toggleGroup('administration')} 
            />
          </>
        );
      case 'sistemas':
        return (
          <>
            {commonSections}
            <AdminSection 
              expanded={expanded.administration} 
              onToggle={() => toggleGroup('administration')} 
            />
          </>
        );
      case 'instructor':
        return (
          <>
            {commonSections}
            <LearningSection 
              expanded={expanded.learning} 
              onToggle={() => toggleGroup('learning')} 
            />
            <CommunitySection 
              expanded={expanded.community} 
              onToggle={() => toggleGroup('community')} 
            />
            <InstructorSection 
              expanded={expanded.instructor} 
              onToggle={() => toggleGroup('instructor')} 
            />
          </>
        );
      case 'anonimo':
        return (
          <>
            <GeneralSection 
              expanded={expanded.general} 
              onToggle={() => toggleGroup('general')} 
            />
            <LearningSection 
              expanded={expanded.learning} 
              onToggle={() => toggleGroup('learning')} 
            />
          </>
        );
      default: // 'student' or other roles
        return (
          <>
            {commonSections}
            <LearningSection 
              expanded={expanded.learning} 
              onToggle={() => toggleGroup('learning')} 
            />
            <CommunitySection 
              expanded={expanded.community} 
              onToggle={() => toggleGroup('community')} 
            />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-1 py-2">
      {renderSections()}
    </div>
  );
};

export default SidebarNavigation;
