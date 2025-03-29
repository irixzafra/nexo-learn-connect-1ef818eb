

import React from 'react';
import { cn } from '@/lib/utils';
import { Atom, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LogoLetterAnimation } from './logo-letter-animation';
import { LogoParticles } from './logo-particles';

interface NexoLogoLandingProps {
  className?: string;
  animate?: boolean;
  subtitle?: string;
}

export const NexoLogoLanding: React.FC<NexoLogoLandingProps> = ({ 
  className, 
  animate = true,
  subtitle = "ecosistema creativo"
}) => {
  const logoText = "nexo";
  const particlesCount = 12;

  return (
    <div className={cn("flex items-center", className)}>
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
          {animate && <LogoParticles count={particlesCount} />}
        </div>
      </div>
      
      <div className="ml-4">
        {/* nexo text with letter animation */}
        <div className="flex">
          <LogoLetterAnimation text={logoText} />
          {animate && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: [0.8, 1.2, 0.8], 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
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
};
