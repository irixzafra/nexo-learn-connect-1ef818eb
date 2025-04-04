
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLogoSectionProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ 
  isCollapsed,
  toggleSidebar
}) => {
  return (
    <div className="flex items-center justify-end p-2">
      {!isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="rounded-full p-1.5 hover:bg-muted/50 text-muted-foreground transition-colors"
          aria-label="Colapsar menú lateral"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SidebarLogoSection;
