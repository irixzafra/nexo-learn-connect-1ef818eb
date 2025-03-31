
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  const sizeClass = sizes[size];

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <Loader2 className={`${sizeClass} animate-spin text-primary ${className}`} />
    </div>
  );
};

export default Loader;
