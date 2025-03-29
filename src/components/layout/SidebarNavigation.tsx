
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
  
  // Determinar el rol efectivo para la navegación
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  // Contenido del menú según el rol
  let menuContent;
  
  switch (effectiveRole) {
    case 'admin':
      menuContent = (
        <>
          <GeneralSection 
            expanded={expanded.general} 
            onToggle={() => toggleGroup('general')} 
          />
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
          <AccountSection 
            expanded={expanded.account} 
            onToggle={() => toggleGroup('account')} 
          />
        </>
      );
      break;
    case 'sistemas':
      menuContent = (
        <>
          <GeneralSection 
            expanded={expanded.general} 
            onToggle={() => toggleGroup('general')} 
          />
          <SistemasSection 
            expanded={expanded.sistemas} 
            onToggle={() => toggleGroup('sistemas')} 
          />
          <AdminSection 
            expanded={expanded.administration} 
            onToggle={() => toggleGroup('administration')} 
          />
          <AccountSection 
            expanded={expanded.account} 
            onToggle={() => toggleGroup('account')} 
          />
        </>
      );
      break;
    case 'instructor':
      menuContent = (
        <>
          <GeneralSection 
            expanded={expanded.general} 
            onToggle={() => toggleGroup('general')} 
          />
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
          <AccountSection 
            expanded={expanded.account} 
            onToggle={() => toggleGroup('account')} 
          />
        </>
      );
      break;
    case 'anonimo':
      menuContent = (
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
      break;
    default: // 'student' u otro rol
      menuContent = (
        <>
          <GeneralSection 
            expanded={expanded.general} 
            onToggle={() => toggleGroup('general')} 
          />
          <LearningSection 
            expanded={expanded.learning} 
            onToggle={() => toggleGroup('learning')} 
          />
          <CommunitySection 
            expanded={expanded.community} 
            onToggle={() => toggleGroup('community')} 
          />
          <AccountSection 
            expanded={expanded.account} 
            onToggle={() => toggleGroup('account')} 
          />
        </>
      );
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      {menuContent}
    </div>
  );
};

export default SidebarNavigation;
