
import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarLogoSectionProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const SidebarLogoSection: React.FC<SidebarLogoSectionProps> = ({ 
  isCollapsed: propIsCollapsed,
  toggleSidebar: propToggleSidebar
}) => {
  const { state, toggleSidebar: contextToggleSidebar } = useSidebar();
  
  // Use props if provided, otherwise use context values
  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : state === "collapsed";
  const handleToggle = propToggleSidebar || contextToggleSidebar;

  return (
    <div className={cn(
      "flex items-center justify-between mb-6 pt-4",
      isCollapsed ? "px-3" : "px-4"
    )}>
      <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
          <span className="text-base font-bold">N</span>
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Nexo</span>
            <span className="text-[11px] text-muted-foreground">ecosistema creativo</span>
          </div>
        )}
      </Link>
      
      {!isCollapsed && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full h-8 w-8"
          aria-label="Colapsar sidebar"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SidebarLogoSection;
