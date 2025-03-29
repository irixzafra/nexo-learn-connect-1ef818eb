import React from 'react';
import { cn } from '@/lib/utils';
import { Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface NexoLogoIconProps {
  className?: string;
  animate?: boolean;
}

export const NexoLogoIcon: React.FC<NexoLogoIconProps> = ({ 
  className, 
  animate = true 
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      <motion.div 
        className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Atom className="w-5 h-5 text-white" />
      </motion.div>
    </div>
  );
};
