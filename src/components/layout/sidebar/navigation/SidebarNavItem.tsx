
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
  item: MenuItem;
  isCollapsed?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, isCollapsed }) => {
  const { icon: Icon, label, path, submenu } = item;
  const { state } = useSidebar();
  isCollapsed = state === "collapsed";

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
              isActive && "bg-accent"
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) => cn(
        "w-full p-2 hover:bg-accent rounded-md flex items-center gap-2",
        isActive && "bg-accent"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarNavItem;
