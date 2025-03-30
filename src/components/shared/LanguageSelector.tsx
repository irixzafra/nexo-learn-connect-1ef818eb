
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LanguageSelectorProps {
  currentLanguage: string;
  languages: { code: string; name: string }[];
  onChange: (code: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  languages,
  onChange
}) => {
  // Get language flag emoji based on language code (mantenemos para usar dentro del menú)
  const getLanguageFlag = (code: string): string => {
    switch (code) {
      case 'es': return '🇪🇸';
      case 'en': return '🇺🇸';
      case 'pt': return '🇧🇷';
      default: return '🌐';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Globe className="h-4 w-4" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => onChange(lang.code)}
                className="cursor-pointer flex items-center gap-2"
              >
                <span>{getLanguageFlag(lang.code)}</span>
                <span>{lang.name}</span>
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
