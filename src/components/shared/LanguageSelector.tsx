
import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { SupportedLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  languages: { code: string; name: string }[];
  onChange: (code: string) => void;
  variant?: 'default' | 'minimal' | 'icon';
  align?: 'start' | 'end' | 'center';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  languages,
  onChange,
  variant = 'default',
  align = 'end'
}) => {
  const handleLanguageChange = (code: string) => {
    onChange(code);
  };

  if (variant === 'minimal') {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Globe className="h-4 w-4" />
      </Button>
    );
  }

  if (variant === 'icon') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Cambiar idioma</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {languages.map((language) => (
            <DropdownMenuItem 
              key={language.code}
              className="cursor-pointer"
              onClick={() => handleLanguageChange(language.code)}
            >
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Globe className="mr-2 h-4 w-4" />
          {languages.find(l => l.code === currentLanguage)?.name || currentLanguage}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code}
            className="cursor-pointer"
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
