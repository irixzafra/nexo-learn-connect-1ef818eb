
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { useSidebarState } from '@/components/layout/sidebar/useSidebarState';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

// Import specific navigation components
import DashboardNavigation from './DashboardNavigation';
import CursosNavigation from './CursosNavigation';
import ComunidadNavigation from './ComunidadNavigation';
import CalendarNavigation from './CalendarNavigation';
import GamificationNavigation from './GamificationNavigation';
import ConfiguracionNavigation from './ConfiguracionNavigation';

// Import role-specific navigation components
import EstudianteNavigation from './EstudianteNavigation';
import InstructorNavigation from './InstructorNavigation';
import AdminNavigation from './AdminNavigation';

// Import home navigation
import HomeNavigation from './HomeNavigation';

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
      
      {/* Role-specific navigation sections */}
      {effectiveRole === 'student' && (
        <EstudianteNavigation 
          isOpen={expanded.learning} 
          onToggle={() => toggleGroup('learning')}
        />
      )}
      
      {effectiveRole === 'instructor' && (
        <InstructorNavigation 
          isOpen={expanded.instructor} 
          onToggle={() => toggleGroup('instructor')}
        />
      )}
      
      {effectiveRole === 'admin' && (
        <AdminNavigation 
          isOpen={expanded.administration} 
          onToggle={() => toggleGroup('administration')}
        />
      )}
      
      {/* Community section for all roles */}
      <ComunidadNavigation 
        isOpen={expanded.community} 
        onToggle={() => toggleGroup('community')}
        messagesCount={messagesCount}
      />
      
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
      
      {/* Configuration for all roles */}
      <ConfiguracionNavigation 
        isOpen={expanded.configuration} 
        onToggle={() => toggleGroup('configuration')}
      />
    </div>
  );
};

export default SidebarMainNavigation;
