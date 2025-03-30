
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Server, Terminal, Settings } from 'lucide-react';
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

interface SistemasNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SistemasNavigation: React.FC<SistemasNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Sistemas"
      icon={Database}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      {isCollapsed ? (
        // Versión colapsada
        <>
          <CollapsedMenuItem to="/sistemas/dashboard" icon={Server} label="Panel de Control" />
          <CollapsedMenuItem to="/sistemas/logs" icon={Terminal} label="Logs del Sistema" />
          <CollapsedMenuItem to="/sistemas/configuracion" icon={Settings} label="Configuración" />
        </>
      ) : (
        // Versión expandida
        <>
          <MenuItem to="/sistemas/dashboard" icon={Server} label="Panel de Control" />
          <MenuItem to="/sistemas/logs" icon={Terminal} label="Logs del Sistema" />
          <MenuItem to="/sistemas/configuracion" icon={Settings} label="Configuración" />
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
        aria-current={({ isActive }) => isActive ? "page" : undefined}
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

export default SistemasNavigation;
