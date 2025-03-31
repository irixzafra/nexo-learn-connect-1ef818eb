
import React from 'react';
import { NexoLogo } from '@/components/ui/logo';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SidebarLogoSectionProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className={cn(
      "flex items-center justify-start",
      isCollapsed ? "px-2 mb-4" : "px-4 mb-6"
    )}>
      {isCollapsed ? (
        <NexoLogo variant="icon" className="h-8 w-auto mx-auto" />
      ) : (
        <div className="flex items-center justify-between w-full">
          <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-muted-foreground"
            aria-label="Colapsar menú lateral"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarLogoSection;
