
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Palette,
  Type,
  Layers,
  Box,
  MoveHorizontal,
  Sparkles,
  ChevronRight,
  Moon,
  Sun,
  PanelLeft,
  Check,
  X
} from 'lucide-react';

const MaterialDesign: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [materialTheme, setMaterialTheme] = useState(false);
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleMaterialTheme = () => {
    if (materialTheme) {
      document.documentElement.classList.remove('material');
    } else {
      document.documentElement.classList.add('material');
    }
    setMaterialTheme(!materialTheme);
  };
  
  return (
    <div className="container mx-auto py-8 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Sistema de Diseño Material</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Estándar</span>
            <Switch checked={materialTheme} onCheckedChange={toggleMaterialTheme} />
            <span className="text-sm">Material</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Explora nuestro sistema de diseño basado en Material Design 3, con animaciones avanzadas y efectos visuales.
        </p>
      </div>
      
      <Tabs defaultValue="components" className="space-y-6">
        <div className="flex overflow-auto pb-2">
          <TabsList>
            <TabsTrigger value="components" className="flex items-center">
              <Box className="mr-2 h-4 w-4" />
              Componentes
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center">
              <Palette className="mr-2 h-4 w-4" />
              Colores
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center">
              <Type className="mr-2 h-4 w-4" />
              Tipografía
            </TabsTrigger>
            <TabsTrigger value="animations" className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              Animaciones
            </TabsTrigger>
            <TabsTrigger value="spacing" className="flex items-center">
              <MoveHorizontal className="mr-2 h-4 w-4" />
              Espaciado
            </TabsTrigger>
            <TabsTrigger value="elevation" className="flex items-center">
              <Layers className="mr-2 h-4 w-4" />
              Elevación
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Botones</CardTitle>
              <CardDescription>Diferentes variantes de botones según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Variantes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="filled">Filled</Button>
                  <Button variant="tonal">Tonal</Button>
                  <Button variant="outlinedMaterial">Outlined</Button>
                  <Button variant="text">Text</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Con iconos</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="filled">
                    <Check className="mr-2 h-4 w-4" />
                    Aceptar
                  </Button>
                  <Button variant="outlinedMaterial">
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button variant="tonal">
                    Siguiente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tamaños</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="filled" size="sm">Small</Button>
                  <Button variant="filled">Default</Button>
                  <Button variant="filled" size="lg">Large</Button>
                  <Button variant="filled" size="icon"><PanelLeft /></Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Interacciones</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="filled" className="md-hover-scale">Escala en Hover</Button>
                  <Button variant="tonal" className="md-hover-elevate">Elevación en Hover</Button>
                  <Button variant="filled" className="md-ripple-container">Con Efecto Ripple</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Formularios</CardTitle>
              <CardDescription>Componentes de entrada según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Ingresa tu nombre" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@nexo.com" />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Recibir notificaciones</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Diferentes estilos de badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Material</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md-card-elevated">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>Variantes de tarjetas según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md-card">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Card Básica</h3>
                    <p className="text-muted-foreground text-sm">Un contenedor versátil para mostrar contenido.</p>
                  </div>
                </div>
                
                <div className="md-card-elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Card Elevada</h3>
                    <p className="text-muted-foreground text-sm">Con sombra para mostrar elevación en la interfaz.</p>
                  </div>
                </div>
                
                <div className="md-card-outlined">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2">Card con Borde</h3>
                    <p className="text-muted-foreground text-sm">Con un borde sutil para delimitar el contenido.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center py-4">
            <Button variant="tonal" onClick={() => navigate('/design-system')} className="md-hover-scale">
              Ver catálogo completo
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paleta de Colores</CardTitle>
              <CardDescription>Colores principales y variaciones del sistema Material Design 3</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Colores Primarios</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-primary rounded-md"></div>
                      <p className="text-xs">Primary</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-primary/80 rounded-md"></div>
                      <p className="text-xs">Primary (80%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-primary/60 rounded-md"></div>
                      <p className="text-xs">Primary (60%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-primary/20 rounded-md"></div>
                      <p className="text-xs">Primary (20%)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Colores Secundarios</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-secondary rounded-md"></div>
                      <p className="text-xs">Secondary</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-secondary/80 rounded-md"></div>
                      <p className="text-xs">Secondary (80%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-secondary/60 rounded-md"></div>
                      <p className="text-xs">Secondary (60%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-secondary/20 rounded-md"></div>
                      <p className="text-xs">Secondary (20%)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Colores de Acento</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-accent rounded-md"></div>
                      <p className="text-xs">Accent</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-accent/80 rounded-md"></div>
                      <p className="text-xs">Accent (80%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-accent/60 rounded-md"></div>
                      <p className="text-xs">Accent (60%)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full bg-accent/20 rounded-md"></div>
                      <p className="text-xs">Accent (20%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipografía</CardTitle>
              <CardDescription>Sistema de tipografía según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Encabezados</h3>
                <div className="space-y-6">
                  <div>
                    <h1>Encabezado 1</h1>
                    <p className="text-xs text-muted-foreground">text-4xl / 5xl (móvil/desktop)</p>
                  </div>
                  <div>
                    <h2>Encabezado 2</h2>
                    <p className="text-xs text-muted-foreground">text-3xl / 4xl (móvil/desktop)</p>
                  </div>
                  <div>
                    <h3>Encabezado 3</h3>
                    <p className="text-xs text-muted-foreground">text-2xl / 3xl (móvil/desktop)</p>
                  </div>
                  <div>
                    <h4>Encabezado 4</h4>
                    <p className="text-xs text-muted-foreground">text-xl / 2xl (móvil/desktop)</p>
                  </div>
                  <div>
                    <h5>Encabezado 5</h5>
                    <p className="text-xs text-muted-foreground">text-lg / xl (móvil/desktop)</p>
                  </div>
                  <div>
                    <h6>Encabezado 6</h6>
                    <p className="text-xs text-muted-foreground">text-base / lg (móvil/desktop)</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Estilos de Texto</h3>
                <div className="space-y-4">
                  <div>
                    <p className="md-text-body">Texto de párrafo estándar</p>
                    <p className="text-xs text-muted-foreground">md-text-body</p>
                  </div>
                  <div>
                    <p className="md-text-body-small">Texto de párrafo pequeño</p>
                    <p className="text-xs text-muted-foreground">md-text-body-small</p>
                  </div>
                  <div>
                    <p className="md-text-caption">Texto de leyenda o caption</p>
                    <p className="text-xs text-muted-foreground">md-text-caption</p>
                  </div>
                  <div>
                    <p className="md-text-title">Texto de título</p>
                    <p className="text-xs text-muted-foreground">md-text-title</p>
                  </div>
                  <div>
                    <p className="md-text-title-small">Texto de título pequeño</p>
                    <p className="text-xs text-muted-foreground">md-text-title-small</p>
                  </div>
                  <div>
                    <p className="md-text-headline-small">Texto de encabezado pequeño</p>
                    <p className="text-xs text-muted-foreground">md-text-headline-small</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="animations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Animaciones y Transiciones</CardTitle>
              <CardDescription>Efectos visuales según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Animaciones Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="animate-fade-in bg-primary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Fade In</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">animate-fade-in</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="animate-scale-in bg-secondary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Scale In</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">animate-scale-in</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="animate-slide-in-right bg-accent/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Slide In</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">animate-slide-in-right</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Efectos Hover</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="md-hover-scale bg-primary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Hover me (Scale)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">md-hover-scale</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="md-hover-elevate bg-secondary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Hover me (Elevate)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">md-hover-elevate</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="story-link bg-accent/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Hover me (Underline)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">story-link</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Animaciones Continuas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="md-animate-pulse bg-primary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Pulse Animation</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">md-animate-pulse</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="md-animate-rotate bg-secondary/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">md-animate-rotate</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="md-shine bg-accent/20 p-6 rounded-md w-full h-32 flex items-center justify-center">
                      <span>Shine Effect</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">md-shine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="spacing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Espaciado</CardTitle>
              <CardDescription>Espaciado consistente según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Escala de Espaciado</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-4 w-4"></div>
                      <span className="ml-2 text-sm">4px - Espaciado Mínimo (1 unidad)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-8 w-8"></div>
                      <span className="ml-2 text-sm">8px - Espaciado Pequeño (2 unidades)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-16 w-16"></div>
                      <span className="ml-2 text-sm">16px - Espaciado Base (4 unidades)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-24 w-24"></div>
                      <span className="ml-2 text-sm">24px - Espaciado Medio (6 unidades)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-primary/20 h-32 w-32"></div>
                      <span className="ml-2 text-sm">32px - Espaciado Grande (8 unidades)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Aplicaciones del Espaciado</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-dashed rounded-md">
                      <p className="text-sm">Padding 4 (p-4): 16px de padding</p>
                    </div>
                    <div className="mt-4 border border-dashed rounded-md">
                      <p className="text-sm">Margin Top 4 (mt-4): 16px de margen superior</p>
                    </div>
                    <div className="flex space-x-4 border border-dashed rounded-md p-4">
                      <div className="w-8 h-8 bg-primary/20"></div>
                      <div className="w-8 h-8 bg-primary/40"></div>
                      <div className="w-8 h-8 bg-primary/60"></div>
                    </div>
                    <p className="text-sm">Gap 4 (space-x-4): 16px de separación entre elementos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="elevation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Elevación</CardTitle>
              <CardDescription>Niveles de elevación según Material Design 3</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="p-6 rounded-md md-elevation-1 bg-card">
                      <h3 className="text-lg font-medium">Nivel 1</h3>
                      <p className="text-sm text-muted-foreground">Elevación sutil</p>
                    </div>
                    <p className="text-xs text-muted-foreground">md-elevation-1</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-6 rounded-md md-elevation-2 bg-card">
                      <h3 className="text-lg font-medium">Nivel 2</h3>
                      <p className="text-sm text-muted-foreground">Elevación moderada</p>
                    </div>
                    <p className="text-xs text-muted-foreground">md-elevation-2</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-6 rounded-md md-elevation-3 bg-card">
                      <h3 className="text-lg font-medium">Nivel 3</h3>
                      <p className="text-sm text-muted-foreground">Elevación media</p>
                    </div>
                    <p className="text-xs text-muted-foreground">md-elevation-3</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-6 rounded-md md-elevation-4 bg-card">
                      <h3 className="text-lg font-medium">Nivel 4</h3>
                      <p className="text-sm text-muted-foreground">Elevación alta</p>
                    </div>
                    <p className="text-xs text-muted-foreground">md-elevation-4</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-6 rounded-md md-elevation-5 bg-card">
                      <h3 className="text-lg font-medium">Nivel 5</h3>
                      <p className="text-sm text-muted-foreground">Elevación máxima</p>
                    </div>
                    <p className="text-xs text-muted-foreground">md-elevation-5</p>
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

export default MaterialDesign;
