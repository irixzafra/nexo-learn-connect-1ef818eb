
import React from 'react';
import { NexoLogo } from '@/components/ui/logo';
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
      isCollapsed ? "px-2 mb-2" : "px-3 mb-2"
    )}>
      {isCollapsed ? (
        <NexoLogo variant="icon" className="h-7 w-auto mx-auto" />
      ) : (
        <div className="flex items-center justify-between w-full">
          <NexoLogo className="h-7 w-auto" subtitle="ecosistema creativo" />
          {toggleSidebar && (
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-muted-foreground"
              aria-label="Colapsar menú lateral"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarLogoSection;
