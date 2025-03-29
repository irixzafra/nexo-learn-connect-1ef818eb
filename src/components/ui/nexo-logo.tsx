
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
  const baseTextClasses = "font-bold text-primary";
  const iconClasses = "mr-1";
  
  if (variant === 'icon') {
    return (
      <div className={cn("flex items-center", className)}>
        <span className={cn(baseTextClasses, iconClasses)}>N</span>
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn(baseTextClasses, iconClasses)}>N</span>
      <span className={cn(baseTextClasses)}>exo</span>
      <span className={cn("text-muted-foreground font-medium")}>Learn</span>
    </div>
  );
};
