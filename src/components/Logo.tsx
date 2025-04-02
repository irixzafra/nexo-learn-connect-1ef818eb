
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '@/hooks/useLocalization';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark' | 'color';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'color' 
}) => {
  const { localizeUrl } = useLocalization();
  
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
      to={localizeUrl('/')} 
      className={`flex items-center gap-2 font-bold ${textColor}`}
    >
      <span className={`${sizeClass} font-heading`}>Nexo Learning</span>
    </Link>
  );
};

export default Logo;
