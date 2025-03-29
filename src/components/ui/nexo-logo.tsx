
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
        <motion.span 
          className={cn(baseClasses, iconClasses, "text-primary")}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          n
        </motion.span>
      </div>
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-2 py-1 rounded-md mr-2">
        <motion.span 
          className={cn(baseClasses, "text-xl")}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          N
        </motion.span>
      </div>
      <div className="flex flex-col items-start">
        <span className={cn(baseClasses, "text-foreground leading-none")}>NEXO</span>
        <span className={cn("text-muted-foreground text-xs font-medium")}>LEARNING PLATFORM</span>
      </div>
    </div>
  );
};
