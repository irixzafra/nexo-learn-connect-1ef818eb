
import React, { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Wand2, Check, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const ColorPaletteTab: React.FC = () => {
  const { theme, previewTheme, isLoading } = useDesignSystem();
  const [colorTheme, setColorTheme] = useState({ ...theme.colors });
  
  const handleColorChange = (colorKey: keyof typeof colorTheme, value: string) => {
    const newColors = { ...colorTheme, [colorKey]: value };
    setColorTheme(newColors);
    
    const newTheme = { ...theme, colors: newColors };
    previewTheme(newTheme);
  };
  
  const generateShades = (baseColor: string) => {
    // Convert hex to RGB
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Generate shades (5 lighter and 5 darker)
    const shades = [];
    
    // Lighter shades
    for (let i = 9; i >= 5; i--) {
      const factor = (10 - i) * 0.1;
      const rNew = Math.round(r + (255 - r) * factor);
      const gNew = Math.round(g + (255 - g) * factor);
      const bNew = Math.round(b + (255 - b) * factor);
      
      const hexNew = `#${rNew.toString(16).padStart(2, '0')}${gNew.toString(16).padStart(2, '0')}${bNew.toString(16).padStart(2, '0')}`;
      shades.push({ shade: i * 100, color: hexNew.toUpperCase() });
    }
    
    // Base shade
    shades.push({ shade: 500, color: baseColor.toUpperCase() });
    
    // Darker shades
    for (let i = 6; i <= 9; i++) {
      const factor = (i - 5) * 0.15;
      const rNew = Math.round(r * (1 - factor));
      const gNew = Math.round(g * (1 - factor));
      const bNew = Math.round(b * (1 - factor));
      
      const hexNew = `#${rNew.toString(16).padStart(2, '0')}${gNew.toString(16).padStart(2, '0')}${bNew.toString(16).padStart(2, '0')}`;
      shades.push({ shade: i * 100, color: hexNew.toUpperCase() });
    }
    
    return shades;
  };
  
  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Color ${color} copiado al portapapeles`);
  };
  
  const generateComplementaryPalette = () => {
    // Get base color
    const primary = colorTheme.primary;
    
    // Convert to HSL to generate complementary colors
    const hex = primary.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    // Generate complementary color (opposite on color wheel)
    const hComp = (h + 0.5) % 1;
    
    // Generate harmonious secondary (120° on color wheel)
    const hSec = (h + 0.33) % 1;
    
    // Generate harmonious accent (240° on color wheel)
    const hAcc = (h + 0.67) % 1;
    
    // Convert HSL to RGB helper function
    const hslToRgb = (h: number, s: number, l: number) => {
      let r, g, b;
      
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }
      
      return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
      ];
    };
    
    // Convert to hex
    const rgbToHex = (r: number, g: number, b: number) => {
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    };
    
    // Get complementary colors
    const [rComp, gComp, bComp] = hslToRgb(hComp, s, l);
    const [rSec, gSec, bSec] = hslToRgb(hSec, s, l);
    const [rAcc, gAcc, bAcc] = hslToRgb(hAcc, s, l);
    
    // Generate lighter/darker versions for neutral colors
    const [rBase, gBase, bBase] = [r * 255, g * 255, b * 255].map(Math.round);
    
    // Create a muted shade (desaturated primary)
    const muted = rgbToHex(
      Math.round(rBase * 0.7 + 255 * 0.3),
      Math.round(gBase * 0.7 + 255 * 0.3),
      Math.round(bBase * 0.7 + 255 * 0.3)
    );
    
    // Create border color (light gray with a hint of primary)
    const border = rgbToHex(
      Math.round(rBase * 0.1 + 230 * 0.9),
      Math.round(gBase * 0.1 + 230 * 0.9),
      Math.round(bBase * 0.1 + 230 * 0.9)
    );
    
    const newColors = {
      primary: primary,
      secondary: rgbToHex(rSec, gSec, bSec),
      accent: rgbToHex(rAcc, gAcc, bAcc),
      background: '#FFFFFF',
      foreground: '#1A1F2C',
      muted: muted,
      border: border
    };
    
    setColorTheme(newColors);
    previewTheme({
      ...theme,
      colors: newColors
    });
    
    toast.success('Paleta de colores complementarios generada');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={generateComplementaryPalette} 
          variant="outline"
          className="gap-2"
        >
          <Wand2 className="h-4 w-4" />
          Generar Paleta Complementaria
        </Button>
      </div>
      
      <Tabs defaultValue="palette">
        <TabsList className="mb-4">
          <TabsTrigger value="palette">Paleta Principal</TabsTrigger>
          <TabsTrigger value="shades">Tonalidades</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="palette">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(colorTheme).map(([key, color]) => (
              <Card key={key} className="overflow-hidden">
                <div 
                  className="h-24 w-full" 
                  style={{ backgroundColor: color }}
                ></div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor={`color-${key}`} className="capitalize font-medium">
                      {key}
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyColorToClipboard(color)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    ></div>
                    <Input
                      id={`color-${key}`}
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(key as keyof typeof colorTheme, e.target.value)}
                      className="font-mono uppercase"
                    />
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(key as keyof typeof colorTheme, e.target.value)}
                      className="w-10 p-0 h-8"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="shades">
          <Card>
            <CardHeader>
              <CardTitle>Tonalidades de Color</CardTitle>
              <CardDescription>
                Variaciones de tono para cada color principal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(colorTheme).map(([key, color]) => (
                  <AccordionItem key={key} value={key}>
                    <AccordionTrigger className="capitalize">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: color }}
                        ></div>
                        {key}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2">
                        {generateShades(color).map((shade) => (
                          <div 
                            key={shade.shade} 
                            className="flex flex-col items-center"
                            onClick={() => copyColorToClipboard(shade.color)}
                          >
                            <div 
                              className="w-12 h-12 rounded-md cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: shade.color }}
                              title={`Copiar ${shade.color}`}
                            ></div>
                            <span className="text-xs mt-1">{shade.shade}</span>
                            <span className="text-xs text-muted-foreground font-mono">
                              {shade.color}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Paletas Predefinidas</CardTitle>
                <CardDescription>
                  Selecciona un esquema de color predefinido para tu plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    const newColors = {
                      primary: '#8B5CF6',
                      secondary: '#F97316',
                      accent: '#0EA5E9',
                      background: '#FFFFFF',
                      foreground: '#1A1F2C',
                      muted: '#F1F5F9',
                      border: '#E2E8F0'
                    };
                    setColorTheme(newColors);
                    previewTheme({
                      ...theme,
                      colors: newColors
                    });
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Moderno y Profesional</h3>
                    <Badge>Recomendado</Badge>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#8B5CF6' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#F97316' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#0EA5E9' }}></div>
                  </div>
                </div>
                
                <div 
                  className="p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    const newColors = {
                      primary: '#10B981',
                      secondary: '#6366F1',
                      accent: '#F59E0B',
                      background: '#FFFFFF',
                      foreground: '#111827',
                      muted: '#F3F4F6',
                      border: '#E5E7EB'
                    };
                    setColorTheme(newColors);
                    previewTheme({
                      ...theme,
                      colors: newColors
                    });
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Educativo y Fresco</h3>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#10B981' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#6366F1' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#F59E0B' }}></div>
                  </div>
                </div>
                
                <div 
                  className="p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    const newColors = {
                      primary: '#EC4899',
                      secondary: '#8B5CF6',
                      accent: '#6366F1',
                      background: '#FFFFFF',
                      foreground: '#1E293B',
                      muted: '#F1F5F9',
                      border: '#E2E8F0'
                    };
                    setColorTheme(newColors);
                    previewTheme({
                      ...theme,
                      colors: newColors
                    });
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Creativo y Enérgico</h3>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#EC4899' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#8B5CF6' }}></div>
                    <div className="h-6 w-full rounded" style={{ backgroundColor: '#6366F1' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>
                  Previsualización de elementos con la paleta seleccionada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Encabezado</h3>
                  <p className="text-muted-foreground">
                    Párrafo con texto normal y un <a href="#" className="text-primary hover:underline">enlace</a>.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button>Botón Principal</Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Secundario</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Badge>Badge</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>
                
                <div>
                  <div className="border rounded-md p-3 bg-background">
                    <div className="flex justify-between items-center">
                      <span>Elemento de Tarjeta</span>
                      <Button variant="ghost" size="sm">Acción</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
