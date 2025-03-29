
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NexoLogo } from './nexo-logo';

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

  // Generate random particles
  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: ['#E11D48', '#6366F1', '#8B5CF6', '#3B82F6'][Math.floor(Math.random() * 4)],
        speed: Math.random() * 2 + 1
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    click: { scale: 0.95, transition: { duration: 0.2 } }
  };

  const orbitVariants = {
    initial: { opacity: 0.6, rotate: 0 },
    animate: { opacity: 0.8, rotate: 360, transition: { duration: 30, repeat: Infinity, ease: "linear" } }
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

  const rocketVariants = {
    initial: { x: '-120%', y: '120%', opacity: 0 },
    animate: { 
      x: '120%', 
      y: '-120%', 
      opacity: [0, 1, 1, 0], 
      transition: { 
        duration: 4, 
        times: [0, 0.1, 0.9, 1],
        repeat: Infinity, 
        repeatDelay: 15, 
        ease: "easeOut" 
      } 
    }
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
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-primary/20 -z-10"
          initial="initial"
          animate={animate ? "animate" : "initial"}
          variants={orbitVariants}
        />
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

      <motion.div
        className="absolute -z-10 text-primary/70"
        style={{ 
          fontSize: '10px', 
          width: '15px', 
          height: '15px' 
        }}
        initial="initial"
        animate={animate ? "animate" : "initial"}
        variants={rocketVariants}
      >
        🚀
      </motion.div>

      <NexoLogo className="relative z-20" />
    </motion.div>
  );
};
