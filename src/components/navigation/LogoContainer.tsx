
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoContainerProps {
  logoElement?: React.ReactNode;
  homePath?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  isCollapsed?: boolean;
}

const LogoContainer: React.FC<LogoContainerProps> = ({
  logoElement,
  homePath = '/',
  title = 'Nexo',
  subtitle = 'ecosistema creativo',
  className,
  isCollapsed = false
}) => {
  return (
    <Link 
      to={homePath} 
      className={cn(
        "flex items-center transition-all duration-200 hover:opacity-90 gap-3",
        isCollapsed && "justify-center",
        className
      )}
    >
      {/* Logo element or default logo */}
      {logoElement || (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
          <span className="text-sm font-bold">N</span>
        </div>
      )}
      
      {/* Title and subtitle - hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex flex-col">
          <div className="font-medium text-base leading-tight">{title}</div>
          {subtitle && (
            <span className="text-[11px] text-muted-foreground">{subtitle}</span>
          )}
        </div>
      )}
    </Link>
  );
};

export default LogoContainer;
