
import React, { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Type, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

// Common web-safe font families
const fontFamilies = [
  { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Source Sans Pro, sans-serif', label: 'Source Sans Pro' },
  { value: 'Merriweather, serif', label: 'Merriweather' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Consolas, monospace', label: 'Consolas' },
];

// Font combinations (paired heading and body fonts)
const fontCombinations = [
  { 
    name: 'Moderno',
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'Consolas, monospace'
  },
  { 
    name: 'Clásico',
    heading: 'Merriweather, serif',
    body: 'Georgia, serif',
    mono: 'Courier New, monospace'
  },
  { 
    name: 'Profesional',
    heading: 'Montserrat, sans-serif',
    body: 'Open Sans, sans-serif',
    mono: 'Consolas, monospace'
  },
  { 
    name: 'Elegante',
    heading: 'Playfair Display, serif',
    body: 'Source Sans Pro, sans-serif',
    mono: 'Consolas, monospace'
  },
  { 
    name: 'Minimalista',
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
    mono: 'Consolas, monospace'
  },
];

export const TypographyTab: React.FC = () => {
  const { theme, previewTheme, isLoading } = useDesignSystem();
  const [fontConfig, setFontConfig] = useState({ ...theme.fonts });
  
  const handleFontFamilyChange = (
    type: 'heading' | 'body' | 'mono',
    value: string
  ) => {
    const newFontConfig = { ...fontConfig, [type]: value };
    setFontConfig(newFontConfig);
    
    previewTheme({
      ...theme,
      fonts: newFontConfig
    });
  };
  
  const handleFontSizeChange = (
    size: keyof typeof fontConfig.sizes,
    value: string
  ) => {
    const newSizes = { ...fontConfig.sizes, [size]: value };
    const newFontConfig = { ...fontConfig, sizes: newSizes };
    
    setFontConfig(newFontConfig);
    previewTheme({
      ...theme,
      fonts: newFontConfig
    });
  };
  
  const applyFontCombination = (combination: typeof fontCombinations[0]) => {
    const newFontConfig = {
      ...fontConfig,
      heading: combination.heading,
      body: combination.body,
      mono: combination.mono
    };
    
    setFontConfig(newFontConfig);
    previewTheme({
      ...theme,
      fonts: newFontConfig
    });
    
    toast.success(`Combinación de fuentes "${combination.name}" aplicada`);
  };
  
  // Helper to extract primary font name from font stack for display
  const getPrimaryFontName = (fontStack: string) => {
    return fontStack.split(',')[0].trim();
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="font-families">
        <TabsList className="mb-4">
          <TabsTrigger value="font-families">Familia de Fuentes</TabsTrigger>
          <TabsTrigger value="font-sizes">Tamaños</TabsTrigger>
          <TabsTrigger value="combinations">Combinaciones</TabsTrigger>
          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="font-families">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Familias de Fuentes</CardTitle>
                <CardDescription>
                  Selecciona las familias de fuentes para diferentes elementos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="heading-font">Fuente para Encabezados</Label>
                  <Select 
                    value={fontConfig.heading}
                    onValueChange={(value) => handleFontFamilyChange('heading', value)}
                  >
                    <SelectTrigger id="heading-font">
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem 
                          key={font.value} 
                          value={font.value}
                          style={{ fontFamily: font.value }}
                        >
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div 
                    className="border rounded-md p-4 mt-2"
                    style={{ fontFamily: fontConfig.heading }}
                  >
                    <h3 className="text-xl font-semibold mb-1">Encabezado de muestra</h3>
                    <p className="text-muted-foreground text-sm">
                      {getPrimaryFontName(fontConfig.heading)}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label htmlFor="body-font">Fuente para Texto</Label>
                  <Select 
                    value={fontConfig.body}
                    onValueChange={(value) => handleFontFamilyChange('body', value)}
                  >
                    <SelectTrigger id="body-font">
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem 
                          key={font.value} 
                          value={font.value}
                          style={{ fontFamily: font.value }}
                        >
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div 
                    className="border rounded-md p-4 mt-2"
                    style={{ fontFamily: fontConfig.body }}
                  >
                    <p className="mb-1">Este es un párrafo de muestra para ver cómo se ve el texto normal.</p>
                    <p className="text-muted-foreground text-sm">
                      {getPrimaryFontName(fontConfig.body)}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label htmlFor="mono-font">Fuente Monoespaciada</Label>
                  <Select 
                    value={fontConfig.mono}
                    onValueChange={(value) => handleFontFamilyChange('mono', value)}
                  >
                    <SelectTrigger id="mono-font">
                      <SelectValue placeholder="Seleccionar fuente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consolas, monospace">Consolas</SelectItem>
                      <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div 
                    className="border rounded-md p-4 mt-2 bg-muted"
                    style={{ fontFamily: fontConfig.mono }}
                  >
                    <code className="mb-1">const example = "Código de muestra";</code>
                    <p className="text-muted-foreground text-sm mt-2">
                      {getPrimaryFontName(fontConfig.mono)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    <span>Google Fonts</span>
                  </div>
                </CardTitle>
                <CardDescription>
                  Instrucciones para usar fuentes de Google
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Paso 1: Añadir enlace a Google Fonts</h3>
                  <p className="text-sm text-muted-foreground">
                    Añade el siguiente enlace en el &lt;head&gt; de tu HTML:
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-x-auto">
                    &lt;link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"&gt;
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Paso 2: Usa las fuentes en tu configuración</h3>
                  <p className="text-sm text-muted-foreground">
                    Selecciona las fuentes de Google en los menús desplegables anteriores.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Fuentes Populares de Google</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => handleFontFamilyChange('heading', 'Poppins, sans-serif')}
                    >
                      <div className="text-left">
                        <p className="font-medium">Poppins</p>
                        <p className="text-xs text-muted-foreground">Sans-serif moderna</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => handleFontFamilyChange('heading', 'Montserrat, sans-serif')}
                    >
                      <div className="text-left">
                        <p className="font-medium">Montserrat</p>
                        <p className="text-xs text-muted-foreground">Sans-serif elegante</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => handleFontFamilyChange('heading', 'Playfair Display, serif')}
                    >
                      <div className="text-left">
                        <p className="font-medium">Playfair Display</p>
                        <p className="text-xs text-muted-foreground">Serif clásica</p>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="justify-start h-auto py-3"
                      onClick={() => handleFontFamilyChange('heading', 'Roboto, sans-serif')}
                    >
                      <div className="text-left">
                        <p className="font-medium">Roboto</p>
                        <p className="text-xs text-muted-foreground">Sans-serif versátil</p>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="font-sizes">
          <Card>
            <CardHeader>
              <CardTitle>Tamaños de Fuente</CardTitle>
              <CardDescription>
                Configura los tamaños de texto para diferentes elementos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="base-size">Tamaño Base</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes.base}
                      </span>
                    </div>
                    <Input 
                      id="base-size"
                      type="text"
                      value={fontConfig.sizes.base}
                      onChange={(e) => handleFontSizeChange('base', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2"
                      style={{ fontSize: fontConfig.sizes.base }}
                    >
                      Texto de muestra
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="sm-size">Tamaño Pequeño (sm)</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes.sm}
                      </span>
                    </div>
                    <Input 
                      id="sm-size"
                      type="text"
                      value={fontConfig.sizes.sm}
                      onChange={(e) => handleFontSizeChange('sm', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2 text-muted-foreground"
                      style={{ fontSize: fontConfig.sizes.sm }}
                    >
                      Texto pequeño de muestra
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="md-size">Tamaño Medio (md)</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes.md}
                      </span>
                    </div>
                    <Input 
                      id="md-size"
                      type="text"
                      value={fontConfig.sizes.md}
                      onChange={(e) => handleFontSizeChange('md', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2"
                      style={{ fontSize: fontConfig.sizes.md }}
                    >
                      Texto medio de muestra
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="lg-size">Tamaño Grande (lg)</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes.lg}
                      </span>
                    </div>
                    <Input 
                      id="lg-size"
                      type="text"
                      value={fontConfig.sizes.lg}
                      onChange={(e) => handleFontSizeChange('lg', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2 font-medium"
                      style={{ fontSize: fontConfig.sizes.lg }}
                    >
                      Texto grande de muestra
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="xl-size">Tamaño Extra Grande (xl)</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes.xl}
                      </span>
                    </div>
                    <Input 
                      id="xl-size"
                      type="text"
                      value={fontConfig.sizes.xl}
                      onChange={(e) => handleFontSizeChange('xl', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2 font-medium"
                      style={{ fontSize: fontConfig.sizes.xl }}
                    >
                      Título XL de muestra
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label htmlFor="2xl-size">Tamaño 2XL</Label>
                      <span className="text-sm text-muted-foreground">
                        {fontConfig.sizes['2xl']}
                      </span>
                    </div>
                    <Input 
                      id="2xl-size"
                      type="text"
                      value={fontConfig.sizes['2xl']}
                      onChange={(e) => handleFontSizeChange('2xl', e.target.value)}
                    />
                    <p 
                      className="mt-2 border rounded-md p-2 font-semibold"
                      style={{ fontSize: fontConfig.sizes['2xl'] }}
                    >
                      Título 2XL
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    // Reset to typical scale
                    const newSizes = {
                      base: '16px',
                      sm: '14px',
                      md: '16px',
                      lg: '18px',
                      xl: '20px',
                      '2xl': '24px',
                    };
                    
                    const newFontConfig = { ...fontConfig, sizes: newSizes };
                    setFontConfig(newFontConfig);
                    
                    previewTheme({
                      ...theme,
                      fonts: newFontConfig
                    });
                    
                    toast.success('Tamaños de fuente restablecidos');
                  }}
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Restablecer Tamaños
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="combinations">
          <Card>
            <CardHeader>
              <CardTitle>Combinaciones de Fuentes</CardTitle>
              <CardDescription>
                Pares de fuentes recomendados para encabezados y textos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fontCombinations.map((combo) => (
                  <Card key={combo.name} className="overflow-hidden">
                    <div className="p-4 border-b bg-muted/50">
                      <h3 
                        className="text-xl font-semibold mb-2"
                        style={{ fontFamily: combo.heading }}
                      >
                        {combo.name}
                      </h3>
                      <p className="text-sm" style={{ fontFamily: combo.body }}>
                        Muestra de texto en {getPrimaryFontName(combo.body)}
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2 mb-4">
                        <span className="text-xs text-muted-foreground">Encabezado:</span>
                        <p className="font-medium truncate">{getPrimaryFontName(combo.heading)}</p>
                        
                        <span className="text-xs text-muted-foreground">Texto:</span>
                        <p className="font-medium truncate">{getPrimaryFontName(combo.body)}</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => applyFontCombination(combo)}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa de Tipografía</CardTitle>
              <CardDescription>
                Previsualización de la configuración tipográfica
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h1 
                  className="text-4xl font-bold tracking-tight"
                  style={{ fontFamily: fontConfig.heading }}
                >
                  Título Principal
                </h1>
                
                <h2 
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: fontConfig.heading }}
                >
                  Subtítulo Principal
                </h2>
                
                <h3 
                  className="text-xl font-semibold"
                  style={{ fontFamily: fontConfig.heading }}
                >
                  Encabezado de Sección
                </h3>
                
                <h4 
                  className="text-lg font-medium"
                  style={{ fontFamily: fontConfig.heading }}
                >
                  Encabezado Secundario
                </h4>
              </div>
              
              <Separator />
              
              <div className="space-y-4" style={{ fontFamily: fontConfig.body }}>
                <p className="leading-7">
                  Este es un párrafo de ejemplo que muestra cómo se ve el texto normal en el cuerpo del documento.
                  La tipografía es un elemento crucial en el diseño web, ya que afecta directamente la legibilidad
                  y la experiencia del usuario. Una buena selección de fuentes puede mejorar significativamente
                  la comunicación y la estética de tu sitio.
                </p>
                
                <p className="text-sm text-muted-foreground">
                  Este es un texto secundario más pequeño que normalmente se utiliza para información adicional
                  o descripciones. Es importante que este texto también sea legible.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge>Etiqueta Normal</Badge>
                  <Badge variant="secondary">Etiqueta Secundaria</Badge>
                  <Badge variant="outline">Etiqueta Outline</Badge>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <code style={{ fontFamily: fontConfig.mono }}>
                    // Ejemplo de código<br />
                    function ejemploFuncion() &#123;<br />
                    &nbsp;&nbsp;console.log("Hola mundo");<br />
                    &#125;
                  </code>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Escalas de Texto</h3>
                <div className="space-y-3 border rounded-md p-4">
                  <p style={{ fontSize: fontConfig.sizes.sm }}>
                    Texto pequeño (sm): {fontConfig.sizes.sm}
                  </p>
                  <p style={{ fontSize: fontConfig.sizes.base }}>
                    Texto base: {fontConfig.sizes.base}
                  </p>
                  <p style={{ fontSize: fontConfig.sizes.md }}>
                    Texto medio (md): {fontConfig.sizes.md}
                  </p>
                  <p style={{ fontSize: fontConfig.sizes.lg }}>
                    Texto grande (lg): {fontConfig.sizes.lg}
                  </p>
                  <p 
                    style={{ fontSize: fontConfig.sizes.xl, fontFamily: fontConfig.heading }}
                    className="font-medium"
                  >
                    Título XL: {fontConfig.sizes.xl}
                  </p>
                  <p 
                    style={{ fontSize: fontConfig.sizes['2xl'], fontFamily: fontConfig.heading }}
                    className="font-semibold"
                  >
                    Título 2XL: {fontConfig.sizes['2xl']}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
