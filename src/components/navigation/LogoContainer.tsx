
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

export interface LogoContainerProps {
  logoElement?: React.ReactNode;
  homePath?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const LogoContainer: React.FC<LogoContainerProps> = ({
  logoElement,
  homePath = '/',
  title = 'Nexo',
  subtitle = 'ecosistema creativo',
  className
}) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div 
      className={cn(
        "flex items-center justify-between py-4",
        isCollapsed ? "px-2" : "px-4",
        className
      )}
    >
      <Link to={homePath} className="flex items-center gap-2 transition-opacity hover:opacity-90">
        {logoElement || (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
            <span className="text-base font-bold">N</span>
          </div>
        )}
        
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold leading-tight text-foreground">{title}</span>
            <span className="text-[11px] text-muted-foreground">{subtitle}</span>
          </div>
        )}
      </Link>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full h-8 w-8"
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
      >
        {isCollapsed ? (
          <Menu className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default LogoContainer;
