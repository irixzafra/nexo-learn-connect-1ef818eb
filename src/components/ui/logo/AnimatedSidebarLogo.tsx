
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code, Rocket, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedSidebarLogoProps {
  className?: string;
  isCollapsed?: boolean;
}

export const AnimatedSidebarLogo: React.FC<AnimatedSidebarLogoProps> = ({
  className,
  isCollapsed = false
}) => {
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [
    { Icon: Rocket, color: 'text-blue-500' },
    { Icon: BookOpen, color: 'text-blue-400' },
    { Icon: Code, color: 'text-blue-600' },
    { Icon: Lightbulb, color: 'text-amber-400' },
    { Icon: Zap, color: 'text-blue-500' }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn("relative flex justify-center items-center", className)}>
      <div className={cn(
        "rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center",
        isCollapsed ? "w-10 h-10" : "w-12 h-12"
      )}>
        {isCollapsed ? (
          <div className="text-white font-bold text-xl">N</div>
        ) : (
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIcon}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                {React.createElement(icons[currentIcon].Icon, { size: 24 })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
