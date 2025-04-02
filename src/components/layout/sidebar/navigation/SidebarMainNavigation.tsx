
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';
import { useSidebarState } from '@/components/layout/sidebar/useSidebarState';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

// Import specific navigation components
import DashboardNavigation from './DashboardNavigation';
import CursosNavigation from './CursosNavigation';
import MisCursosNavigation from './MisCursosNavigation';
import ComunidadNavigation from './ComunidadNavigation';
import AprendizajeNavigation from './AprendizajeNavigation';
import ProfesorNavigation from './ProfesorNavigation';
import CalendarNavigation from './CalendarNavigation';
import GamificationNavigation from './GamificationNavigation';
// Remove the MessagesNavigation import since it's causing an error and not being used correctly
import AdministracionNavigation from './AdministracionNavigation';
import GestionNavigation from './GestionNavigation';
import HomeNavigation from './HomeNavigation';
import ConfiguracionNavigation from './ConfiguracionNavigation';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { expanded, toggleGroup } = useSidebarState();

  // Memoize the home path to avoid recalculations
  const homePath = React.useMemo(() => getHomePath(), [getHomePath]);

  // Determina si el usuario es estudiante (para evitar mostrar navegación duplicada)
  const isStudent = effectiveRole === 'student';
  // Determina si el usuario es instructor o admin (para mostrar navegación de profesor)
  const isTeacher = effectiveRole === 'instructor' || effectiveRole === 'admin';

  return (
    <div className="flex-1 overflow-auto py-2">
      {/* Home dashboard navigation for all roles */}
      <HomeNavigation 
        role={effectiveRole}
        homePath={homePath}
        isCollapsed={isCollapsed}
        notificationsCount={notificationsCount}
      />
      
      {/* Dashboard section for all roles */}
      <DashboardNavigation 
        isOpen={expanded.general} 
        onToggle={() => toggleGroup('general')}
      />
      
      {/* Courses section for all users */}
      <CursosNavigation 
        isOpen={expanded.learning} 
        onToggle={() => toggleGroup('learning')} 
      />
      
      {/* My Courses section for students */}
      {isStudent && (
        <MisCursosNavigation 
          isOpen={expanded.learning} 
          onToggle={() => toggleGroup('learning')}
        />
      )}
      
      {/* Community section for all roles */}
      <ComunidadNavigation 
        isOpen={expanded.community} 
        onToggle={() => toggleGroup('community')}
        messagesCount={messagesCount}
      />
      
      {/* Learning section for students */}
      {isStudent && (
        <AprendizajeNavigation 
          isOpen={expanded.learning} 
          onToggle={() => toggleGroup('learning')}
        />
      )}
      
      {/* Teaching section for instructors */}
      {isTeacher && (
        <ProfesorNavigation 
          isOpen={expanded.instructor} 
          onToggle={() => toggleGroup('instructor')}
        />
      )}
      
      {/* Calendar navigation for all roles */}
      <CalendarNavigation 
        isOpen={expanded.general} 
        onToggle={() => toggleGroup('general')}
      />
      
      {/* Gamification for all roles */}
      <GamificationNavigation 
        isOpen={expanded.community} 
        onToggle={() => toggleGroup('community')}
      />
      
      {/* Messages section - We're commenting this out since there's an import problem */}
      {/* <MessagesNavigation 
        isOpen={expanded.community} 
        onToggle={() => toggleGroup('community')}
        messagesCount={messagesCount}
      /> */}
      
      {/* Configuration for all roles */}
      <ConfiguracionNavigation 
        isOpen={expanded.configuration} 
        onToggle={() => toggleGroup('configuration')}
      />
      
      {/* Administration section for admins */}
      {(effectiveRole === 'admin' || effectiveRole === 'sistemas') && (
        <AdministracionNavigation 
          isOpen={expanded.administration} 
          onToggle={() => toggleGroup('administration')}
          userRole={effectiveRole}
        />
      )}
      
      {/* Management section for admins and moderators */}
      {(effectiveRole === 'admin' || effectiveRole === 'moderator' || effectiveRole === 'sistemas') && (
        <GestionNavigation 
          isOpen={expanded.administration} 
          onToggle={() => toggleGroup('administration')}
          role={effectiveRole}
        />
      )}
    </div>
  );
};

export default SidebarMainNavigation;
