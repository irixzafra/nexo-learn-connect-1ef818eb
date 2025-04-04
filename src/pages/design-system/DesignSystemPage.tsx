
import React, { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Grid, Type, Square, Ruler, Component, Code, TextCursor
} from 'lucide-react';
import { toast } from 'sonner';
import ColorPalette from '@/features/design-system/components/ColorPalette';
import '@/styles/design-system.css';

// Define color palettes
const primaryColors = [
  { name: 'primary', color: 'bg-primary', value: 'hsl(var(--primary))', description: 'Color principal del sistema' },
  { name: 'primary-foreground', color: 'bg-primary-foreground text-primary', value: 'hsl(var(--primary-foreground))', description: 'Texto sobre fondo primary' },
  { name: 'secondary', color: 'bg-secondary', value: 'hsl(var(--secondary))', description: 'Color secundario del sistema' },
  { name: 'secondary-foreground', color: 'bg-secondary-foreground', value: 'hsl(var(--secondary-foreground))', description: 'Texto sobre fondo secondary' },
  { name: 'accent', color: 'bg-accent', value: 'hsl(var(--accent))', description: 'Color de acento para elementos' },
  { name: 'accent-foreground', color: 'bg-accent-foreground', value: 'hsl(var(--accent-foreground))', description: 'Texto sobre fondo accent' },
];

const neutralColors = [
  { name: 'background', color: 'bg-background', value: 'hsl(var(--background))', description: 'Fondo general' },
  { name: 'foreground', color: 'bg-foreground', value: 'hsl(var(--foreground))', description: 'Texto principal' },
  { name: 'card', color: 'bg-card', value: 'hsl(var(--card))', description: 'Fondo de tarjetas' },
  { name: 'card-foreground', color: 'bg-card-foreground', value: 'hsl(var(--card-foreground))', description: 'Texto en tarjetas' },
  { name: 'muted', color: 'bg-muted', value: 'hsl(var(--muted))', description: 'Áreas secundarias' },
  { name: 'muted-foreground', color: 'bg-muted-foreground', value: 'hsl(var(--muted-foreground))', description: 'Texto secundario' },
];

const borderColors = [
  { name: 'border', color: 'bg-border', value: 'hsl(var(--border))', description: 'Bordes de elementos' },
  { name: 'input', color: 'bg-input', value: 'hsl(var(--input))', description: 'Fondo de inputs' },
  { name: 'ring', color: 'bg-ring', value: 'hsl(var(--ring))', description: 'Anillo de foco' },
];

const feedbackColors = [
  { name: 'destructive', color: 'bg-destructive', value: 'hsl(var(--destructive))', description: 'Errores y alertas' },
  { name: 'destructive-foreground', color: 'bg-destructive-foreground', value: 'hsl(var(--destructive-foreground))', description: 'Texto sobre errores' },
  { name: 'success', color: 'bg-success', value: 'hsl(var(--success))', description: 'Confirmaciones' },
  { name: 'success-foreground', color: 'bg-success-foreground', value: 'hsl(var(--success-foreground))', description: 'Texto sobre confirmaciones' },
  { name: 'warning', color: 'bg-warning', value: 'hsl(var(--warning))', description: 'Advertencias' },
  { name: 'warning-foreground', color: 'bg-warning-foreground', value: 'hsl(var(--warning-foreground))', description: 'Texto sobre advertencias' },
  { name: 'info', color: 'bg-info', value: 'hsl(var(--info))', description: 'Información' },
  { name: 'info-foreground', color: 'bg-info-foreground', value: 'hsl(var(--info-foreground))', description: 'Texto sobre información' },
];

// Font size samples for typography section
const fontSizes = [
  { name: 'text-xs', class: 'text-xs', size: '0.75rem' },
  { name: 'text-sm', class: 'text-sm', size: '0.875rem' },
  { name: 'text-base', class: 'text-base', size: '1rem' },
  { name: 'text-lg', class: 'text-lg', size: '1.125rem' },
  { name: 'text-xl', class: 'text-xl', size: '1.25rem' },
  { name: 'text-2xl', class: 'text-2xl', size: '1.5rem' },
  { name: 'text-3xl', class: 'text-3xl', size: '1.875rem' },
  { name: 'text-4xl', class: 'text-4xl', size: '2.25rem' },
  { name: 'text-5xl', class: 'text-5xl', size: '3rem' },
];

// Spacing samples
const spacingSizes = [
  { name: 'space-1', value: '0.25rem', class: 'w-1 h-1' },
  { name: 'space-2', value: '0.5rem', class: 'w-2 h-2' },
  { name: 'space-3', value: '0.75rem', class: 'w-3 h-3' },
  { name: 'space-4', value: '1rem', class: 'w-4 h-4' },
  { name: 'space-5', value: '1.25rem', class: 'w-5 h-5' },
  { name: 'space-6', value: '1.5rem', class: 'w-6 h-6' },
  { name: 'space-8', value: '2rem', class: 'w-8 h-8' },
  { name: 'space-10', value: '2.5rem', class: 'w-10 h-10' },
  { name: 'space-12', value: '3rem', class: 'w-12 h-12' },
  { name: 'space-16', value: '4rem', class: 'w-16 h-16' },
];

const DesignSystemPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("colors");

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copiado al portapapeles`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Sistema de Diseño</h1>
        <p className="text-lg text-muted-foreground">
          Este sistema de diseño documenta los componentes UI, colores, tipografía y patrones utilizados en la aplicación.
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
        <TabsList className="w-full justify-start border-b pb-px mb-4 rounded-none bg-transparent overflow-x-auto flex">
          <TabsTrigger value="colors" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Palette className="h-4 w-4" />
            <span>Colores</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2 data-[state=active]:bg-background">
            <TextCursor className="h-4 w-4" />
            <span>Tipografía</span>
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Ruler className="h-4 w-4" />
            <span>Espaciado</span>
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Component className="h-4 w-4" />
            <span>Componentes</span>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2 data-[state=active]:bg-background">
            <Grid className="h-4 w-4" />
            <span>Patrones</span>
          </TabsTrigger>
        </TabsList>

        {/* Colores */}
        <TabsContent value="colors" className="space-y-8">
          <div className="space-y-8">
            <ColorPalette 
              colors={primaryColors} 
              title="Colores Primarios" 
              description="Colores principales que definen la identidad visual" 
            />
            
            <ColorPalette 
              colors={neutralColors} 
              title="Colores Neutros" 
              description="Colores de fondo y texto para la interfaz" 
            />
            
            <ColorPalette 
              colors={borderColors} 
              title="Bordes e Inputs" 
              description="Colores para bordes, inputs y elementos interactivos" 
            />
            
            <ColorPalette 
              colors={feedbackColors} 
              title="Colores de Feedback" 
              description="Colores para mensajes de éxito, error, advertencia e información" 
            />
          </div>
        </TabsContent>

        {/* Tipografía */}
        <TabsContent value="typography" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Tipografía</CardTitle>
              <CardDescription>
                Estilos tipográficos utilizados en la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Tamaños de Fuente</h3>
                <div className="space-y-4">
                  {fontSizes.map((font) => (
                    <div 
                      key={font.name} 
                      className="flex items-center justify-between py-2 border-b border-border"
                      onClick={() => handleCopyToClipboard(font.class)}
                    >
                      <div className="flex-1">
                        <p className={`${font.class} font-medium`}>
                          El zorro marrón rápido salta sobre el perro perezoso
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{font.size}</Badge>
                        <code className="px-2 py-1 rounded bg-muted text-sm">{font.class}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pesos de Fuente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold'].map((weight) => (
                    <div 
                      key={weight} 
                      className="flex items-center justify-between p-3 border rounded hover:bg-accent/10"
                      onClick={() => handleCopyToClipboard(weight)}
                    >
                      <p className={`text-lg ${weight}`}>
                        {weight.replace('font-', '')}
                      </p>
                      <code className="px-2 py-1 rounded bg-muted text-sm">{weight}</code>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Espaciado */}
        <TabsContent value="spacing" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Espaciado</CardTitle>
              <CardDescription>
                Sistema de espaciado utilizado en la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Espacios</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {spacingSizes.map((space) => (
                    <div 
                      key={space.name} 
                      className="flex items-center gap-3 p-3 border rounded hover:bg-accent/10"
                      onClick={() => handleCopyToClipboard(space.class)}
                    >
                      <div className={`${space.class} bg-primary rounded-sm`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{space.name}</p>
                        <p className="text-sm text-muted-foreground">{space.value}</p>
                      </div>
                      <code className="px-2 py-1 rounded bg-muted text-xs">{space.class}</code>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Componentes */}
        <TabsContent value="components" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Componentes UI</CardTitle>
              <CardDescription>
                Componentes de interfaz de usuario reutilizables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Button size="lg">Large</Button>
                  <Button>Default</Button>
                  <Button size="sm">Small</Button>
                  <Button size="icon"><Code className="h-4 w-4" /></Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Inputs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Input</Label>
                    <Input id="default-input" placeholder="Escribe aquí..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Input Deshabilitado</Label>
                    <Input id="disabled-input" placeholder="No disponible" disabled />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Switches</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="switch-example">Activo/Inactivo</Label>
                    <Switch id="switch-example" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="switch-disabled">Deshabilitado</Label>
                    <Switch id="switch-disabled" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patrones */}
        <TabsContent value="patterns" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Patrones de Diseño</CardTitle>
              <CardDescription>
                Patrones comunes utilizados a lo largo de la aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>
                        Esta es una tarjeta básica con encabezado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Este es el contenido principal de la tarjeta.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Card con Acciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Tarjeta con acciones al final.</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Cancelar</Button>
                        <Button size="sm">Guardar</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Card Compacta</CardTitle>
                      <CardDescription>
                        Versión reducida de tarjeta
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Contenido con espaciado reducido.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Form Patterns</h3>
                <div className="grid grid-cols-1 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Formulario Básico</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre</Label>
                          <Input id="name" placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="tu@email.com" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketing">Recibir marketing</Label>
                          <Switch id="marketing" />
                        </div>
                        <Button className="w-full">Enviar</Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignSystemPage;
