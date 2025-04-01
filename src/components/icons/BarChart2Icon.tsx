
import React from 'react';

interface IconProps {
  className?: string;
}

export const BarChart2Icon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="10" width="4" height="10"></rect>
    <rect x="10" y="4" width="4" height="16"></rect>
    <rect x="18" y="8" width="4" height="12"></rect>
  </svg>
);
