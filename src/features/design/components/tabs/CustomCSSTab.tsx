
import React, { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, CopyCheck, Paintbrush, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const CustomCSSTab: React.FC = () => {
  const { theme, previewTheme, isLoading } = useDesignSystem();
  const [customCSS, setCustomCSS] = useState(theme.customCSS);
  
  const handleCSSChange = (value: string) => {
    setCustomCSS(value);
    
    // Update the theme preview
    previewTheme({
      ...theme,
      customCSS: value
    });
  };
  
  const applyCustomCSS = () => {
    previewTheme({
      ...theme,
      customCSS
    });
    
    toast.success('CSS personalizado aplicado');
  };
  
  const resetCSS = () => {
    setCustomCSS('');
    previewTheme({
      ...theme,
      customCSS: ''
    });
    
    toast.success('CSS personalizado eliminado');
  };
  
  // Example CSS snippets
  const cssSnippets = [
    {
      name: 'Sombras sutiles',
      description: 'Añade sombras sutiles a botones y tarjetas',
      code: `.card, .button {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out;
}

.card:hover, .button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}`,
    },
    {
      name: 'Efectos de hover',
      description: 'Mejora la interactividad con efectos de hover',
      code: `.interactive-element {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.interactive-element:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}`,
    },
    {
      name: 'Gradientes de fondo',
      description: 'Añade gradientes de color de fondo',
      code: `:root {
  --gradient-primary: linear-gradient(to right, var(--primary), color-mix(in srgb, var(--primary) 70%, var(--accent)));
}

.gradient-bg {
  background: var(--gradient-primary);
}`,
    },
    {
      name: 'Animaciones',
      description: 'Añade animaciones personalizadas',
      code: `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}`,
    },
  ];
  
  return (
    <Tabs defaultValue="editor">
      <TabsList className="mb-4">
        <TabsTrigger value="editor">Editor CSS</TabsTrigger>
        <TabsTrigger value="snippets">Fragmentos</TabsTrigger>
        <TabsTrigger value="variables">Variables CSS</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <span>Editor de CSS Personalizado</span>
            </CardTitle>
            <CardDescription>
              Añade reglas CSS personalizadas para personalizar el diseño
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="border rounded-md">
                <div className="flex items-center justify-between bg-muted p-2 border-b">
                  <span className="text-sm font-medium">custom-styles.css</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetCSS}
                      className="h-7 px-2 text-xs"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Reset
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={applyCustomCSS}
                      className="h-7 px-2 text-xs"
                    >
                      <Paintbrush className="h-3.5 w-3.5 mr-1" />
                      Aplicar
                    </Button>
                  </div>
                </div>
                <textarea
                  value={customCSS}
                  onChange={(e) => handleCSSChange(e.target.value)}
                  className="font-mono text-sm p-4 w-full h-80 resize-none outline-none"
                  placeholder="/* Añade tu CSS personalizado aquí */

/* Ejemplo:
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
*/
"
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={resetCSS}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Restablecer CSS
              </Button>
              <Button
                onClick={applyCustomCSS}
                className="gap-2"
              >
                <Paintbrush className="h-4 w-4" />
                Aplicar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="snippets">
        <Card>
          <CardHeader>
            <CardTitle>Fragmentos de CSS</CardTitle>
            <CardDescription>
              Fragmentos de CSS reutilizables para mejorar el diseño
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cssSnippets.map((snippet, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-4 bg-muted/50">
                    <CardTitle className="text-base">{snippet.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {snippet.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative">
                      <pre className="text-xs p-4 font-mono bg-muted/10 overflow-x-auto">
                        {snippet.code}
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 bg-background/80 hover:bg-background"
                        onClick={() => {
                          // Append the snippet to the current CSS
                          const newCSS = customCSS 
                            ? `${customCSS}\n\n/* ${snippet.name} */\n${snippet.code}`
                            : `/* ${snippet.name} */\n${snippet.code}`;
                          
                          handleCSSChange(newCSS);
                          toast.success('Fragmento añadido al editor');
                        }}
                      >
                        <CopyCheck className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="p-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          // Apply just this snippet
                          handleCSSChange(snippet.code);
                          applyCustomCSS();
                          toast.success(`Fragmento "${snippet.name}" aplicado`);
                        }}
                      >
                        Aplicar Solo Este Fragmento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="variables">
        <Card>
          <CardHeader>
            <CardTitle>Variables CSS Disponibles</CardTitle>
            <CardDescription>
              Variables CSS que puedes usar en tu código personalizado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium">Colores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                      <code className="text-sm font-mono">--primary</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
                      <code className="text-sm font-mono">--secondary</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                      <code className="text-sm font-mono">--accent</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.colors.background }}></div>
                      <code className="text-sm font-mono">--background</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.foreground }}></div>
                      <code className="text-sm font-mono">--foreground</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.muted }}></div>
                      <code className="text-sm font-mono">--muted</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.border }}></div>
                      <code className="text-sm font-mono">--border</code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Tipografía</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <code className="text-sm font-mono">--font-heading</code>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{theme.fonts.heading}</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--font-body</code>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{theme.fonts.body}</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--font-mono</code>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{theme.fonts.mono}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <code className="text-sm font-mono">--font-size-base</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.fonts.sizes.base}</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--font-size-sm</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.fonts.sizes.sm}</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--font-size-lg</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.fonts.sizes.lg}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Espaciado</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <code className="text-sm font-mono">--spacing-unit</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--spacing-xs</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale.xs * theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--spacing-sm</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale.sm * theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--spacing-md</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale.md * theme.spacing.unit}px</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <code className="text-sm font-mono">--spacing-lg</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale.lg * theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--spacing-xl</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale.xl * theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--spacing-2xl</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.spacing.scale['2xl'] * theme.spacing.unit}px</p>
                    </div>
                    <div>
                      <code className="text-sm font-mono">--radius</code>
                      <p className="text-xs text-muted-foreground mt-1">{theme.borderRadius}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Ejemplo de Uso</h3>
                <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
{`.custom-button {
  background-color: var(--primary);
  color: white;
  padding: calc(var(--spacing-unit) * var(--spacing-scale-md));
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
}

.custom-button:hover {
  background-color: color-mix(in srgb, var(--primary) 80%, black);
  transform: translateY(-2px);
}`}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`.custom-button {
  background-color: var(--primary);
  color: white;
  padding: calc(var(--spacing-unit) * var(--spacing-scale-md));
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
}

.custom-button:hover {
  background-color: color-mix(in srgb, var(--primary) 80%, black);
  transform: translateY(-2px);
}`);
                    toast.success('Ejemplo copiado al portapapeles');
                  }}
                  className="mt-2"
                >
                  Copiar Ejemplo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
