
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Sparkles } from 'lucide-react';

interface NexoLogoProps {
  className?: string;
  variant?: 'default' | 'icon' | 'landing';
  subtitle?: string;
  animate?: boolean;
}

export const NexoLogo: React.FC<NexoLogoProps> = ({ 
  className, 
  variant = 'default',
  subtitle = 'LEARNING PLATFORM',
  animate = true
}) => {
  const [hovered, setHovered] = useState(false);
  
  // Futuristic particles effect
  const particlesCount = 12;
  const particles = Array.from({ length: particlesCount });
  
  // Custom icon animation variants
  const sparkleVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: { 
      scale: [0.8, 1.2, 0.8], 
      opacity: [0.5, 1, 0.5],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const letterVariants = {
    initial: { y: 0 },
    hover: (i: number) => ({
      y: [-1, -4, -1],
      transition: {
        duration: 0.3,
        delay: i * 0.05,
        repeat: 0
      }
    })
  };
  
  // Use lowercase for the logo text
  const logoText = "nexo";

  // Landing page variant with gradient glow effect
  if (variant === 'landing') {
    return (
      <div className={cn("flex items-center", className)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className="relative flex items-center justify-center">
          {/* Background glow */}
          <motion.div 
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-80 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ width: "110%", height: "110%" }}
          />
          
          {/* Logo icon */}
          <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg z-10">
            {/* Atom core */}
            <Atom className="w-8 h-8 text-white" />
            
            {/* Particles effect */}
            {animate && particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-200 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0
                }}
                animate={{
                  x: Math.cos(i * (Math.PI * 2 / particlesCount)) * (Math.random() * 20 + 20),
                  y: Math.sin(i * (Math.PI * 2 / particlesCount)) * (Math.random() * 20 + 20),
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="ml-4">
          {/* nexo text with letter animation */}
          <div className="flex">
            {logoText.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate={hovered ? "hover" : "initial"}
              >
                {letter}
              </motion.span>
            ))}
            {animate && (
              <motion.div 
                variants={sparkleVariants}
                initial="initial"
                animate="animate"
                className="ml-1 mt-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>
            )}
          </div>
          
          <span className="text-xs font-medium text-muted-foreground tracking-wider">
            {subtitle}
          </span>
        </div>
      </div>
    );
  }
  
  // Icon only variant
  if (variant === 'icon') {
    return (
      <div className={cn("flex items-center", className)}>
        <motion.div 
          className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Atom className="w-5 h-5 text-white" />
          {animate && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-300 border-opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={cn("flex items-center", className)}>
      <motion.div 
        className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Atom className="w-5 h-5 text-white" />
        {animate && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-300 border-opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
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
