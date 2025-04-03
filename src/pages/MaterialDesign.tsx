
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Home, 
  Settings, 
  Star, 
  List, 
  Grid, 
  User, 
  Mail, 
  Bell, 
  Calendar, 
  Layers, 
  Search,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const MaterialDesign: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | 'material'>('light');
  const [isCopied, setIsCopied] = useState<Record<string, boolean>>({});
  
  // Función para cambiar el tema
  const changeTheme = (theme: 'light' | 'dark' | 'material') => {
    // Eliminar todas las clases de tema
    document.documentElement.classList.remove('light', 'dark', 'material');
    // Añadir la clase del tema seleccionado
    document.documentElement.classList.add(theme);
    // Actualizar el estado
    setActiveTheme(theme);
    // Mostrar toast de confirmación
    toast.success(`Tema ${theme} aplicado`);
  };
  
  // Función para copiar al portapapeles
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied({...isCopied, [id]: true});
      setTimeout(() => {
        setIsCopied({...isCopied, [id]: false});
      }, 2000);
      toast.success('Código copiado al portapapeles');
    });
  };
  
  return (
    <div className="container mx-auto max-w-7xl py-10 md-animate-fade">
      <div className="flex flex-col space-y-6">
        <header className="flex flex-col space-y-4 md:space-y-6">
          <div className="flex items-center space-x-2 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary">Inicio</a>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">Material Design System</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl md-animate-slide-up" style={{animationDelay: '0.1s'}}>
                Material Design System
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl md-animate-slide-up" style={{animationDelay: '0.2s'}}>
                Catálogo interactivo de componentes basados en Material Design 3, con animaciones modernas y microinteracciones.
              </p>
            </div>
            
            <div className="flex space-x-2 md-animate-slide-up" style={{animationDelay: '0.3s'}}>
              <Button 
                className={`${activeTheme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => changeTheme('light')}
              >
                Claro
              </Button>
              <Button 
                className={`${activeTheme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => changeTheme('dark')}
              >
                Oscuro
              </Button>
              <Button 
                className={`${activeTheme === 'material' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                onClick={() => changeTheme('material')}
              >
                Material
              </Button>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="overview" className="md-animate-fade" style={{animationDelay: '0.4s'}}>
          <TabsList className="md:w-full mb-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="colors">Colores</TabsTrigger>
            <TabsTrigger value="typography">Tipografía</TabsTrigger>
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="animations">Animaciones</TabsTrigger>
          </TabsList>
          
          {/* Vista General */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="md-card-elevated md-hover-elevate">
              <CardHeader>
                <CardTitle>Introducción a Material Design 3</CardTitle>
                <CardDescription>Sistema de diseño moderno con enfoque en expresión, personalización y accesibilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Principios Clave</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Diseño que prioriza la experiencia del usuario</li>
                      <li>Personalización y adaptabilidad</li>
                      <li>Accesibilidad y usabilidad para todos</li>
                      <li>Interacciones significativas y coherentes</li>
                      <li>Diseño multiplataforma</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Características</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Sistema dinámico de color</li>
                      <li>Tipografía expresiva</li>
                      <li>Elevación y sombras</li>
                      <li>Animaciones y transiciones fluidas</li>
                      <li>Componentes adaptativos</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md-card-filled md-hover-scale">
                <CardHeader>
                  <CardTitle>Colores Dinámicos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Esquemas de color armoniosos que se adaptan a la plataforma y preferencias del usuario, con soporte para temas claros y oscuros.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="md-card-filled md-hover-scale">
                <CardHeader>
                  <CardTitle>Tipografía</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sistema tipográfico flexible que se adapta a diferentes tamaños de pantalla y contextos de uso.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="md-card-filled md-hover-scale">
                <CardHeader>
                  <CardTitle>Animaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transiciones fluidas y animaciones significativas que mejoran la experiencia del usuario y guían la navegación.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Colores */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paleta de Colores</CardTitle>
                <CardDescription>Esquema de colores basado en Material Design 3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Colores Primarios</h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary"></div>
                          <span>Primary</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-primary', 'primary')}
                        >
                          {isCopied['primary'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary-foreground"></div>
                          <span>Primary Foreground</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-primary-foreground', 'primary-foreground')}
                        >
                          {isCopied['primary-foreground'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-secondary"></div>
                          <span>Secondary</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-secondary', 'secondary')}
                        >
                          {isCopied['secondary'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-accent"></div>
                          <span>Accent</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-accent', 'accent')}
                        >
                          {isCopied['accent'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Colores de Superficie</h3>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-background border border-border"></div>
                          <span>Background</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-background', 'background')}
                        >
                          {isCopied['background'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-card border border-border"></div>
                          <span>Card</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-card', 'card')}
                        >
                          {isCopied['card'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-muted"></div>
                          <span>Muted</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('bg-muted', 'muted')}
                        >
                          {isCopied['muted'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full border border-border"></div>
                          <span>Border</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0" 
                          onClick={() => copyToClipboard('border-border', 'border')}
                        >
                          {isCopied['border'] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Elevación y Sombras</CardTitle>
                <CardDescription>Sistema de elevación para crear profundidad visual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="md-elevation-1 h-24 w-full rounded-lg mb-3"></div>
                    <span className="text-sm font-medium">Elevación 1</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="mt-1" 
                      onClick={() => copyToClipboard('md-elevation-1', 'md-elevation-1')}
                    >
                      {isCopied['md-elevation-1'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      Copiar
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="md-elevation-2 h-24 w-full rounded-lg mb-3"></div>
                    <span className="text-sm font-medium">Elevación 2</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="mt-1" 
                      onClick={() => copyToClipboard('md-elevation-2', 'md-elevation-2')}
                    >
                      {isCopied['md-elevation-2'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      Copiar
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="md-elevation-3 h-24 w-full rounded-lg mb-3"></div>
                    <span className="text-sm font-medium">Elevación 3</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="mt-1" 
                      onClick={() => copyToClipboard('md-elevation-3', 'md-elevation-3')}
                    >
                      {isCopied['md-elevation-3'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      Copiar
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="md-elevation-4 h-24 w-full rounded-lg mb-3"></div>
                    <span className="text-sm font-medium">Elevación 4</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="mt-1" 
                      onClick={() => copyToClipboard('md-elevation-4', 'md-elevation-4')}
                    >
                      {isCopied['md-elevation-4'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      Copiar
                    </Button>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="md-elevation-5 h-24 w-full rounded-lg mb-3"></div>
                    <span className="text-sm font-medium">Elevación 5</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="mt-1" 
                      onClick={() => copyToClipboard('md-elevation-5', 'md-elevation-5')}
                    >
                      {isCopied['md-elevation-5'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                      Copiar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tipografía */}
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Escala Tipográfica</CardTitle>
                <CardDescription>Sistema tipográfico basado en Material Design 3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h1>Headline 1 - Material Design</h1>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-4xl md:text-5xl font-normal tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-4xl md:text-5xl font-normal tracking-tight leading-tight', 'h1')}
                      >
                        {isCopied['h1'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h2>Headline 2 - Material Design</h2>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-3xl md:text-4xl font-normal tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-3xl md:text-4xl font-normal tracking-tight leading-tight', 'h2')}
                      >
                        {isCopied['h2'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3>Headline 3 - Material Design</h3>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-2xl md:text-3xl font-normal tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-2xl md:text-3xl font-normal tracking-tight leading-tight', 'h3')}
                      >
                        {isCopied['h3'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4>Headline 4 - Material Design</h4>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-xl md:text-2xl font-normal tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-xl md:text-2xl font-normal tracking-tight leading-tight', 'h4')}
                      >
                        {isCopied['h4'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h5>Headline 5 - Material Design</h5>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-lg md:text-xl font-medium tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-lg md:text-xl font-medium tracking-tight leading-tight', 'h5')}
                      >
                        {isCopied['h5'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h6>Headline 6 - Material Design</h6>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>text-base md:text-lg font-medium tracking-tight leading-tight</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('text-base md:text-lg font-medium tracking-tight leading-tight', 'h6')}
                      >
                        {isCopied['h6'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="md-text-body">Párrafo con clase md-text-body - Texto de ejemplo para mostrar el estilo de párrafo estándar en Material Design.</p>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>md-text-body</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-text-body', 'body')}
                      >
                        {isCopied['body'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="md-text-body-small">Párrafo pequeño con clase md-text-body-small - Texto de ejemplo para mostrar el estilo de párrafo pequeño en Material Design.</p>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>md-text-body-small</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-text-body-small', 'body-small')}
                      >
                        {isCopied['body-small'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="md-text-caption">Texto caption con clase md-text-caption - Texto de ejemplo para mostrar el estilo de caption en Material Design.</p>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>md-text-caption</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-text-caption', 'caption')}
                      >
                        {isCopied['caption'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Componentes */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Botones</CardTitle>
                <CardDescription>Variantes de botones en Material Design 3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Botones Estándar</h3>
                      <div className="flex flex-wrap gap-4">
                        <button className="md-btn-filled">Filled</button>
                        <button className="md-btn-tonal">Tonal</button>
                        <button className="md-btn-outlined">Outlined</button>
                        <button className="md-btn-text">Text</button>
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<button className="md-btn-filled">Filled</button>', 'button-filled')}
                        >
                          {isCopied['button-filled'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Botones con Iconos</h3>
                      <div className="flex flex-wrap gap-4">
                        <button className="md-btn-filled">
                          <Star className="h-4 w-4 mr-2" />
                          Favorito
                        </button>
                        <button className="md-btn-tonal">
                          <Settings className="h-4 w-4 mr-2" />
                          Ajustes
                        </button>
                        <button className="md-btn-outlined">
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar
                        </button>
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<button className="md-btn-filled"><Star className="h-4 w-4 mr-2" />Favorito</button>', 'button-icon')}
                        >
                          {isCopied['button-icon'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Botones Animados</h3>
                      <div className="flex flex-wrap gap-4">
                        <button className="md-btn-filled md-animate-pulse">Pulse</button>
                        <button className="md-btn-tonal md-hover-scale">Scale on Hover</button>
                        <button className="md-btn-outlined md-hover-elevate">Elevate on Hover</button>
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<button className="md-btn-filled md-animate-pulse">Pulse</button>', 'button-animated')}
                        >
                          {isCopied['button-animated'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Botones FAB</h3>
                      <div className="relative h-48 border rounded-lg overflow-hidden">
                        <div className="p-4">Contenido de ejemplo</div>
                        <button className="md-fab bg-primary text-primary-foreground">
                          <Star className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<button className="md-fab bg-primary text-primary-foreground"><Star className="h-6 w-6" /></button>', 'button-fab')}
                        >
                          {isCopied['button-fab'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Interruptores (Switches)</h3>
                      <div className="flex flex-wrap gap-6 items-center">
                        <label className="md-switch">
                          <input type="checkbox" className="md-switch-input" />
                          <div className="md-switch-track">
                            <div className="md-switch-thumb"></div>
                          </div>
                        </label>
                        
                        <label className="md-switch">
                          <input type="checkbox" className="md-switch-input" defaultChecked />
                          <div className="md-switch-track">
                            <div className="md-switch-thumb"></div>
                          </div>
                          <span className="ml-2">Activado</span>
                        </label>
                      </div>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<label className="md-switch"><input type="checkbox" className="md-switch-input" /><div className="md-switch-track"><div className="md-switch-thumb"></div></div></label>', 'switch')}
                        >
                          {isCopied['switch'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cards y Contenedores</CardTitle>
                <CardDescription>Variantes de tarjetas en Material Design 3</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md-card-elevated p-6">
                    <h3 className="font-medium mb-2">Card Elevada</h3>
                    <p className="text-sm text-muted-foreground">
                      Tarjeta con elevación y sombra que se intensifica al hacer hover.
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-card-elevated', 'card-elevated')}
                      >
                        {isCopied['card-elevated'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md-card-outlined p-6">
                    <h3 className="font-medium mb-2">Card Outlined</h3>
                    <p className="text-sm text-muted-foreground">
                      Tarjeta con borde y sin elevación para un estilo más sutil.
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-card-outlined', 'card-outlined')}
                      >
                        {isCopied['card-outlined'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md-card-filled p-6">
                    <h3 className="font-medium mb-2">Card Filled</h3>
                    <p className="text-sm text-muted-foreground">
                      Tarjeta con fondo de color para mayor énfasis visual.
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-card-filled', 'card-filled')}
                      >
                        {isCopied['card-filled'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Chips y Badges</CardTitle>
                <CardDescription>Elementos informativos compactos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Chips</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="md-chip-filled">React</span>
                      <span className="md-chip-filled">TypeScript</span>
                      <span className="md-chip-outlined">Material Design</span>
                      <span className="md-chip-outlined">Tailwind CSS</span>
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('<span className="md-chip-filled">React</span>', 'chip')}
                      >
                        {isCopied['chip'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar código
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Navigation</h3>
                    <div className="md-bottom-nav border rounded-lg">
                      <a href="#" className="md-bottom-nav-item active">
                        <Home className="h-5 w-5" />
                        <span className="text-xs">Inicio</span>
                      </a>
                      <a href="#" className="md-bottom-nav-item">
                        <Search className="h-5 w-5" />
                        <span className="text-xs">Buscar</span>
                      </a>
                      <a href="#" className="md-bottom-nav-item">
                        <Bell className="h-5 w-5" />
                        <span className="text-xs">Notificaciones</span>
                      </a>
                      <a href="#" className="md-bottom-nav-item">
                        <User className="h-5 w-5" />
                        <span className="text-xs">Perfil</span>
                      </a>
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('<div className="md-bottom-nav"><a href="#" className="md-bottom-nav-item active"><Home className="h-5 w-5" /><span className="text-xs">Inicio</span></a></div>', 'bottom-nav')}
                      >
                        {isCopied['bottom-nav'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar código
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Animaciones */}
          <TabsContent value="animations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animaciones Básicas</CardTitle>
                <CardDescription>Efectos de entrada y salida</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 overflow-hidden">
                    <button
                      className="w-full mb-4"
                      onClick={(e) => {
                        const target = e.currentTarget.nextElementSibling as HTMLElement;
                        target.style.animation = 'none';
                        // Force reflow
                        void target.offsetWidth;
                        target.style.animation = '';
                      }}
                    >
                      <div className="md-btn-filled w-full">Reiniciar Animación</div>
                    </button>
                    <div className="md-animate-fade h-24 flex items-center justify-center bg-muted rounded-lg">
                      Fade
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-animate-fade', 'animate-fade')}
                      >
                        {isCopied['animate-fade'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-6 overflow-hidden">
                    <button
                      className="w-full mb-4"
                      onClick={(e) => {
                        const target = e.currentTarget.nextElementSibling as HTMLElement;
                        target.style.animation = 'none';
                        // Force reflow
                        void target.offsetWidth;
                        target.style.animation = '';
                      }}
                    >
                      <div className="md-btn-filled w-full">Reiniciar Animación</div>
                    </button>
                    <div className="md-animate-scale h-24 flex items-center justify-center bg-muted rounded-lg">
                      Scale
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-animate-scale', 'animate-scale')}
                      >
                        {isCopied['animate-scale'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-6 overflow-hidden">
                    <button
                      className="w-full mb-4"
                      onClick={(e) => {
                        const target = e.currentTarget.nextElementSibling as HTMLElement;
                        target.style.animation = 'none';
                        // Force reflow
                        void target.offsetWidth;
                        target.style.animation = '';
                      }}
                    >
                      <div className="md-btn-filled w-full">Reiniciar Animación</div>
                    </button>
                    <div className="md-animate-slide-up h-24 flex items-center justify-center bg-muted rounded-lg">
                      Slide Up
                    </div>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard('md-animate-slide-up', 'animate-slide-up')}
                      >
                        {isCopied['animate-slide-up'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hover Effects</CardTitle>
                <CardDescription>Efectos al interactuar con elementos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md-card-outlined p-6 md-hover-scale">
                    <h3 className="font-medium mb-2">Hover Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      Escala el elemento al hacer hover sobre él. Prueba pasando el mouse por encima.
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-hover-scale', 'hover-scale')}
                      >
                        {isCopied['hover-scale'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md-card-outlined p-6 md-hover-elevate">
                    <h3 className="font-medium mb-2">Hover Elevate</h3>
                    <p className="text-sm text-muted-foreground">
                      Aumenta la elevación al hacer hover, creando un efecto de "levitación".
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-hover-elevate', 'hover-elevate')}
                      >
                        {isCopied['hover-elevate'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md-card-outlined md-shine p-6">
                    <h3 className="font-medium mb-2">Shine Effect</h3>
                    <p className="text-sm text-muted-foreground">
                      Efecto de brillo que recorre el elemento de forma automática.
                    </p>
                    <div className="mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => copyToClipboard('md-shine', 'shine')}
                      >
                        {isCopied['shine'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        Copiar clase
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Animaciones de Estado</CardTitle>
                <CardDescription>Efectos para indicar estados y transiciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Pulse Animation</h3>
                      <button className="md-btn-filled md-animate-pulse w-full py-3">
                        Botón con Pulso
                      </button>
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('md-animate-pulse', 'animate-pulse')}
                        >
                          {isCopied['animate-pulse'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar clase
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Rotate Animation</h3>
                      <div className="flex justify-center">
                        <div className="md-animate-rotate bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center">
                          <Settings className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('md-animate-rotate', 'animate-rotate')}
                        >
                          {isCopied['animate-rotate'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar clase
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Wow Effect Demo</h3>
                      <div 
                        className="md-card-elevated md-hover-scale p-6 overflow-hidden relative"
                        onMouseEnter={(e) => {
                          const target = e.currentTarget.querySelector('.animation-overlay') as HTMLElement;
                          if (target) {
                            target.style.animation = 'none';
                            void target.offsetWidth;
                            target.style.animation = '';
                          }
                        }}
                      >
                        <div className="animation-overlay absolute inset-0 bg-primary/10 md-animate-scale pointer-events-none"></div>
                        <h4 className="font-medium">Combinación de Efectos</h4>
                        <p className="text-sm text-muted-foreground mt-2">
                          Esta tarjeta combina múltiples efectos: elevación, scale en hover y animación al entrar.
                          Pasa el mouse sobre la tarjeta para ver todos los efectos.
                        </p>
                        <button className="md-btn-filled mt-4 md-shine">
                          Acción Principal
                        </button>
                      </div>
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard('<div className="md-card-elevated md-hover-scale overflow-hidden relative"><div className="animation-overlay absolute inset-0 bg-primary/10 md-animate-scale pointer-events-none"></div></div>', 'wow-effect')}
                        >
                          {isCopied['wow-effect'] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          Copiar código
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* FAB con efecto de elevación y animación */}
      <button 
        className="md-fab bg-primary text-primary-foreground md-animate-fade"
        onClick={() => {
          toast.success('¡Acción completada!');
        }}
      >
        <Star className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MaterialDesign;
