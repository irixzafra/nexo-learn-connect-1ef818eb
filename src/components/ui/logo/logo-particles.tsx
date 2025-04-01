
import React from 'react';
import { motion } from 'framer-motion';

interface LogoParticlesProps {
  count?: number;
}

export const LogoParticles: React.FC<LogoParticlesProps> = ({ count = 8 }) => {
  // Generate random particles
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4px
    x: (Math.random() - 0.5) * 30, // Position around center
    y: (Math.random() - 0.5) * 30,
    duration: Math.random() * 3 + 2, // 2-5s
    delay: Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white rounded-full opacity-80"
          style={{
            width: particle.size,
            height: particle.size,
            left: '50%',
            top: '50%',
            x: particle.x,
            y: particle.y
          }}
          animate={{
            x: [particle.x, particle.x * -1, particle.x],
            y: [particle.y, particle.y * -1, particle.y],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
