
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Lightbulb, GraduationCap, BookOpen, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface AprendizajeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AprendizajeNavigation: React.FC<AprendizajeNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <SidebarGroup 
      label="Aprendizaje" 
      icon={Lightbulb}
      isExpanded={isOpen} 
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem 
          to="/scholarships" 
          icon={GraduationCap} 
          label="Becas" 
          isCollapsed={isCollapsed} 
        />
        <MenuItem 
          to="/my-courses" 
          icon={BookOpen} 
          label="Mis Cursos" 
          isCollapsed={isCollapsed} 
        />
        <MenuItem 
          to="/calendar" 
          icon={CalendarDays} 
          label="Calendario" 
          isCollapsed={isCollapsed} 
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
  badge?: string;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isCollapsed, 
  badge, 
  disabled = false 
}) => {
  if (disabled) {
    return (
      <SidebarMenuItem>
        <div className={cn(
          "flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-400 dark:text-gray-500 font-medium text-[15px] cursor-not-allowed",
          isCollapsed ? "justify-center" : ""
        )}>
          <Icon className="h-5 w-5" />
          {!isCollapsed && <span>{label}</span>}
          {!isCollapsed && badge && (
            <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
      </SidebarMenuItem>
    );
  }
  
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
                aria-current={({ isActive }) => isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
                {badge && (
                  <span className="absolute top-1 right-1 bg-primary w-2 h-2 rounded-full" />
                )}
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
          <Icon className={cn(
            "h-5 w-5",
            "text-gray-500 dark:text-gray-400"
          )} />
          <span>{label}</span>
          {badge && (
            <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default AprendizajeNavigation;
