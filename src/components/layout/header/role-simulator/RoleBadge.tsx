
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
          "cursor-pointer",
          className
        )}
        {...props}
      >
        <Badge 
          className={cn(
            "flex items-center gap-1 px-2 py-1 transition-colors duration-200",
            "text-sm font-medium border-0",
            getRoleBadgeColor(role || ''),
            isSimulated && "ring-1 ring-yellow-500"
          )}
        >
          {isSimulated && <Eye className="h-3 w-3 mr-1 text-yellow-500" />}
          <span>{getRoleName(role || '')}</span>
        </Badge>
      </div>
    );
  }
);

RoleBadge.displayName = 'RoleBadge';
