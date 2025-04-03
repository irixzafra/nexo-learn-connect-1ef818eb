
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

// Predefined themes configuration
export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  preview: React.ReactNode;
}

// Theme preview component
const ThemePreview: React.FC<{ colors: ThemeOption['colors']; className?: string }> = ({ 
  colors, 
  className 
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-20 rounded-md overflow-hidden border", 
        className
      )}
      style={{ background: colors.background }}
    >
      <div className="absolute top-2 left-2 w-6 h-6 rounded-full" style={{ background: colors.primary }}></div>
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full" style={{ background: colors.secondary }}></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full" style={{ background: colors.accent }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-4 rounded-sm" style={{ background: colors.primary }}></div>
      </div>
    </div>
  );
};

// Predefined themes
const themeOptions: ThemeOption[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Tema estándar de la plataforma',
    colors: {
      primary: '#8B5CF6',
      secondary: '#F97316',
      accent: '#0EA5E9',
      background: '#FFFFFF',
    },
    preview: <ThemePreview colors={{
      primary: '#8B5CF6',
      secondary: '#F97316',
      accent: '#0EA5E9',
      background: '#FFFFFF',
    }} />
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Tema oscuro para uso nocturno',
    colors: {
      primary: '#A78BFA',
      secondary: '#FB923C',
      accent: '#38BDF8',
      background: '#1A1F2C',
    },
    preview: <ThemePreview colors={{
      primary: '#A78BFA',
      secondary: '#FB923C',
      accent: '#38BDF8',
      background: '#1A1F2C',
    }} className="border-gray-700" />
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Tonos azules y turquesa',
    colors: {
      primary: '#0EA5E9',
      secondary: '#22D3EE',
      accent: '#2DD4BF',
      background: '#F0F9FF',
    },
    preview: <ThemePreview colors={{
      primary: '#0EA5E9',
      secondary: '#22D3EE',
      accent: '#2DD4BF',
      background: '#F0F9FF',
    }} />
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Inspirado en tonos verdes de la naturaleza',
    colors: {
      primary: '#10B981',
      secondary: '#84CC16',
      accent: '#4ADE80',
      background: '#F0FDF4',
    },
    preview: <ThemePreview colors={{
      primary: '#10B981',
      secondary: '#84CC16',
      accent: '#4ADE80',
      background: '#F0FDF4',
    }} />
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Colores cálidos inspirados en atardeceres',
    colors: {
      primary: '#F97316',
      secondary: '#FBBF24',
      accent: '#EC4899',
      background: '#FFF7ED',
    },
    preview: <ThemePreview colors={{
      primary: '#F97316',
      secondary: '#FBBF24',
      accent: '#EC4899',
      background: '#FFF7ED',
    }} />
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Diseño elegante en escala de grises',
    colors: {
      primary: '#525252',
      secondary: '#737373',
      accent: '#404040',
      background: '#FAFAFA',
    },
    preview: <ThemePreview colors={{
      primary: '#525252',
      secondary: '#737373',
      accent: '#404040',
      background: '#FAFAFA',
    }} />
  },
];

// Theme selector component
export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-medium">Temas Predefinidos</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themeOptions.map((option) => (
          <div 
            key={option.id}
            className={cn(
              "border rounded-lg p-4 transition-all cursor-pointer hover:border-primary",
              theme === option.id && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => setTheme(option.id as any)}
          >
            {option.preview}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{option.name}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              {theme === option.id && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
