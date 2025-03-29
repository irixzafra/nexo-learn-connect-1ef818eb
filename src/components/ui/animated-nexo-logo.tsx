
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NexoLogo } from './logo';
import { Atom, BookOpen, Rocket, Lightbulb, Code, Sparkles, PenTool, Palette } from 'lucide-react';

interface AnimatedNexoLogoProps {
  className?: string;
  animate?: boolean;
  showParticles?: boolean;
  showOrbit?: boolean;
}

export const AnimatedNexoLogo: React.FC<AnimatedNexoLogoProps> = ({ 
  className, 
  animate = true,
  showParticles = true,
  showOrbit = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; color: string; speed: number }[]>([]);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  const creativeIcons = [
    { icon: Rocket, color: "text-blue-400" },
    { icon: BookOpen, color: "text-blue-500" },
    { icon: Lightbulb, color: "text-amber-400" },
    { icon: Code, color: "text-indigo-500" },
    { icon: PenTool, color: "text-teal-500" },
    { icon: Palette, color: "text-pink-500" },
    { icon: Atom, color: "text-blue-600" },
    { icon: Sparkles, color: "text-amber-500" }
  ];

  // Generate random particles
  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: ['#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 2 + 1
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

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

  const particleVariants = {
    initial: (i: number) => ({ 
      x: particles[i]?.x || 0, 
      y: particles[i]?.y || 0,
      opacity: 0.7
    }),
    animate: (i: number) => ({ 
      x: ((particles[i]?.x || 0) + (particles[i]?.speed || 1) * 10) % 100, 
      y: ((particles[i]?.y || 0) + (particles[i]?.speed || 1) * 5) % 100,
      opacity: Math.random() * 0.5 + 0.5,
      transition: { 
        x: { duration: 10 / (particles[i]?.speed || 1), repeat: Infinity, ease: "linear" },
        y: { duration: 15 / (particles[i]?.speed || 1), repeat: Infinity, ease: "linear" },
        opacity: { duration: 2, repeat: Infinity, yoyo: true, ease: "easeInOut" }
      }
    })
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
      {showOrbit && (
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 -z-10" />
      )}
      
      {showParticles && particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full z-10"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          custom={index}
          initial="initial"
          animate={animate ? "animate" : "initial"}
          variants={particleVariants}
        />
      ))}

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
