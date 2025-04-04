
import React from 'react';
import { cn } from '@/lib/utils';

interface NavDividerProps {
  className?: string;
  label?: string;
}

const NavDivider: React.FC<NavDividerProps> = ({ 
  className, 
  label 
}) => {
  if (label) {
    return (
      <div className={cn("flex items-center py-3", className)}>
        <div className="h-px flex-1 bg-border/60"></div>
        <span className="px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className="h-px flex-1 bg-border/60"></div>
      </div>
    );
  }
  
  return (
    <div className={cn("my-2 h-px w-full bg-border/40", className)} />
  );
};

export default NavDivider;
