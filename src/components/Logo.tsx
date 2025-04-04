
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark' | 'color';
  className?: string;
  linkTo?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'color',
  className,
  linkTo = '/'
}) => {
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

  const logoContent = (
    <span className={`${sizeClass} font-heading`}>Nexo Learning</span>
  );

  // Renderiza el logo con o sin enlace según se necesite
  if (linkTo) {
    return (
      <Link 
        to={linkTo} 
        className={cn(`flex items-center gap-2 font-bold ${textColor}`, className)}
      >
        {logoContent}
      </Link>
    );
  }

  return (
    <div className={cn(`flex items-center gap-2 font-bold ${textColor}`, className)}>
      {logoContent}
    </div>
  );
};

export default Logo;
