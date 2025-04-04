
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Palette, Type, Box, Grid2X2, Ruler, Copy, Check } from 'lucide-react';
import '../../styles/design-system.css';

const DesignSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const colors = [
    { name: 'background', value: 'hsl(var(--background))' },
    { name: 'foreground', value: 'hsl(var(--foreground))' },
    { name: 'primary', value: 'hsl(var(--primary))' },
    { name: 'primary-foreground', value: 'hsl(var(--primary-foreground))' },
    { name: 'secondary', value: 'hsl(var(--secondary))' },
    { name: 'secondary-foreground', value: 'hsl(var(--secondary-foreground))' },
    { name: 'muted', value: 'hsl(var(--muted))' },
    { name: 'muted-foreground', value: 'hsl(var(--muted-foreground))' },
    { name: 'accent', value: 'hsl(var(--accent))' },
    { name: 'accent-foreground', value: 'hsl(var(--accent-foreground))' },
    { name: 'destructive', value: 'hsl(var(--destructive))' },
    { name: 'destructive-foreground', value: 'hsl(var(--destructive-foreground))' },
    { name: 'border', value: 'hsl(var(--border))' },
    { name: 'input', value: 'hsl(var(--input))' },
    { name: 'ring', value: 'hsl(var(--ring))' },
  ];

  const typographySamples = [
    { name: 'Heading 1', element: 'h1', class: 'text-4xl font-bold', sample: 'Encabezado principal' },
    { name: 'Heading 2', element: 'h2', class: 'text-3xl font-bold', sample: 'Encabezado secundario' },
    { name: 'Heading 3', element: 'h3', class: 'text-2xl font-bold', sample: 'Encabezado terciario' },
    { name: 'Heading 4', element: 'h4', class: 'text-xl font-bold', sample: 'Encabezado cuaternario' },
    { name: 'Paragraph', element: 'p', class: 'text-base', sample: 'Párrafo de texto normal utilizado para la mayoría del contenido.' },
    { name: 'Small', element: 'p', class: 'text-sm', sample: 'Texto pequeño para notas y contenido secundario.' },
    { name: 'Lead', element: 'p', class: 'text-lg', sample: 'Texto destacado utilizado para introducir secciones.' },
    { name: 'Large', element: 'p', class: 'text-xl', sample: 'Texto grande para elementos destacados.' },
    { name: 'Muted', element: 'p', class: 'text-sm text-muted-foreground', sample: 'Texto atenuado para información contextual.' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Sistema de Diseño</h1>
        <p className="text-muted-foreground">Guía de componentes y estilos para la plataforma</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="colors">
            <div className="flex items-center">
              <Palette className="mr-2 h-4 w-4" />
              <span>Colores</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="typography">
            <div className="flex items-center">
              <Type className="mr-2 h-4 w-4" />
              <span>Tipografía</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="components">
            <div className="flex items-center">
              <Box className="mr-2 h-4 w-4" />
              <span>Componentes</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="layout">
            <div className="flex items-center">
              <Grid2X2 className="mr-2 h-4 w-4" />
              <span>Layout</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="spacing">
            <div className="flex items-center">
              <Ruler className="mr-2 h-4 w-4" />
              <span>Espaciado</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Paleta de Colores</CardTitle>
              <CardDescription>
                Colores base del sistema de diseño
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="color-grid">
                {colors.map((color) => (
                  <div key={color.name} className="color-item border rounded-md overflow-hidden">
                    <div 
                      className="color-preview h-20" 
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <div className="p-3 flex flex-col">
                      <div className="font-medium">--{color.name}</div>
                      <div className="text-sm mt-1 text-muted-foreground font-mono">
                        {color.value}
                      </div>
                      <button 
                        className="mt-2 text-xs flex items-center text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(color.value)}
                      >
                        {copied === color.value ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copiar valor
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Tipografía</CardTitle>
              <CardDescription>
                Estilos tipográficos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {typographySamples.map((item) => (
                  <div key={item.name} className="typography-sample">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">{item.name}</h3>
                    <div className={item.class}>{item.sample}</div>
                    <div className="mt-2 text-xs font-mono text-muted-foreground">
                      {item.class}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Botones</CardTitle>
                <CardDescription>
                  Variantes de botones disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Variantes</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tamaños</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="lg">Large</Button>
                    <Button>Default</Button>
                    <Button size="sm">Small</Button>
                    <Button size="icon"><Copy className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Estados</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inputs */}
            <Card>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>
                  Campos de entrada de datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-input">Input predeterminado</Label>
                  <Input id="default-input" placeholder="Escribe algo..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled-input">Input deshabilitado</Label>
                  <Input id="disabled-input" placeholder="No puedes editar..." disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="with-button">Con botón</Label>
                  <div className="flex space-x-2">
                    <Input id="with-button" placeholder="Correo electrónico..." />
                    <Button>Suscribir</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkboxes and Radios */}
            <Card>
              <CardHeader>
                <CardTitle>Selección</CardTitle>
                <CardDescription>
                  Checkbox, Radio y Toggle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Checkbox</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Acepto los términos y condiciones</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled" className="text-muted-foreground">Checkbox deshabilitado</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Radio Group</h3>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Opción 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Opción 2</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Toggle (Switch)</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Modo avión</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selects and Dropdowns */}
            <Card>
              <CardHeader>
                <CardTitle>Selects</CardTitle>
                <CardDescription>
                  Menús desplegables y selects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="select">Select básico</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Opción 1</SelectItem>
                      <SelectItem value="option2">Opción 2</SelectItem>
                      <SelectItem value="option3">Opción 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                  Etiquetas y estados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Variantes</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avatars */}
            <Card>
              <CardHeader>
                <CardTitle>Avatars</CardTitle>
                <CardDescription>
                  Imágenes de perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>
                  Mensajes de alerta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Información</AlertTitle>
                  <AlertDescription>
                    Este es un mensaje informativo.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Algo salió mal. Por favor, inténtalo de nuevo.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Sliders */}
            <Card>
              <CardHeader>
                <CardTitle>Sliders</CardTitle>
                <CardDescription>
                  Controles deslizantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slider">Slider simple</Label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="range-slider">Slider de rango</Label>
                  <Slider defaultValue={[25, 75]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>Layout</CardTitle>
              <CardDescription>
                Estructura de página y componentes de layout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Cards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Título de Card</CardTitle>
                        <CardDescription>Descripción de la card</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Contenido de ejemplo para la card.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Título de Card</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Card sin descripción.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p>Card sin header.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Tabs</h3>
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="p-4">
                      Contenido de la primera pestaña.
                    </TabsContent>
                    <TabsContent value="tab2" className="p-4">
                      Contenido de la segunda pestaña.
                    </TabsContent>
                    <TabsContent value="tab3" className="p-4">
                      Contenido de la tercera pestaña.
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spacing">
          <Card>
            <CardHeader>
              <CardTitle>Espaciado</CardTitle>
              <CardDescription>
                Sistema de espaciado y márgenes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <h3 className="text-sm font-medium">Espaciado con clases de Tailwind</h3>
                <div className="space-y-4 border rounded-md p-4">
                  <div className="spacing-item">
                    <div className="spacing-preview h-4 w-4"></div>
                    <div className="spacing-info">
                      <div className="text-sm font-medium">p-1, m-1 (0.25rem = 4px)</div>
                      <div className="text-xs text-muted-foreground">Espaciado mínimo para separación sutil</div>
                    </div>
                  </div>
                  <div className="spacing-item">
                    <div className="spacing-preview h-6 w-6"></div>
                    <div className="spacing-info">
                      <div className="text-sm font-medium">p-2, m-2 (0.5rem = 8px)</div>
                      <div className="text-xs text-muted-foreground">Espaciado para componentes compactos</div>
                    </div>
                  </div>
                  <div className="spacing-item">
                    <div className="spacing-preview h-8 w-8"></div>
                    <div className="spacing-info">
                      <div className="text-sm font-medium">p-3, m-3 (0.75rem = 12px)</div>
                      <div className="text-xs text-muted-foreground">Espaciado estándar entre elementos relacionados</div>
                    </div>
                  </div>
                  <div className="spacing-item">
                    <div className="spacing-preview h-10 w-10"></div>
                    <div className="spacing-info">
                      <div className="text-sm font-medium">p-4, m-4 (1rem = 16px)</div>
                      <div className="text-xs text-muted-foreground">Espaciado estándar para separar componentes</div>
                    </div>
                  </div>
                  <div className="spacing-item">
                    <div className="spacing-preview h-12 w-12"></div>
                    <div className="spacing-info">
                      <div className="text-sm font-medium">p-6, m-6 (1.5rem = 24px)</div>
                      <div className="text-xs text-muted-foreground">Espaciado para secciones distintas</div>
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

export default DesignSystemPage;
