
import React, { useState } from 'react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Wand2, PenLine, Palette, Type, Maximize, Check, Copy, AlertTriangle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { generateDesignSuggestions } from '../../utils/aiDesignAssistant';
import { ThemeConfig } from '@/contexts/DesignSystemContext';

export const AIDesignAssistantTab: React.FC = () => {
  const { theme, previewTheme, saveTheme, isLoading } = useDesignSystem();
  
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [focus, setFocus] = useState<'overall' | 'colors' | 'typography' | 'spacing'>('overall');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<ThemeConfig> | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  
  // Predefined prompts for inspiration
  const predefinedPrompts = [
    {
      title: 'Moderno y Profesional',
      prompt: 'Crea un diseño moderno y profesional con tonos azules y morados, adecuado para una plataforma educativa empresarial.',
      focus: 'overall' as const,
    },
    {
      title: 'Minimalista',
      prompt: 'Diseña un tema minimalista con tipografía sans-serif, espacios amplios y colores neutros.',
      focus: 'overall' as const,
    },
    {
      title: 'Creativo y Vibrante',
      prompt: 'Genera un tema colorido y vibrante para una plataforma creativa, con gradientes y fuentes llamativas.',
      focus: 'colors' as const,
    },
    {
      title: 'Académico',
      prompt: 'Diseña tipografía para una plataforma educativa formal, con fuentes serif para encabezados y san-serif para el texto.',
      focus: 'typography' as const,
    },
    {
      title: 'Corporativo',
      prompt: 'Paleta de colores profesional y seria con tonos azules, grises y un acento distintivo.',
      focus: 'colors' as const,
    },
    {
      title: 'Amigable',
      prompt: 'Espaciado y bordes redondeados para un diseño amigable y accesible.',
      focus: 'spacing' as const,
    },
  ];
  
  const handleGenerateSuggestions = async () => {
    if (!prompt) {
      toast.error('Por favor, ingresa un prompt para generar sugerencias');
      return;
    }
    
    if (!apiKey) {
      toast.error('Se requiere una API key de OpenAI');
      return;
    }
    
    try {
      setIsGenerating(true);
      setSuggestions(null);
      
      const result = await generateDesignSuggestions({
        prompt,
        currentTheme: theme,
        focus
      }, apiKey);
      
      if (result) {
        setSuggestions(result);
        
        // Show a preview of the suggested theme
        if (focus === 'overall') {
          previewTheme({
            ...theme,
            ...(result as ThemeConfig)
          });
        } else if (focus === 'colors' && result.colors) {
          previewTheme({
            ...theme,
            colors: {
              ...theme.colors,
              ...result.colors
            }
          });
        } else if (focus === 'typography' && result.fonts) {
          previewTheme({
            ...theme,
            fonts: {
              ...theme.fonts,
              ...result.fonts
            }
          });
        } else if (focus === 'spacing') {
          let newTheme = { ...theme };
          
          if (result.spacing) {
            newTheme.spacing = {
              ...theme.spacing,
              ...result.spacing
            };
          }
          
          if (result.borderRadius) {
            newTheme.borderRadius = result.borderRadius;
          }
          
          previewTheme(newTheme);
        }
        
        toast.success('Sugerencias generadas y aplicadas en vista previa');
      } else {
        toast.error('No se pudieron generar sugerencias');
      }
    } catch (error) {
      console.error('Error generating design suggestions:', error);
      toast.error('Error al generar sugerencias: ' + (error as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleUseSuggestion = () => {
    if (!suggestions) return;
    
    let newTheme = { ...theme };
    
    if (focus === 'overall') {
      // Apply all suggestions
      newTheme = {
        ...theme,
        ...(suggestions as ThemeConfig)
      };
    } else if (focus === 'colors' && suggestions.colors) {
      newTheme.colors = {
        ...theme.colors,
        ...suggestions.colors
      };
    } else if (focus === 'typography' && suggestions.fonts) {
      newTheme.fonts = {
        ...theme.fonts,
        ...suggestions.fonts
      };
    } else if (focus === 'spacing') {
      if (suggestions.spacing) {
        newTheme.spacing = {
          ...theme.spacing,
          ...suggestions.spacing
        };
      }
      
      if (suggestions.borderRadius) {
        newTheme.borderRadius = suggestions.borderRadius;
      }
    }
    
    // Save the new theme
    saveTheme(newTheme);
    toast.success('Sugerencias aplicadas y guardadas');
  };
  
  const handleUsePrompt = (predefinedPrompt: typeof predefinedPrompts[0]) => {
    setPrompt(predefinedPrompt.prompt);
    setFocus(predefinedPrompt.focus);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            <span>Asistente de Diseño con IA</span>
          </CardTitle>
          <CardDescription>
            Genera sugerencias de diseño inteligentes basadas en tus preferencias
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showApiKeyInput && (
            <Alert variant="default" className="mb-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertTitle>Necesitas una API key de OpenAI</AlertTitle>
              <AlertDescription className="mt-2">
                <p className="mb-2">
                  Este asistente utiliza la API de OpenAI para generar sugerencias de diseño.
                  Tu API key no se almacena en el servidor y solo se usa para esta sesión.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key de OpenAI</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Puedes obtener una API key en 
                    <a 
                      href="https://platform.openai.com/api-keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary ml-1 hover:underline"
                    >
                      platform.openai.com/api-keys
                    </a>
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="prompt">¿Qué diseño estás buscando?</Label>
              {apiKey && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                >
                  {showApiKeyInput ? 'Ocultar API Key' : 'Mostrar API Key'}
                </Button>
              )}
            </div>
            <Textarea
              id="prompt"
              placeholder="Describe el diseño que estás buscando. Por ejemplo: 'Crea un diseño moderno y profesional con tonos azules y morados, adecuado para una plataforma educativa empresarial.'"
              className="min-h-24"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label>¿En qué aspecto quieres enfocarte?</Label>
            <RadioGroup 
              value={focus} 
              onValueChange={(value) => setFocus(value as any)}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="overall" id="overall" />
                <Label htmlFor="overall" className="flex items-center gap-1 cursor-pointer">
                  <Wand2 className="h-4 w-4 text-primary" />
                  Diseño Completo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="colors" id="colors" />
                <Label htmlFor="colors" className="flex items-center gap-1 cursor-pointer">
                  <Palette className="h-4 w-4 text-primary" />
                  Colores
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="typography" id="typography" />
                <Label htmlFor="typography" className="flex items-center gap-1 cursor-pointer">
                  <Type className="h-4 w-4 text-primary" />
                  Tipografía
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spacing" id="spacing" />
                <Label htmlFor="spacing" className="flex items-center gap-1 cursor-pointer">
                  <Maximize className="h-4 w-4 text-primary" />
                  Espaciado y Bordes
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleGenerateSuggestions} 
              disabled={isGenerating || !apiKey}
              className="gap-2 w-full"
            >
              <Wand2 className="h-4 w-4" />
              {isGenerating ? 'Generando...' : 'Generar Sugerencias de Diseño'}
            </Button>
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Prompts de Inspiración
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {predefinedPrompts.map((p, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-auto py-2 justify-start text-left"
                  onClick={() => handleUsePrompt(p)}
                >
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.prompt}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {suggestions && (
        <Card>
          <CardHeader>
            <CardTitle>Sugerencias de Diseño</CardTitle>
            <CardDescription>
              Sugerencias generadas por IA basadas en tu prompt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                <TabsTrigger value="json">JSON</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                <div className="space-y-6">
                  {suggestions.colors && (
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Palette className="h-4 w-4 text-primary" />
                        Colores Sugeridos
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {Object.entries(suggestions.colors).map(([key, color]) => (
                          <div 
                            key={key} 
                            className="flex items-center gap-2 border rounded-md p-2"
                            onClick={() => {
                              navigator.clipboard.writeText(color);
                              toast.success(`Color ${color} copiado`);
                            }}
                          >
                            <div 
                              className="w-6 h-6 rounded-md border" 
                              style={{ backgroundColor: color }}
                            ></div>
                            <div>
                              <div className="text-xs capitalize">{key}</div>
                              <div className="text-xs font-mono text-muted-foreground">{color}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {suggestions.fonts && (
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Type className="h-4 w-4 text-primary" />
                        Tipografía Sugerida
                      </h3>
                      <div className="space-y-2">
                        {suggestions.fonts.heading && (
                          <div className="border rounded-md p-3">
                            <div className="text-xs text-muted-foreground mb-1">Fuente para Encabezados:</div>
                            <div className="font-medium" style={{ fontFamily: suggestions.fonts.heading }}>
                              Ejemplo de Encabezado
                            </div>
                            <div className="text-xs font-mono text-muted-foreground mt-1">
                              {suggestions.fonts.heading}
                            </div>
                          </div>
                        )}
                        
                        {suggestions.fonts.body && (
                          <div className="border rounded-md p-3">
                            <div className="text-xs text-muted-foreground mb-1">Fuente para Texto:</div>
                            <div style={{ fontFamily: suggestions.fonts.body }}>
                              Ejemplo de texto para el cuerpo del contenido
                            </div>
                            <div className="text-xs font-mono text-muted-foreground mt-1">
                              {suggestions.fonts.body}
                            </div>
                          </div>
                        )}
                        
                        {suggestions.fonts.sizes && (
                          <div className="border rounded-md p-3">
                            <div className="text-xs text-muted-foreground mb-1">Tamaños de Fuente:</div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {Object.entries(suggestions.fonts.sizes).map(([key, size]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-xs capitalize">{key}:</span>
                                  <span className="text-xs font-mono">{size}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {suggestions.spacing && (
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Maximize className="h-4 w-4 text-primary" />
                        Espaciado Sugerido
                      </h3>
                      
                      {suggestions.spacing.unit && (
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <span>Unidad Base:</span>
                          <span className="font-mono">{suggestions.spacing.unit}px</span>
                        </div>
                      )}
                      
                      {suggestions.spacing.scale && (
                        <div className="border rounded-md p-3">
                          <div className="text-xs text-muted-foreground mb-2">Escalas de Espaciado:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(suggestions.spacing.scale).map(([key, scale]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-xs capitalize">{key}:</span>
                                <span className="text-xs font-mono">{scale}x</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {suggestions.borderRadius && (
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <span>Radio de Bordes:</span>
                        <span className="font-mono">{suggestions.borderRadius}</span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        <div 
                          className="w-12 h-12 bg-primary/20"
                          style={{ borderRadius: suggestions.borderRadius }}
                        ></div>
                        <Button 
                          className="h-12"
                          style={{ borderRadius: suggestions.borderRadius }}
                        >
                          Botón
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="json">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                    {JSON.stringify(suggestions, null, 2)}
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(suggestions, null, 2));
                      toast.success('JSON copiado al portapapeles');
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSuggestions(null)}
            >
              Descartar
            </Button>
            <Button 
              onClick={handleUseSuggestion}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Aplicar y Guardar
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
