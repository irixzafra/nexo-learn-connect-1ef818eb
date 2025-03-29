
import React from 'react';
import { cn } from '@/lib/utils';

interface NexoLogoProps {
  className?: string;
  variant?: 'default' | 'icon';
}

export const NexoLogo: React.FC<NexoLogoProps> = ({ 
  className, 
  variant = 'default' 
}) => {
  const baseClasses = "font-bold";
  const iconClasses = "mr-1";
  
  if (variant === 'icon') {
    return (
      <div className={cn("flex items-center", className)}>
        <span className={cn(baseClasses, iconClasses, "text-primary")}>n</span>
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn(baseClasses, iconClasses, "text-primary")}>n</span>
      <span className={cn(baseClasses, "text-primary")}>exo</span>
      <span className={cn("text-muted-foreground font-medium ml-1")}>learn</span>
    </div>
  );
};
