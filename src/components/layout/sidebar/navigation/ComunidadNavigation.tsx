
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, MessageSquare, Globe, Handshake } from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SidebarGroup } from '../SidebarGroup';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  messagesCount?: number;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ 
  isOpen, 
  onToggle,
  messagesCount = 0
}) => {
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
          <CollapsedMenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={messagesCount} />
          <CollapsedMenuItem to="/community" icon={Globe} label="Foro" />
          <CollapsedMenuItem to="/mentors" icon={Handshake} label="Mentores" />
        </>
      ) : (
        // Versión expandida
        <>
          <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={messagesCount} />
          <MenuItem to="/community" icon={Globe} label="Foro" />
          <MenuItem to="/mentors" icon={Handshake} label="Mentores" />
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
      >
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span>{label}</span>
        </span>
        {badge !== undefined && badge > 0 && (
          <Badge variant="default" className="ml-auto bg-primary text-white">
            {badge}
          </Badge>
        )}
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const CollapsedMenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label, badge }) => (
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
            <Icon className="h-5 w-5" />
            <span className="sr-only">{label}</span>
            {badge !== undefined && badge > 0 && (
              <Badge variant="default" className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
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

export default ComunidadNavigation;
