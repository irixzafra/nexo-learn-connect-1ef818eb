
import React from 'react';
import { motion } from 'framer-motion';

interface LogoParticlesProps {
  count: number;
}

export const LogoParticles: React.FC<LogoParticlesProps> = ({ count }) => {
  const particles = Array.from({ length: count });
  
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-200 rounded-full"
          initial={{
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{
            x: Math.cos(i * (Math.PI * 2 / count)) * (Math.random() * 20 + 20),
            y: Math.sin(i * (Math.PI * 2 / count)) * (Math.random() * 20 + 20),
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
    </>
  );
};
