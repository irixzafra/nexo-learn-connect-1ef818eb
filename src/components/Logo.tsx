
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark' | 'color';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'color',
  className
}) => {
  // Instead of using localizeUrl from useLocalization, we'll use direct paths
  const homePath = '/';
  
  const sizeClass = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12'
  }[size];
  
  const textColor = {
    light: 'text-white',
    dark: 'text-gray-900',
    color: 'text-primary'
  }[variant];

  return (
    <Link 
      to={homePath} 
      className={cn(`flex items-center gap-2 font-bold ${textColor}`, className)}
    >
      <span className={`${sizeClass} font-heading`}>Nexo Learning</span>
    </Link>
  );
};

export default Logo;
