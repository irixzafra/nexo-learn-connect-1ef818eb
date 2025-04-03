
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CaseSensitive, BookOpen, School, FileText, CheckSquare } from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { SidebarGroup } from '../SidebarGroup';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface EnsenanzaNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const EnsenanzaNavigation: React.FC<EnsenanzaNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Enseñanza"
      icon={CaseSensitive}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      {isCollapsed ? (
        // Versión colapsada
        <>
          <CollapsedMenuItem to="/app/instructor/dashboard" icon={CaseSensitive} label="Panel Instructor" />
          <CollapsedMenuItem to="/app/instructor/courses" icon={BookOpen} label="Gestionar Mis Cursos" />
          <CollapsedMenuItem to="/app/instructor/students" icon={School} label="Estudiantes" />
        </>
      ) : (
        // Versión expandida
        <>
          <MenuItem to="/app/instructor/dashboard" icon={CaseSensitive} label="Panel Instructor" />
          <MenuItem to="/app/instructor/courses" icon={BookOpen} label="Gestionar Mis Cursos" />
          <MenuItem to="/app/instructor/students" icon={School} label="Estudiantes" />
          <DisabledMenuItem
            icon={CheckSquare}
            label="Quizzes"
            tooltipText="Próximamente"
          />
          <DisabledMenuItem
            icon={FileText}
            label="Tareas"
            tooltipText="Próximamente"
          />
        </>
      )}
    </SidebarGroup>
  );
};

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label }) => (
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
      >
        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <span>{label}</span>
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const CollapsedMenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label }) => (
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

interface DisabledMenuItemProps {
  icon: React.ElementType;
  label: string;
  tooltipText: string;
}

const DisabledMenuItem: React.FC<DisabledMenuItemProps> = ({ icon: Icon, label, tooltipText }) => (
  <SidebarMenuItem>
    <SidebarMenuButton>
      <div className="flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md opacity-60 cursor-not-allowed text-[#9CA3AF] dark:text-gray-500">
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-[#9CA3AF] dark:text-gray-500" />
          <span className="text-[15px] font-inter">{label}</span>
        </span>
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
          {tooltipText}
        </span>
      </div>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default EnsenanzaNavigation;
