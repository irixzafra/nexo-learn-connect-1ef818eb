
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface SidebarLogoSectionProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ 
  isCollapsed,
  toggleSidebar
}) => {
  return (
    <div className="flex items-center justify-between">
      <Link 
        to="/app" 
        className={cn(
          "flex items-center transition-all hover:opacity-90 gap-3",
          isCollapsed && "mx-auto"
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
          <span className="text-sm font-bold">N</span>
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col">
            <div className="font-medium text-base leading-tight">Nexo Learning</div>
            <span className="text-[11px] text-muted-foreground">ecosistema educativo</span>
          </div>
        )}
      </Link>
      
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
