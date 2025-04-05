
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  icon?: LucideIcon;
  label: string;
  path: string;
  submenu?: MenuItem[];
}

interface SidebarNavItemProps {
  item?: MenuItem; // Make item optional
  href?: string;   // Add alternative props for direct usage
  icon?: LucideIcon;
  label?: string;
  badge?: number | string;
  isCollapsed?: boolean;
  disabled?: boolean;
  isHighlighted?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  item, 
  href, 
  icon: IconProp, 
  label: labelProp, 
  badge, 
  isCollapsed = false,
  disabled = false,
  isHighlighted = false
}) => {
  const { state } = useSidebar();
  isCollapsed = isCollapsed || state === "collapsed";
  
  // Use either from item or direct props
  const Icon = item?.icon || IconProp;
  const label = item?.label || labelProp || '';
  const path = item?.path || href || '#';
  const submenu = item?.submenu;

  if (!Icon && !label) {
    console.warn('SidebarNavItem: Missing both icon and label');
    return null; // Don't render if no content
  }

  if (isCollapsed) {
    if (submenu) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full p-2 hover:bg-accent rounded-md">
              {Icon && <Icon className="h-4 w-4 mx-auto" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <NavLink to={path} className="w-full">
              <DropdownMenuItem>
                {label}
              </DropdownMenuItem>
            </NavLink>
            {submenu.map((subItem, idx) => (
              <NavLink key={idx} to={subItem.path} className="w-full">
                <DropdownMenuItem>
                  {subItem.label}
                </DropdownMenuItem>
              </NavLink>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink
            to={path}
            className={({ isActive }) => cn(
              "w-full p-2 hover:bg-accent rounded-md flex items-center justify-center",
              isActive && "bg-accent",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => disabled && e.preventDefault()}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {!Icon && label && <span className="text-xs">{label.charAt(0)}</span>}
            {badge && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
          {badge && <span className="ml-1 text-xs">({badge})</span>}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) => cn(
        "w-full p-2 hover:bg-accent rounded-md flex items-center gap-2",
        isActive && "bg-accent",
        isHighlighted && "font-medium text-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className={cn(isHighlighted && "font-medium")}>{label}</span>
      {badge && (
        <span className="ml-auto bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-md">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;
