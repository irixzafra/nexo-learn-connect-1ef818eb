
import React from 'react';
import { cn } from '@/lib/utils';
import { Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface NexoLogoBaseProps {
  className?: string;
  animate?: boolean;
  subtitle?: string;
}

export const NexoLogoBase: React.FC<NexoLogoBaseProps> = ({ 
  className, 
  animate = true,
  subtitle = "ecosistema creativo"
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      <motion.div 
        className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Atom className="w-5 h-5 text-white" />
        {/* Removed the border animation */}
      </motion.div>
      
      <div className="flex flex-col ml-3">
        <motion.div
          className="text-lg font-bold text-foreground leading-none"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          nexo
        </motion.div>
        <span className="text-xs text-muted-foreground font-medium">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
