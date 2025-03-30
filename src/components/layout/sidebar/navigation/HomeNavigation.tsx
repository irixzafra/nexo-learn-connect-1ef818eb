
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, BookOpen } from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface HomeNavigationProps {
  userRole?: UserRole;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ userRole }) => {
  // Determine "My Courses" link based on user role
  const myCoursesLink = userRole === 'instructor' ? '/instructor/courses' : '/my-courses';
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Don't show My Courses for anonymous users
  const showMyCourses = userRole !== 'anonimo';

  return (
    <div className={cn(
      isCollapsed ? "px-1" : "px-3",
      "space-y-1"
    )}>
      {!isCollapsed && (
        <div className="py-1">
          <h2 className="px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">PRINCIPAL</h2>
        </div>
      )}
      <SidebarMenu>
        <MenuItem
          to="/home"
          icon={Home}
          label="Inicio"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/courses"
          icon={Compass}
          label="Explorar Cursos"
          isCollapsed={isCollapsed}
        />
        
        {showMyCourses && (
          <MenuItem
            to={myCoursesLink}
            icon={BookOpen}
            label="Mis Cursos"
            isCollapsed={isCollapsed}
          />
        )}
      </SidebarMenu>
    </div>
  );
};

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild>
              <NavLink 
                to={to} 
                className={({ isActive }) => cn(
                  "flex h-10 w-10 items-center justify-center rounded-md",
                  "transition-colors duration-200",
                  isActive 
                    ? "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white border-l-[3px] border-l-[#0E90F9]" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-[#F3F4F6] dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </NavLink>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink 
          to={to} 
          className={({ isActive }) => cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 font-medium text-[15px] font-inter",
            "transition-all duration-200",
            isActive 
              ? "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white border-l-[3px] border-l-[#0E90F9] pl-[calc(0.75rem-3px)]" 
              : "hover:bg-[#F3F4F6] dark:hover:bg-gray-800"
          )}
          aria-current={({ isActive }) => isActive ? "page" : undefined}
        >
          <Icon className={({ isActive }) => cn(
            "h-5 w-5",
            isActive 
              ? "text-gray-900 dark:text-white" 
              : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          )} />
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default HomeNavigation;
