
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Check, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Paletas predefinidas de colores
const predefinedThemes = [
  {
    id: 'default',
    name: 'Default',
    description: 'Tema por defecto del sistema',
    colors: {
      primary: '#8B5CF6',
      secondary: '#F97316',
      accent: '#0EA5E9',
      background: '#FFFFFF',
      foreground: '#1A1F2C',
      muted: '#F6F6F7',
      border: '#E5E7EB',
    },
    preview: '/lovable-uploads/6ff05904-ecff-40d1-b755-5868a3185480.png'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Tema oscuro elegante',
    colors: {
      primary: '#A78BFA',
      secondary: '#FB923C',
      accent: '#38BDF8',
      background: '#1E1E2E',
      foreground: '#F8FAFC',
      muted: '#313244',
      border: '#45475A',
    },
    preview: '/lovable-uploads/cfd7a3c9-a54c-48d0-a5fd-fcf7c6fb3b2d.png'
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Tema inspirado en la naturaleza',
    colors: {
      primary: '#4ADE80',
      secondary: '#F59E0B',
      accent: '#34D399',
      background: '#F8FAFC',
      foreground: '#1F2937',
      muted: '#F1F5F9',
      border: '#E2E8F0',
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Tema con tonos azules profundos',
    colors: {
      primary: '#3B82F6',
      secondary: '#EC4899',
      accent: '#06B6D4',
      background: '#F8FAFC',
      foreground: '#0F172A',
      muted: '#F1F5F9',
      border: '#E2E8F0',
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Tema inspirado en atardeceres',
    colors: {
      primary: '#F43F5E',
      secondary: '#FBBF24',
      accent: '#FB7185',
      background: '#FFFFFF',
      foreground: '#1F2937',
      muted: '#F6F6F7',
      border: '#E5E7EB',
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Tema minimalista en blanco y negro',
    colors: {
      primary: '#404040',
      secondary: '#737373',
      accent: '#262626',
      background: '#FFFFFF',
      foreground: '#171717',
      muted: '#F5F5F5',
      border: '#E5E5E5',
    }
  }
];

// Tipografías predefinidas
const predefinedFonts = [
  {
    id: 'default',
    name: 'Default',
    description: 'Tipografía por defecto del sistema',
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'monospace',
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Combinación moderna y legible',
    fonts: {
      heading: 'Poppins, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    }
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Estilo clásico y elegante',
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Source Sans Pro, sans-serif',
      mono: 'Source Code Pro, monospace',
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Tipografía minimalista y clara',
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Open Sans, sans-serif',
      mono: 'Roboto Mono, monospace',
    }
  }
];

export const ThemePresetsTab: React.FC = () => {
  const { theme, previewTheme, saveTheme, isPreviewing } = useDesignSystem();
  
  const handlePreviewTheme = (presetId: string) => {
    const selectedPreset = predefinedThemes.find(preset => preset.id === presetId);
    if (!selectedPreset) return;
    
    const newTheme = {
      ...theme,
      colors: selectedPreset.colors
    };
    
    previewTheme(newTheme);
    toast.info(`Vista previa del tema ${selectedPreset.name} aplicada`);
  };
  
  const handlePreviewFonts = (presetId: string) => {
    const selectedPreset = predefinedFonts.find(preset => preset.id === presetId);
    if (!selectedPreset) return;
    
    const newTheme = {
      ...theme,
      fonts: {
        ...theme.fonts,
        heading: selectedPreset.fonts.heading,
        body: selectedPreset.fonts.body,
        mono: selectedPreset.fonts.mono,
      }
    };
    
    previewTheme(newTheme);
    toast.info(`Vista previa de la tipografía ${selectedPreset.name} aplicada`);
  };
  
  const handleApplyComplete = (colorId: string, fontId: string) => {
    const selectedColors = predefinedThemes.find(preset => preset.id === colorId);
    const selectedFonts = predefinedFonts.find(preset => preset.id === fontId);
    
    if (!selectedColors || !selectedFonts) return;
    
    const newTheme = {
      ...theme,
      colors: selectedColors.colors,
      fonts: {
        ...theme.fonts,
        heading: selectedFonts.fonts.heading,
        body: selectedFonts.fonts.body,
        mono: selectedFonts.fonts.mono,
      }
    };
    
    saveTheme(newTheme);
    toast.success('Tema completo aplicado correctamente');
  };

  const isCurrentTheme = (colorPreset: typeof predefinedThemes[0]) => {
    return Object.entries(colorPreset.colors).every(
      ([key, value]) => theme.colors[key as keyof typeof theme.colors] === value
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Paletas de Color Predefinidas</CardTitle>
          <CardDescription>
            Selecciona una paleta de colores predefinida para aplicar a tu plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedThemes.map((preset) => (
              <div 
                key={preset.id}
                className={`border rounded-lg overflow-hidden transition-all hover:shadow-md ${
                  isCurrentTheme(preset) ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div 
                  className="h-32 w-full relative"
                  style={{
                    background: `linear-gradient(135deg, ${preset.colors.primary} 0%, ${preset.colors.secondary} 100%)`
                  }}
                >
                  {preset.preview && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={preset.preview} 
                        alt={preset.name} 
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {isCurrentTheme(preset) && (
                      <Badge className="bg-white text-primary">
                        <Check className="h-3 w-3 mr-1" />
                        Actual
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium mb-1">{preset.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{preset.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(preset.colors).map(([key, color]) => (
                      <div 
                        key={key}
                        className="h-5 w-5 rounded-full border"
                        style={{ backgroundColor: color }}
                        title={`${key}: ${color}`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handlePreviewTheme(preset.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Vista Previa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tipografías Predefinidas</CardTitle>
          <CardDescription>
            Selecciona combinaciones de tipografías para tu plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predefinedFonts.map((preset) => (
              <div 
                key={preset.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-medium mb-1">{preset.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{preset.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Encabezados</p>
                    <p className="text-xl" style={{ fontFamily: preset.fonts.heading }}>
                      Ejemplo de Texto para Títulos
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Cuerpo</p>
                    <p className="text-base" style={{ fontFamily: preset.fonts.body }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod metus vel sem bibendum.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Monoespaciado</p>
                    <p className="text-sm" style={{ fontFamily: preset.fonts.mono }}>
                      const example = "monospace";
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handlePreviewFonts(preset.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Vista Previa
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Aplicar Tema Completo</CardTitle>
          <CardDescription>
            Aplica una combinación predefinida de colores y tipografía
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-medium">Selecciona una paleta de colores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {predefinedThemes.slice(0, 6).map((preset) => (
                    <Button 
                      key={preset.id}
                      variant="outline" 
                      className="h-auto p-2 flex flex-col items-center justify-center"
                      onClick={() => handlePreviewTheme(preset.id)}
                    >
                      <div 
                        className="h-12 w-full rounded mb-2"
                        style={{
                          background: `linear-gradient(135deg, ${preset.colors.primary} 0%, ${preset.colors.secondary} 100%)`
                        }}
                      />
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-medium">Selecciona una tipografía</h3>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedFonts.map((preset) => (
                    <Button 
                      key={preset.id}
                      variant="outline" 
                      className="h-auto p-2 flex flex-col items-center justify-center"
                      onClick={() => handlePreviewFonts(preset.id)}
                    >
                      <p 
                        className="text-lg mb-2" 
                        style={{ fontFamily: preset.fonts.heading }}
                      >
                        Aa
                      </p>
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <Button onClick={() => handleApplyComplete('default', 'default')} disabled={!isPreviewing}>
                Aplicar Tema Completo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                * Usa "Vista Previa" en las secciones anteriores para probar antes de aplicar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
