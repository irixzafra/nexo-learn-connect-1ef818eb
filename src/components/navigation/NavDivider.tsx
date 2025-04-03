
import React from 'react';
import { cn } from '@/lib/utils';

interface NavDividerProps {
  className?: string;
  label?: string;
}

const NavDivider: React.FC<NavDividerProps> = ({ className, label }) => {
  return (
    <div className={cn("my-2 relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border/50" />
      </div>
      {label && (
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            {label}
          </span>
        </div>
      )}
    </div>
  );
};

export default NavDivider;
