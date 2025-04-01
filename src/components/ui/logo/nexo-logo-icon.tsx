
import React from 'react';
import { cn } from '@/lib/utils';
import { Atom } from 'lucide-react';
import { motion } from 'framer-motion';
import { LogoParticles } from './logo-particles';

interface NexoLogoIconProps {
  className?: string;
  animate?: boolean;
}

export const NexoLogoIcon: React.FC<NexoLogoIconProps> = ({ 
  className, 
  animate = true 
}) => {
  return (
    <div className={cn("relative", className)}>
      {/* Background pulse effect */}
      {animate && (
        <motion.div 
          className="absolute rounded-full bg-primary/20 opacity-70"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ width: "120%", height: "120%", top: "-10%", left: "-10%" }}
        />
      )}
      
      {/* Logo icon */}
      <div className="relative w-full h-full flex items-center justify-center bg-primary text-white rounded-full shadow-sm z-10">
        <Atom className="w-3/5 h-3/5" />
        
        {/* Particles effect */}
        {animate && <LogoParticles count={4} />}
      </div>
    </div>
  );
};
