
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Search, 
  Grid, 
  List, 
  Palette, 
  Code, 
  Layers, 
  Component, 
  Puzzle, 
  ChevronRight,
  BookOpen,
  Type,
  Maximize,
  Box,
  LayoutGrid,
  Shapes,
  Info
} from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { routeMap } from '@/utils/routeUtils';
import ComponentsGrid from '@/features/design-system/components/ComponentsGrid';
import ComponentsList from '@/features/design-system/components/ComponentsList';
import { getComponentsData } from '@/features/design-system/data/componentsData';

// Component types
export type DesignComponent = {
  id?: string;
  name: string;
  category: string;
  status: 'stable' | 'beta' | 'experimental' | 'deprecated';
  path?: string;
  description: string;
  usage?: string;
};

const DesignSystemPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('components');
  const [components, setComponents] = useState<DesignComponent[]>([]);

  useEffect(() => {
    // Load components data
    const componentsData = getComponentsData();
    setComponents(componentsData);
  }, []);

  // Get unique categories for filtering
  const categories = Array.from(new Set(components.map(comp => comp.category)));
  
  // Get unique statuses for filtering
  const statuses = Array.from(new Set(components.map(comp => comp.status)));

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copiado al portapapeles",
      description: "El código ha sido copiado correctamente.",
    });
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value || null);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value || null);
  };

  const renderColorsSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Colores Primarios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Primary', color: 'bg-primary', text: 'text-primary-foreground', value: 'hsl(var(--primary))' },
            { name: 'Secondary', color: 'bg-secondary', text: 'text-secondary-foreground', value: 'hsl(var(--secondary))' },
            { name: 'Accent', color: 'bg-accent', text: 'text-accent-foreground', value: 'hsl(var(--accent))' },
            { name: 'Destructive', color: 'bg-destructive', text: 'text-destructive-foreground', value: 'hsl(var(--destructive))' },
          ].map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div 
                className={`${item.color} ${item.text} h-20 rounded-md flex items-center justify-center relative group cursor-pointer`}
                onClick={() => handleCopyCode(item.value)}
              >
                <span className="font-medium">{item.name}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-mono bg-black/70 text-white px-2 py-1 rounded">
                    {item.value}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-mono">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Escala de Grises</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Background', color: 'bg-background', text: 'text-foreground', value: 'hsl(var(--background))' },
            { name: 'Foreground', color: 'bg-foreground', text: 'text-background', value: 'hsl(var(--foreground))' },
            { name: 'Card', color: 'bg-card', text: 'text-card-foreground', value: 'hsl(var(--card))' },
            { name: 'Muted', color: 'bg-muted', text: 'text-muted-foreground', value: 'hsl(var(--muted))' },
            { name: 'Border', color: 'bg-border', text: 'text-foreground', value: 'hsl(var(--border))' },
            { name: 'Input', color: 'bg-input', text: 'text-foreground', value: 'hsl(var(--input))' },
            { name: 'Popover', color: 'bg-popover', text: 'text-popover-foreground', value: 'hsl(var(--popover))' },
            { name: 'Ring', color: 'bg-ring/30', text: 'text-foreground', value: 'hsl(var(--ring))' },
          ].map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div 
                className={`${item.color} ${item.text} h-16 rounded-md flex items-center justify-center relative group cursor-pointer`}
                onClick={() => handleCopyCode(item.value)}
              >
                <span className="font-medium">{item.name}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-md transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-mono bg-black/70 text-white px-2 py-1 rounded">
                    {item.value}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-mono">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTypographySection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Escala de Tipografía</h3>
        <Card>
          <CardContent className="p-6 space-y-8">
            {[
              { name: 'h1', element: 'h1', className: 'text-4xl font-bold', sample: 'Título Principal (h1)', description: 'Encabezados principales de páginas' },
              { name: 'h2', element: 'h2', className: 'text-3xl font-bold', sample: 'Título de Sección (h2)', description: 'Encabezados de secciones importantes' },
              { name: 'h3', element: 'h3', className: 'text-2xl font-bold', sample: 'Subtítulo (h3)', description: 'Encabezados de subsecciones' },
              { name: 'h4', element: 'h4', className: 'text-xl font-semibold', sample: 'Título Menor (h4)', description: 'Títulos de componentes o grupos' },
              { name: 'p', element: 'p', className: 'text-base', sample: 'Texto de Párrafo (p) - El contenido principal del sitio utiliza este tamaño para mantener la legibilidad óptima en bloques de texto grandes.', description: 'Texto principal de contenido' },
              { name: 'small', element: 'p', className: 'text-sm', sample: 'Texto Pequeño - Utilizado para información secundaria o metadatos.', description: 'Información secundaria, etiquetas' },
              { name: 'xsmall', element: 'p', className: 'text-xs', sample: 'Texto Muy Pequeño - Para notas al pie, descargos de responsabilidad y textos legales.', description: 'Notas al pie, texto legal' }
            ].map((item) => (
              <div key={item.name} className="pb-4 border-b last:border-b-0">
                <div className="mb-2">
                  <Badge variant="outline" className="font-mono">{item.name}</Badge>
                  <span className="ml-2 text-muted-foreground text-sm">{item.description}</span>
                </div>
                <div className={cn(item.className)}>{item.sample}</div>
                <div className="mt-2 bg-muted/30 rounded-md p-3">
                  <code className="text-sm">{`<${item.element} className="${item.className}">${item.sample}</${item.element}>`}</code>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Pesos de Fuente</h3>
        <Card>
          <CardContent className="p-6 space-y-6">
            {[
              { name: 'font-normal', weight: '400', sample: 'Texto con peso Normal (400)' },
              { name: 'font-medium', weight: '500', sample: 'Texto con peso Medium (500)' },
              { name: 'font-semibold', weight: '600', sample: 'Texto con peso Semibold (600)' },
              { name: 'font-bold', weight: '700', sample: 'Texto con peso Bold (700)' }
            ].map((item) => (
              <div key={item.name} className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="md:w-1/4">
                  <Badge variant="outline" className="font-mono">{item.name}</Badge>
                  <div className="text-sm text-muted-foreground mt-1">weight: {item.weight}</div>
                </div>
                <div className={`text-xl ${item.name} md:w-3/4`}>{item.sample}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSpacingSection = () => {
    const spacingSizes = [
      { name: '1', value: '0.25rem (4px)', description: 'Espaciado mínimo' },
      { name: '2', value: '0.5rem (8px)', description: 'Espaciado entre elementos relacionados' },
      { name: '3', value: '0.75rem (12px)', description: 'Espaciado pequeño' },
      { name: '4', value: '1rem (16px)', description: 'Espaciado estándar' },
      { name: '5', value: '1.25rem (20px)', description: 'Espaciado medio-pequeño' },
      { name: '6', value: '1.5rem (24px)', description: 'Espaciado medio' },
      { name: '8', value: '2rem (32px)', description: 'Espaciado grande' },
      { name: '10', value: '2.5rem (40px)', description: 'Espaciado muy grande' },
      { name: '12', value: '3rem (48px)', description: 'Espaciado entre secciones' },
      { name: '16', value: '4rem (64px)', description: 'Espaciado extra grande' }
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Sistema de Espaciado</h3>
          <p className="text-muted-foreground mb-6">
            Nuestro sistema de espaciado utiliza una escala de incrementos consistentes basada en múltiplos de 4px. 
            Esto proporciona una jerarquía visual clara y coherente en toda la interfaz.
          </p>
          
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr_1fr] text-sm font-medium bg-muted/50 p-3">
              <div>Clase</div>
              <div>Ejemplo</div>
              <div>Valor / Uso</div>
            </div>
            <Separator />
            
            {spacingSizes.map((size, index) => (
              <React.Fragment key={size.name}>
                <div className="grid grid-cols-[1fr_2fr_1fr] p-3 items-center">
                  <div className="font-mono text-sm">
                    p-{size.name} / m-{size.name}<br />
                    gap-{size.name} / space-{size.name}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className={`bg-primary/20 border-2 border-primary/40 rounded flex items-center justify-center p-${size.name}`}>
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                        p-{size.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{size.value}</div>
                    <div className="text-muted-foreground text-xs">{size.description}</div>
                  </div>
                </div>
                {index < spacingSizes.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPatternsSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Patrones de Diseño</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Card con Acción",
              description: "Tarjeta con contenido y acción principal",
              code: `<Card>
  <CardHeader>
    <CardTitle>Título de la tarjeta</CardTitle>
    <CardDescription>Descripción breve del contenido</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal de la tarjeta...</p>
  </CardContent>
  <CardFooter>
    <Button>Acción Principal</Button>
  </CardFooter>
</Card>`,
              component: (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Título de la tarjeta</CardTitle>
                    <CardDescription>Descripción breve del contenido</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Contenido principal de la tarjeta...</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Acción Principal</Button>
                  </CardFooter>
                </Card>
              )
            },
            {
              title: "Form Field",
              description: "Campo de formulario con etiqueta y mensaje de error",
              code: `<div className="space-y-2">
  <label className="text-sm font-medium" htmlFor="name">
    Nombre completo
  </label>
  <Input id="name" placeholder="Introduce tu nombre" />
  <p className="text-sm text-muted-foreground">
    Introduce tu nombre completo
  </p>
</div>`,
              component: (
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Nombre completo
                  </label>
                  <Input id="name" placeholder="Introduce tu nombre" />
                  <p className="text-sm text-muted-foreground">
                    Introduce tu nombre completo
                  </p>
                </div>
              )
            },
            {
              title: "Data List",
              description: "Lista de datos con acciones por elemento",
              code: `<div className="rounded-md border">
  {items.map((item) => (
    <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-0">
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-muted-foreground">{item.description}</div>
      </div>
      <Button variant="ghost" size="sm">Action</Button>
    </div>
  ))}
</div>`,
              component: (
                <div className="rounded-md border">
                  {[
                    { id: 1, title: "Elemento 1", description: "Descripción del elemento 1" },
                    { id: 2, title: "Elemento 2", description: "Descripción del elemento 2" },
                    { id: 3, title: "Elemento 3", description: "Descripción del elemento 3" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-0">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Button variant="ghost" size="sm">Action</Button>
                    </div>
                  ))}
                </div>
              )
            },
            {
              title: "Page Header",
              description: "Encabezado de página con título, descripción y acciones",
              code: `<div className="flex items-center justify-between pb-4 mb-4 border-b">
  <div>
    <h1 className="text-2xl font-bold tracking-tight">Título de Página</h1>
    <p className="text-muted-foreground">Descripción de la página o sección</p>
  </div>
  <div className="flex gap-2">
    <Button variant="outline">Acción Secundaria</Button>
    <Button>Acción Principal</Button>
  </div>
</div>`,
              component: (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b w-full">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Título de Página</h1>
                    <p className="text-muted-foreground">Descripción de la página o sección</p>
                  </div>
                  <div className="flex gap-2 mt-4 sm:mt-0">
                    <Button variant="outline">Acción Secundaria</Button>
                    <Button>Acción Principal</Button>
                  </div>
                </div>
              )
            }
          ].map((pattern) => (
            <Card key={pattern.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{pattern.title}</CardTitle>
                <CardDescription>{pattern.description}</CardDescription>
              </CardHeader>
              <CardContent className="border-y bg-muted/40 p-6">
                {pattern.component}
              </CardContent>
              <CardFooter className="p-0">
                <div className="w-full relative font-mono text-sm overflow-x-auto bg-muted/70 p-4">
                  <pre className="text-xs">{pattern.code}</pre>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => handleCopyCode(pattern.code)}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrinciplesSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Principios de Diseño</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Simplicidad",
              icon: <Layers className="h-6 w-6 text-primary" />,
              description: "Interfaces claras y directas que no sobrecargan al usuario con complejidad innecesaria."
            },
            {
              title: "Consistencia",
              icon: <Shapes className="h-6 w-6 text-primary" />,
              description: "Patrones repetibles que crean familiaridad y reducen la curva de aprendizaje."
            },
            {
              title: "Adaptabilidad",
              icon: <Maximize className="h-6 w-6 text-primary" />,
              description: "Componentes flexibles que funcionan en diversos contextos y dispositivos."
            },
            {
              title: "Claridad",
              icon: <Type className="h-6 w-6 text-primary" />,
              description: "Comunicación clara con tipografía legible y jerarquía visual bien definida."
            },
            {
              title: "Accesibilidad",
              icon: <Info className="h-6 w-6 text-primary" />,
              description: "Diseño inclusivo que funciona para todos los usuarios, independientemente de sus capacidades."
            },
            {
              title: "Propósito",
              icon: <Box className="h-6 w-6 text-primary" />,
              description: "Cada elemento tiene una razón para existir y cumple una función específica."
            }
          ].map((principle) => (
            <Card key={principle.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {principle.icon}
                <CardTitle>{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Documentación Completa</h3>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4">Para una documentación completa del sistema de diseño, consulta los siguientes recursos:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <Link to="/docs/design-system" className="text-primary hover:underline">
                  Guía Completa del Sistema de Diseño
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Component className="h-4 w-4 text-primary" />
                <Link to="/docs/components" className="text-primary hover:underline">
                  Biblioteca de Componentes
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-primary" />
                <Link to="/docs/templates" className="text-primary hover:underline">
                  Plantillas y Layouts
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <Link to="/docs/development" className="text-primary hover:underline">
                  Guía de Desarrollo
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <AdminPageLayout 
      title="Sistema de Diseño" 
      subtitle="Guía completa de componentes, estilos y patrones de la plataforma"
    >
      {/* Breadcrumb navigation */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={routeMap.home}>
              <Home className="h-4 w-4 mr-1" />
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={routeMap.admin}>
              Administración
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={routeMap.adminDesignSystem} aria-current="page">
              Sistema de Diseño
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Diseño</h1>
          <p className="text-muted-foreground mt-2">
            Guía completa de componentes, estilos y patrones visuales utilizados en la plataforma.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="components">
              <Component className="h-4 w-4 mr-2" />
              Componentes
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Palette className="h-4 w-4 mr-2" />
              Colores
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="h-4 w-4 mr-2" />
              Tipografía
            </TabsTrigger>
            <TabsTrigger value="spacing">
              <Maximize className="h-4 w-4 mr-2" />
              Espaciado
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <Puzzle className="h-4 w-4 mr-2" />
              Patrones
            </TabsTrigger>
            <TabsTrigger value="principles">
              <BookOpen className="h-4 w-4 mr-2" />
              Principios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Biblioteca de Componentes</CardTitle>
                <CardDescription>
                  Explora los componentes reutilizables disponibles en el sistema de diseño.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar componentes..." 
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-3 flex-wrap">
                    <Select value={categoryFilter || ''} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todas las categorías" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todas las categorías</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={statusFilter || ''} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos los estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos los estados</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex border rounded">
                      <Button 
                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <ComponentsGrid 
                    searchTerm={searchTerm} 
                    categoryFilter={categoryFilter} 
                  />
                ) : (
                  <ComponentsList 
                    searchTerm={searchTerm} 
                    categoryFilter={categoryFilter} 
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Paleta de Colores</CardTitle>
                <CardDescription>
                  Sistema de colores de la plataforma para mantener una apariencia consistente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderColorsSection()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Sistema Tipográfico</CardTitle>
                <CardDescription>
                  Jerarquía tipográfica y estilos de texto para uso consistente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderTypographySection()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spacing" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Sistema de Espaciado</CardTitle>
                <CardDescription>
                  Escala de espaciado para mantener consistencia en márgenes y rellenos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderSpacingSection()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Patrones de Diseño</CardTitle>
                <CardDescription>
                  Soluciones reutilizables para problemas comunes de diseño e interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderPatternsSection()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="principles" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Principios de Diseño</CardTitle>
                <CardDescription>
                  Fundamentos y filosofía que guían todas las decisiones de diseño.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderPrinciplesSection()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageLayout>
  );
};

export default DesignSystemPage;
