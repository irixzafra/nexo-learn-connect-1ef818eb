
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FeatureTooltipProps {
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  children: React.ReactNode;
}

export const FeatureTooltip: React.FC<FeatureTooltipProps> = ({
  title,
  description,
  position = 'bottom',
  className,
  children,
}) => {
  const positionClasses = {
    top: 'bottom-full mb-2',
    right: 'left-full ml-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
  };

  return (
    <div className="relative group">
      {children}
      
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "absolute z-50 hidden group-hover:block w-64 p-4 rounded-lg bg-popover text-popover-foreground shadow-lg",
          positionClasses[position],
          className
        )}
      >
        <div className="font-semibold mb-1">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        
        {/* Arrow */}
        <div
          className={cn(
            "absolute w-3 h-3 bg-popover rotate-45",
            position === 'top' && 'bottom-[-6px] left-1/2 transform -translate-x-1/2',
            position === 'right' && 'left-[-6px] top-1/2 transform -translate-y-1/2',
            position === 'bottom' && 'top-[-6px] left-1/2 transform -translate-x-1/2',
            position === 'left' && 'right-[-6px] top-1/2 transform -translate-y-1/2'
          )}
        />
      </motion.div>
    </div>
  );
};
