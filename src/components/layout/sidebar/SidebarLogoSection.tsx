
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
      "flex items-center justify-between",
      isCollapsed ? "px-3 mb-4" : "px-4 mb-6"
    )}>
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-lg font-bold">N</span>
        </div>
        
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Nexo</span>
            <span className="text-xs text-muted-foreground">ecosistema creativo</span>
          </div>
        )}
      </Link>
      
      {!isCollapsed && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Colapsar menú</span>
        </Button>
      )}
    </div>
  );
};

export default SidebarLogoSection;
