
import React from 'react';
import { 
  SidebarGroup as UISidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SidebarGroupProps {
  label: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ 
  label, 
  icon: Icon,
  isExpanded, 
  onToggle, 
  children 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <UISidebarGroup>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarGroupLabel 
              onClick={onToggle}
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[#F3F4F6] dark:hover:bg-gray-800 mx-auto"
            >
              <Icon size={20} className="text-gray-500 dark:text-gray-400" />
            </SidebarGroupLabel>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <GroupLabel 
          label={label} 
          icon={Icon}
          isExpanded={isExpanded} 
          onClick={onToggle} 
        />
      )}
      
      {isExpanded && !isCollapsed && (
        <SidebarGroupContent>
          <SidebarMenu>
            {children}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </UISidebarGroup>
  );
};

interface GroupLabelProps {
  label: string;
  icon: React.ElementType;
  isExpanded: boolean;
  onClick: () => void;
}

const GroupLabel: React.FC<GroupLabelProps> = ({ label, icon: Icon, isExpanded, onClick }) => (
  <SidebarGroupLabel 
    onClick={onClick}
    className="cursor-pointer flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-gray-900 dark:hover:text-white"
  >
    <span className="flex items-center gap-2">
      <Icon size={20} className="text-gray-500 dark:text-gray-400" />
      <span className="font-inter">{label}</span>
    </span>
    <span className={cn("transform transition-transform duration-300", isExpanded ? 'rotate-180' : 'rotate-0')}>
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  </SidebarGroupLabel>
);
