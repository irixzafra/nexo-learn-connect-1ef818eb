
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { SupportedLanguage } from '@/contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  languages: { code: string; name: string }[];
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

  const handleLanguageChange = (langCode: string) => {
    console.log('LanguageSelector: Changing language to:', langCode);
    onChange(langCode);
  };

  const trigger = (
    <>
      {variant === 'icon' && (
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      )}
      
      {variant === 'minimal' && (
        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full p-0">
          <span className="text-base">{getLanguageFlag(currentLanguage)}</span>
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      )}
      
      {variant === 'full' && (
        <Button variant="outline" size="sm" className="gap-2 w-full justify-between">
          <span className="flex items-center gap-2">
            {getLanguageFlag(currentLanguage)}
            <span>{languages.find(l => l.code === currentLanguage)?.name || 'Idioma'}</span>
          </span>
          <Globe className="h-3.5 w-3.5 opacity-70" />
        </Button>
      )}
    </>
  );

  return (
    <Tooltip>
      <DropdownMenu>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            {trigger}
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Cambiar idioma</p>
        </TooltipContent>
        <DropdownMenuContent align={align} className="w-40">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
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
    </Tooltip>
  );
};

export default LanguageSelector;
