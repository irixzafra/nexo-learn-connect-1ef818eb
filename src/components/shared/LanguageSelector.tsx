
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage, SupportedLanguage, LANGUAGE_NAMES } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  languages: Array<{ code: string; name: string }>;
  onChange: (code: string) => void;
  variant?: 'icon' | 'full' | 'minimal';
  align?: 'start' | 'center' | 'end';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  languages,
  onChange,
  variant = 'icon',
  align = 'end'
}) => {
  // Get language flag emoji based on language code
  const getLanguageFlag = (code: string): string => {
    switch (code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇺🇸';
      case 'pt': return '🇧🇷';
      case 'fr': return '🇫🇷';
      case 'de': return '🇩🇪';
      default: return '🌐';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'icon' ? (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Cambiar idioma</span>
          </Button>
        ) : variant === 'minimal' ? (
          <Button variant="ghost" size="sm" className="px-2 h-8">
            {getLanguageFlag(currentLanguage)}
            <span className="sr-only">Cambiar idioma</span>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2">
            {getLanguageFlag(currentLanguage)}
            <span>{LANGUAGE_NAMES[currentLanguage]}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => onChange(lang.code)}
            className={`cursor-pointer flex items-center gap-2 ${
              currentLanguage === lang.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span>{getLanguageFlag(lang.code)}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
