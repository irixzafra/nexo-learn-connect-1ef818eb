
import React from 'react';
import { motion } from 'framer-motion';

interface NexoLogoBaseProps {
  className?: string;
  animate?: boolean;
  subtitle?: string;
}

export const NexoLogoBase: React.FC<NexoLogoBaseProps> = ({ 
  className = 'w-32', 
  animate = false,
  subtitle
}) => {
  const logoVariants = animate ? {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  } : {};

  return (
    <div className="flex items-center">
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        variants={logoVariants}
      >
        <circle cx="24" cy="24" r="24" fill="#2563EB" />
        <path
          d="M34.5 24C34.5 29.799 29.799 34.5 24 34.5C18.201 34.5 13.5 29.799 13.5 24C13.5 18.201 18.201 13.5 24 13.5C29.799 13.5 34.5 18.201 34.5 24Z"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          d="M24 34.5C29.799 34.5 34.5 29.799 34.5 24"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M13.5 24C13.5 18.201 18.201 13.5 24 13.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M32.5 24C32.5 28.6944 28.6944 32.5 24 32.5C19.3056 32.5 15.5 28.6944 15.5 24C15.5 19.3056 19.3056 15.5 24 15.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.svg>
      
      {subtitle && (
        <div className="ml-2 hidden sm:flex flex-col">
          <span className="text-xl font-bold tracking-tight">nexo</span>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
      )}
    </div>
  );
};
