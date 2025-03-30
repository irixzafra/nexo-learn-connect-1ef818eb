
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, MessageSquare } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Comunidad"
      icon={Users}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      {isCollapsed ? (
        // Versión colapsada
        <>
          <CollapsedMenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={2} />
        </>
      ) : (
        // Versión expandida
        <>
          <DisabledMenuItem
            icon={Users}
            label="Feed"
            tooltipText="Próximamente"
          />
          <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={2} />
          <DisabledMenuItem
            icon={Users}
            label="Red de Contactos"
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
  badge?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label, badge }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <NavLink 
        to={to} 
        className={({ isActive }) => cn(
          "flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 font-medium text-[15px] font-inter",
          "transition-all duration-200",
          isActive 
            ? "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white border-l-[3px] border-l-[#0E90F9] pl-[calc(0.75rem-3px)]" 
            : "hover:bg-[#F3F4F6] dark:hover:bg-gray-800"
        )}
        aria-current={({ isActive }) => isActive ? "page" : undefined}
      >
        <span className="flex items-center gap-3">
          <Icon 
            size={20} 
            className={({ isActive }) => cn(
              isActive 
                ? "text-gray-900 dark:text-white" 
                : "text-gray-500 dark:text-gray-400"
            )} 
          />
          <span>{label}</span>
        </span>
        {badge && (
          <Badge variant="default" className="ml-auto text-xs">{badge}</Badge>
        )}
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

interface CollapsedMenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

const CollapsedMenuItem: React.FC<CollapsedMenuItemProps> = ({ to, icon: Icon, label, badge }) => (
  <SidebarMenuItem>
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarMenuButton asChild>
          <NavLink 
            to={to} 
            className={({ isActive }) => cn(
              "flex h-10 w-10 items-center justify-center rounded-md relative",
              "transition-colors duration-200",
              isActive 
                ? "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white border-l-[3px] border-l-[#0E90F9]" 
                : "text-gray-500 dark:text-gray-400 hover:bg-[#F3F4F6] dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Icon size={20} />
            <span className="sr-only">{label}</span>
            {badge && (
              <Badge variant="default" className="absolute -top-1 -right-1 text-xs size-4 flex items-center justify-center p-0">
                {badge}
              </Badge>
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
          <Icon size={20} className="text-[#9CA3AF] dark:text-gray-500" />
          <span className="text-[15px] font-inter">{label}</span>
        </span>
        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
          {tooltipText}
        </span>
      </div>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default ComunidadNavigation;
