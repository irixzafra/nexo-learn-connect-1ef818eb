
import React from 'react';
import { cn } from '@/lib/utils';

export interface NavDividerProps {
  className?: string;
  label?: string;
}

const NavDivider: React.FC<NavDividerProps> = ({
  className,
  label
}) => {
  if (label) {
    return (
      <div className={cn("flex items-center gap-2 px-3 py-2", className)}>
        <div className="h-px flex-1 bg-border"></div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="h-px flex-1 bg-border"></div>
      </div>
    );
  }
  
  return (
    <div className={cn("h-px w-full bg-border/80 my-2", className)}></div>
  );
};

export default NavDivider;
