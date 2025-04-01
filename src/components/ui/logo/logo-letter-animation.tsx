
import React from 'react';
import { motion } from 'framer-motion';

interface LogoLetterAnimationProps {
  text: string;
  className?: string;
}

export const LogoLetterAnimation: React.FC<LogoLetterAnimationProps> = ({ 
  text, 
  className 
}) => {
  const letterVariants = {
    initial: { y: 0 },
    hover: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div 
      className={`flex text-2xl font-bold ${className || ''}`}
      initial="initial"
      whileHover="hover"
    >
      {text.split('').map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          variants={letterVariants}
          custom={i}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
