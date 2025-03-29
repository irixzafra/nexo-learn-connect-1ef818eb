
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LogoLetterAnimationProps {
  text: string;
}

export const LogoLetterAnimation: React.FC<LogoLetterAnimationProps> = ({ text }) => {
  const [hovered, setHovered] = useState(false);
  
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
  
  return (
    <div 
      className="flex" 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text.split('').map((letter, i) => (
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
    </div>
  );
};
