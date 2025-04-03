
import React, { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleBadgeColor, getRoleName } from './roleUtils';

interface RoleBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  role: string;
  isSimulated: boolean;
  className?: string;
}

export const RoleBadge = forwardRef<HTMLDivElement, RoleBadgeProps>(
  ({ role, isSimulated, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "cursor-pointer flex items-center gap-1 hover:opacity-90 transition-opacity",
          "relative group",
          className
        )}
        {...props}
      >
        <Badge 
          className={cn(
            "flex items-center px-2.5 py-1 transition-all duration-300",
            "text-xs font-semibold shadow-sm",
            "border border-transparent rounded-full", // Changed to rounded-full
            getRoleBadgeColor(role || ''),
            isSimulated && "ring-2 ring-yellow-400 ring-opacity-50"
          )}
        >
          {isSimulated && 
            <Eye className="h-3 w-3 mr-1.5 text-yellow-500 animate-pulse" />
          }
          <span>{getRoleName(role || '')}</span>
        </Badge>
        
        {/* Subtle hover effect */}
        <span className="absolute inset-0 bg-primary/10 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></span>
      </div>
    );
  }
);

RoleBadge.displayName = 'RoleBadge';
