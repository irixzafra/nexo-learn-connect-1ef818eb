
import React from 'react';
import { cn } from '@/lib/utils';
import { Atom } from 'lucide-react';
import { motion } from 'framer-motion';
import { LogoLetterAnimation } from './logo-letter-animation';
import { LogoParticles } from './logo-particles';

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
      <div className="relative flex items-center justify-center">
        {/* Background pulse effect */}
        {animate && (
          <motion.div 
            className="absolute rounded-full bg-primary/20 opacity-70"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ width: "120%", height: "120%" }}
          />
        )}
        
        {/* Logo icon */}
        <div className="relative w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-sm z-10">
          <Atom className="w-6 h-6" />
          
          {/* Particles effect */}
          {animate && <LogoParticles count={5} />}
        </div>
      </div>
      
      <div className="ml-3">
        {/* nexo text with letter animation */}
        <LogoLetterAnimation text="nexo" />
        
        {/* Subtitle */}
        <span className="text-xs font-medium text-muted-foreground tracking-wider">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
