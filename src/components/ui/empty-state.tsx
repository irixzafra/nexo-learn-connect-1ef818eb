
import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actions,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
      "bg-muted/30 border-muted-foreground/30",
      className
    )}>
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
          {description}
        </p>
      )}
      {actions && (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
