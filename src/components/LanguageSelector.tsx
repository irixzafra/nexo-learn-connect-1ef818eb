
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LanguageSelectorProps {
  variant?: 'icon' | 'full' | 'minimal';
  align?: 'start' | 'center' | 'end';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'icon',
  align = 'end'
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();

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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {variant === 'icon' ? (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
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
            {(Object.keys(LANGUAGE_NAMES) as SupportedLanguage[]).map((lang) => (
              <DropdownMenuItem 
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`cursor-pointer flex items-center gap-2 ${
                  currentLanguage === lang ? 'bg-accent text-accent-foreground' : ''
                }`}
              >
                <span>{getLanguageFlag(lang)}</span>
                <span>{LANGUAGE_NAMES[lang]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Cambiar idioma</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default LanguageSelector;
