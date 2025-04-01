
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage, SupportedLanguage } from '@/contexts/LanguageContext';

interface LanguageIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
}

export const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({
  size = 'md',
  showText = true,
  variant = 'secondary'
}) => {
  const { currentLanguage } = useLanguage();
  
  // Get language flag emoji based on language code
  const getLanguageFlag = (code: SupportedLanguage): string => {
    switch (code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇺🇸';
      case 'pt': return '🇧🇷';
      case 'fr': return '🇫🇷';
      case 'de': return '🇩🇪';
      default: return '🌐';
    }
  };
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5'
  };
  
  return (
    <Badge 
      variant={variant}
      className={`${sizeClasses[size]} rounded-full font-normal uppercase`}
    >
      <span className="mr-1">{getLanguageFlag(currentLanguage)}</span>
      {showText && currentLanguage.toUpperCase()}
    </Badge>
  );
};

export default LanguageIndicator;
