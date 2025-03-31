
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const ProfesorNavigation: React.FC = () => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink 
          to="/instructor/dashboard" 
          className={({ isActive }) => cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors",
            isActive 
              ? "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white" 
              : "hover:bg-[#F3F4F6] dark:hover:bg-gray-800"
          )}
        >
          <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span>Profesor</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default ProfesorNavigation;
