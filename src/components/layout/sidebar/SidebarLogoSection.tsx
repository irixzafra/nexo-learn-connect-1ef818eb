
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarLogoSectionProps {
  isCollapsed?: boolean;
  icon?: LucideIcon;
  title?: string;
  toggleSidebar?: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ 
  isCollapsed = false,
  icon: Icon,
  title = "Nexo",
  toggleSidebar
}) => {
  return (
    <div className="flex flex-col gap-2 px-2">
      <div className={cn(
        "flex h-14 items-center justify-between px-4",
        isCollapsed && "justify-center"
      )}>
        {Icon && (
          <Icon className="h-6 w-6" />
        )}
        {!isCollapsed && (
          <span className="text-lg font-semibold">{title}</span>
        )}
      </div>
    </div>
  );
};

export default SidebarLogoSection;
