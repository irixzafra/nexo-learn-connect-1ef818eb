
import React, { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Maximize } from 'lucide-react';
import { toast } from 'sonner';

export const SpacingTab: React.FC = () => {
  const { theme, previewTheme, isLoading } = useDesignSystem();
  const [spacingConfig, setSpacingConfig] = useState({ 
    ...theme.spacing,
    borderRadius: theme.borderRadius
  });
  
  const handleBaseUnitChange = (value: number) => {
    const newSpacing = { ...spacingConfig, unit: value };
    setSpacingConfig(newSpacing);
    
    previewTheme({
      ...theme,
      spacing: {
        unit: value,
        scale: spacingConfig.scale
      },
      borderRadius: spacingConfig.borderRadius
    });
  };
  
  const handleScaleChange = (
    size: keyof typeof spacingConfig.scale,
    value: number
  ) => {
    const newScale = { ...spacingConfig.scale, [size]: value };
    const newSpacing = { ...spacingConfig, scale: newScale };
    
    setSpacingConfig(newSpacing);
    previewTheme({
      ...theme,
      spacing: {
        unit: spacingConfig.unit,
        scale: newScale
      },
      borderRadius: spacingConfig.borderRadius
    });
  };
  
  const handleBorderRadiusChange = (value: string) => {
    setSpacingConfig({ ...spacingConfig, borderRadius: value });
    
    previewTheme({
      ...theme,
      spacing: {
        unit: spacingConfig.unit,
        scale: spacingConfig.scale
      },
      borderRadius: value
    });
  };
  
  const applySpacingPreset = (preset: 'compact' | 'moderate' | 'spacious') => {
    let newScale;
    let newBorderRadius;
    
    if (preset === 'compact') {
      newScale = {
        xs: 0.125,
        sm: 0.25,
        md: 0.5,
        lg: 1,
        xl: 1.5,
        '2xl': 2
      };
      newBorderRadius = '0.25rem';
    } else if (preset === 'moderate') {
      newScale = {
        xs: 0.25,
        sm: 0.5,
        md: 1,
        lg: 1.5,
        xl: 2,
        '2xl': 3
      };
      newBorderRadius = '0.5rem';
    } else {
      newScale = {
        xs: 0.375,
        sm: 0.75,
        md: 1.5,
        lg: 2,
        xl: 3,
        '2xl': 4
      };
      newBorderRadius = '0.75rem';
    }
    
    const newSpacing = { 
      unit: spacingConfig.unit,
      scale: newScale,
      borderRadius: newBorderRadius
    };
    
    setSpacingConfig(newSpacing);
    previewTheme({
      ...theme,
      spacing: {
        unit: spacingConfig.unit,
        scale: newScale
      },
      borderRadius: newBorderRadius
    });
    
    toast.success(`Espaciado "${preset}" aplicado`);
  };
  
  // Helper to convert scale to actual pixels
  const getPixels = (scale: number) => `${scale * spacingConfig.unit}px`;
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="spacing">
        <TabsList className="mb-4">
          <TabsTrigger value="spacing">Espaciado</TabsTrigger>
          <TabsTrigger value="radius">Radio de Bordes</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spacing">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Espaciado</CardTitle>
              <CardDescription>
                Define la unidad base y los multiplicadores para el espaciado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="base-unit">Unidad Base (px)</Label>
                    <span className="text-sm font-mono">{spacingConfig.unit}px</span>
                  </div>
                  <Slider
                    id="base-unit"
                    min={2}
                    max={10}
                    step={1}
                    value={[spacingConfig.unit]}
                    onValueChange={(value) => handleBaseUnitChange(value[0])}
                    className="py-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    La unidad base es el valor fundamental para calcular todos los espaciados.
                  </p>
                </div>
                
                <Separator />
                
                <h3 className="font-medium">Escala de Espaciado</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ajusta los multiplicadores para cada nivel de espaciado.
                </p>
                
                <div className="space-y-6">
                  {Object.entries(spacingConfig.scale).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center mb-1">
                        <Label htmlFor={`scale-${key}`}>
                          <span className="capitalize">{key}</span>
                          <span className="text-muted-foreground ml-2">
                            ({getPixels(value)})
                          </span>
                        </Label>
                        <span className="text-sm font-mono">{value}x</span>
                      </div>
                      <Slider
                        id={`scale-${key}`}
                        min={0}
                        max={key === 'xs' ? 1 : key === 'sm' ? 2 : key === 'md' ? 3 : key === 'lg' ? 4 : key === 'xl' ? 5 : 6}
                        step={0.125}
                        value={[value]}
                        onValueChange={(val) => handleScaleChange(key as keyof typeof spacingConfig.scale, val[0])}
                        className="py-2"
                      />
                      <div className="flex items-center mt-1">
                        <div 
                          className="bg-primary/20 border border-primary/40"
                          style={{ 
                            width: getPixels(value), 
                            height: '20px'
                          }}
                        ></div>
                        <span className="text-xs ml-2 text-muted-foreground">
                          {getPixels(value)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="radius">
          <Card>
            <CardHeader>
              <CardTitle>Radio de Bordes</CardTitle>
              <CardDescription>
                Configura el radio de las esquinas redondeadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="border-radius">Radio de Bordes</Label>
                    <span className="text-sm font-mono">{spacingConfig.borderRadius}</span>
                  </div>
                  <Input
                    id="border-radius"
                    value={spacingConfig.borderRadius}
                    onChange={(e) => handleBorderRadiusChange(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Utiliza unidades CSS (px, rem, etc). Ejemplo: 0.5rem
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Ajustes Rápidos</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('0')}
                      size="sm"
                    >
                      Sin redondeo
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('0.25rem')}
                      size="sm"
                    >
                      Sutil (0.25rem)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('0.5rem')}
                      size="sm"
                    >
                      Medio (0.5rem)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('0.75rem')}
                      size="sm"
                    >
                      Amplio (0.75rem)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('1rem')}
                      size="sm"
                    >
                      Grande (1rem)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleBorderRadiusChange('9999px')}
                      size="sm"
                    >
                      Redondeado
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Vista Previa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Botón</p>
                      <Button
                        style={{ 
                          borderRadius: spacingConfig.borderRadius
                        }}
                      >
                        Botón de Ejemplo
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Tarjeta</p>
                      <div 
                        className="border bg-muted p-4 flex items-center justify-center"
                        style={{ 
                          borderRadius: spacingConfig.borderRadius
                        }}
                      >
                        Tarjeta
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Input</p>
                      <Input
                        placeholder="Campo de texto"
                        style={{ 
                          borderRadius: spacingConfig.borderRadius
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Badge</p>
                      <div 
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        style={{ 
                          borderRadius: spacingConfig.borderRadius
                        }}
                      >
                        Badge
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="presets">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden">
              <div className="p-2 border-b bg-muted/50">
                <h3 className="text-center font-medium">Compacto</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-full flex justify-center gap-2">
                      <Button size="sm">Botón 1</Button>
                      <Button size="sm" variant="outline">Botón 2</Button>
                    </div>
                    <div className="border rounded-md w-full p-2 bg-muted/50">
                      Espacio reducido
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>XS</span>
                      <span>0.125x (0.5px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SM</span>
                      <span>0.25x (1px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Radio</span>
                      <span>0.25rem</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => applySpacingPreset('compact')}
                  >
                    Aplicar Estilo Compacto
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="p-2 border-b bg-primary/10">
                <h3 className="text-center font-medium">Moderado</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-full flex justify-center gap-3">
                      <Button>Botón 1</Button>
                      <Button variant="outline">Botón 2</Button>
                    </div>
                    <div className="border rounded-md w-full p-4 bg-muted/50">
                      Espacio equilibrado
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>XS</span>
                      <span>0.25x (1px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SM</span>
                      <span>0.5x (2px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Radio</span>
                      <span>0.5rem</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => applySpacingPreset('moderate')}
                  >
                    Aplicar Estilo Moderado
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="p-2 border-b bg-muted/50">
                <h3 className="text-center font-medium">Amplio</h3>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-full flex justify-center gap-4">
                      <Button size="lg">Botón 1</Button>
                      <Button size="lg" variant="outline">Botón 2</Button>
                    </div>
                    <div className="border rounded-md w-full p-6 bg-muted/50">
                      Espacio generoso
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>XS</span>
                      <span>0.375x (1.5px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SM</span>
                      <span>0.75x (3px)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Radio</span>
                      <span>0.75rem</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => applySpacingPreset('spacious')}
                  >
                    Aplicar Estilo Amplio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa de Espaciado</CardTitle>
              <CardDescription>
                Previsualiza cómo se ven los diferentes espaciados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Espaciado en Elementos de Interfaz</h3>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Espaciado XS ({getPixels(spacingConfig.scale.xs)})</Label>
                      <div className="flex items-center gap-1" style={{ gap: getPixels(spacingConfig.scale.xs) }}>
                        <div className="bg-primary w-6 h-6 rounded-sm"></div>
                        <div className="bg-muted w-6 h-6 rounded-sm"></div>
                        <div className="bg-primary w-6 h-6 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Espaciado SM ({getPixels(spacingConfig.scale.sm)})</Label>
                      <div className="flex items-center gap-2" style={{ gap: getPixels(spacingConfig.scale.sm) }}>
                        <div className="bg-primary w-8 h-8 rounded-sm"></div>
                        <div className="bg-muted w-8 h-8 rounded-sm"></div>
                        <div className="bg-primary w-8 h-8 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Espaciado MD ({getPixels(spacingConfig.scale.md)})</Label>
                      <div className="flex items-center gap-3" style={{ gap: getPixels(spacingConfig.scale.md) }}>
                        <Button>Botón 1</Button>
                        <Button variant="outline">Botón 2</Button>
                        <Button variant="secondary">Botón 3</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Espaciado LG ({getPixels(spacingConfig.scale.lg)})</Label>
                      <div className="flex items-center gap-4" style={{ gap: getPixels(spacingConfig.scale.lg) }}>
                        <div className="bg-accent/20 w-12 h-12 rounded flex items-center justify-center">1</div>
                        <div className="bg-accent/20 w-12 h-12 rounded flex items-center justify-center">2</div>
                        <div className="bg-accent/20 w-12 h-12 rounded flex items-center justify-center">3</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Padding con Espaciado MD ({getPixels(spacingConfig.scale.md)})</Label>
                      <div 
                        className="border rounded bg-muted/20"
                        style={{ padding: getPixels(spacingConfig.scale.md) }}
                      >
                        Este contenedor tiene padding de {getPixels(spacingConfig.scale.md)}.
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Margin con Espaciado LG ({getPixels(spacingConfig.scale.lg)})</Label>
                      <div className="border rounded p-2">
                        <div 
                          className="bg-muted"
                          style={{ marginBottom: getPixels(spacingConfig.scale.lg) }}
                        >
                          Este elemento tiene un margen inferior de {getPixels(spacingConfig.scale.lg)}.
                        </div>
                        <div className="bg-muted">
                          Este elemento está separado del anterior.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Vista Previa de Radio de Bordes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div 
                        className="w-full aspect-square bg-primary/20 border mb-2"
                        style={{ borderRadius: spacingConfig.borderRadius }}
                      ></div>
                      <p className="text-sm text-center">{spacingConfig.borderRadius}</p>
                    </div>
                    
                    <div>
                      <Input 
                        placeholder="Campo de texto"
                        className="mb-2"
                        style={{ borderRadius: spacingConfig.borderRadius }}
                      />
                      <p className="text-sm text-center">Input</p>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline"
                        className="w-full mb-2"
                        style={{ borderRadius: spacingConfig.borderRadius }}
                      >
                        Botón
                      </Button>
                      <p className="text-sm text-center">Botón</p>
                    </div>
                    
                    <div>
                      <div 
                        className="w-full aspect-video bg-muted flex items-center justify-center border mb-2"
                        style={{ borderRadius: spacingConfig.borderRadius }}
                      >
                        Card
                      </div>
                      <p className="text-sm text-center">Tarjeta</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
