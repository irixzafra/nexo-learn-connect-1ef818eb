
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NexoLogo } from './logo';
import { Rocket, BookOpen, Lightbulb } from 'lucide-react';

interface AnimatedNexoLogoProps {
  className?: string;
  animate?: boolean;
  showParticles?: boolean;
  showOrbit?: boolean;
}

export const AnimatedNexoLogo: React.FC<AnimatedNexoLogoProps> = ({ 
  className, 
  animate = true,
  showParticles = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  const creativeIcons = [
    { icon: Rocket, color: "text-blue-400" },
    { icon: BookOpen, color: "text-blue-500" },
    { icon: Lightbulb, color: "text-amber-400" }
  ];

  // Cycle through creative icons
  useEffect(() => {
    if (animate) {
      const iconInterval = setInterval(() => {
        setCurrentIconIndex((prevIndex) => 
          prevIndex === creativeIcons.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      
      return () => clearInterval(iconInterval);
    }
  }, [animate]);

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    click: { scale: 0.95, transition: { duration: 0.2 } }
  };

  const iconVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <motion.div 
      className={`relative ${className || ""}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={isHovered ? "hover" : "initial"}
      whileTap="click"
      variants={logoVariants}
    >
      {animate && (
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIconIndex}
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={`${creativeIcons[currentIconIndex].color}`}
            >
              {React.createElement(creativeIcons[currentIconIndex].icon, { 
                size: 20,
                className: "opacity-70" 
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <NexoLogo className="relative z-20" />
    </motion.div>
  );
};
