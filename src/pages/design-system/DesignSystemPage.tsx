
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  CardTitle 
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
  Home, 
  Search, 
  Grid, 
  List, 
  Palette, 
  Code, 
  Layers, 
  Component, 
  Puzzle, 
  ChevronRight 
} from 'lucide-react';

import { routeMap } from '@/utils/routeUtils';

// Export the DesignComponent type for use in other files
export type DesignComponent = {
  id?: string;
  name: string;
  category: string;
  status: 'stable' | 'beta' | 'alpha' | 'experimental' | 'deprecated';
  path?: string;
  description: string;
  usage?: string;
};

// Definir componentes de UI disponibles
const uiComponents = [
  { 
    name: 'Accordion', 
    category: 'Disclosure',
    status: 'stable',
    path: '/admin/design-system/components/accordion',
    description: 'Un componente que muestra contenido expandible en secciones.',
  },
  { 
    name: 'Alert', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/alert',
    description: 'Displays a callout for user attention.',
  },
  { 
    name: 'Alert Dialog', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content.',
  },
  { 
    name: 'Aspect Ratio', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/aspect-ratio',
    description: 'Displays content within a desired ratio.',
  },
  { 
    name: 'Avatar', 
    category: 'Data Display',
    status: 'stable',
    path: '/admin/design-system/components/avatar',
    description: 'An image element with a fallback for representing the user.',
  },
  { 
    name: 'Badge', 
    category: 'Data Display',
    status: 'stable',
    path: '/admin/design-system/components/badge',
    description: 'Displays a small badge count or status.',
  },
  { 
    name: 'Breadcrumb', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/breadcrumb',
    description: 'Displays the path to the current resource.',
  },
  { 
    name: 'Button', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/button',
    description: 'Allows users to perform an action.',
  },
  { 
    name: 'Calendar', 
    category: 'Date',
    status: 'stable',
    path: '/admin/design-system/components/calendar',
    description: 'A calendar component for picking dates.',
  },
  { 
    name: 'Card', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/card',
    description: 'Displays content in a card format.',
  },
  { 
    name: 'Checkbox', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/checkbox',
    description: 'Allow users to select multiple items from a list.',
  },
  { 
    name: 'Collapsible', 
    category: 'Disclosure',
    status: 'stable',
    path: '/admin/design-system/components/collapsible',
    description: 'An interactive component that expands/collapses content.',
  },
  { 
    name: 'Command', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/command',
    description: 'Fast and accessible command menu for application actions.',
  },
  { 
    name: 'Dialog', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/dialog',
    description: 'A modal dialog that appears in front of app content.',
  },
  { 
    name: 'Dropdown Menu', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/dropdown-menu',
    description: 'Displays a menu to the user.',
  },
  { 
    name: 'Form', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/form',
    description: 'Validation and Accessible forms.',
  },
  { 
    name: 'Hover Card', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  { 
    name: 'Input', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/input',
    description: 'Allows users to input text into a UI.',
  },
  { 
    name: 'Label', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/label',
    description: 'Renders an accessible label associated with controls.',
  },
  { 
    name: 'Menubar', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/menubar',
    description: 'A horizontal menu with support for dropdown menus.',
  },
  { 
    name: 'Navigation Menu', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/navigation-menu',
    description: 'A responsive navigation component with subnav support.',
  },
  { 
    name: 'Pagination', 
    category: 'Navigation',
    status: 'beta',
    path: '/admin/design-system/components/pagination',
    description: 'Navigate between pages of content.',
  },
  { 
    name: 'Progress', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/progress',
    description: 'Displays an indicator showing progress of a task.',
  },
  { 
    name: 'Radio Group', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/radio-group',
    description: 'A set of checkable buttons where only one can be checked.',
  },
  { 
    name: 'Scroll Area', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/scroll-area',
    description: 'A scrollable area with custom scrollbars.',
  },
  { 
    name: 'Select', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/select',
    description: 'Displays a list of options for the user to select.',
  },
  { 
    name: 'Separator', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/separator',
    description: 'A visual divider between content.',
  },
  { 
    name: 'Sheet', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/sheet',
    description: 'Extends the Dialog component to display content from the edge of the screen.',
  },
  { 
    name: 'Sidebar', 
    category: 'Layout',
    status: 'stable',
    path: '/admin/design-system/components/sidebar',
    description: 'A collapsible side navigation component.',
  },
  { 
    name: 'Skeleton', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/skeleton',
    description: 'Used to show a placeholder while content is loading.',
  },
  { 
    name: 'Slider', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/slider',
    description: 'Allows users to select a value from a range.',
  },
  { 
    name: 'Switch', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/switch',
    description: 'A control that toggles between enabled or disabled states.',
  },
  { 
    name: 'Table', 
    category: 'Data Display',
    status: 'stable',
    path: '/admin/design-system/components/table',
    description: 'Displays tabular data with rows and columns.',
  },
  { 
    name: 'Tabs', 
    category: 'Navigation',
    status: 'stable',
    path: '/admin/design-system/components/tabs',
    description: 'Organizes content into multiple sections to be viewed one at a time.',
  },
  { 
    name: 'Textarea', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/textarea',
    description: 'Allows users to input multi-line text.',
  },
  { 
    name: 'Toast', 
    category: 'Feedback',
    status: 'stable',
    path: '/admin/design-system/components/toast',
    description: 'A succinct message that is displayed temporarily.',
  },
  { 
    name: 'Toggle', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/toggle',
    description: 'A two-state button that can be either on or off.',
  },
  { 
    name: 'Toggle Group', 
    category: 'Forms',
    status: 'stable',
    path: '/admin/design-system/components/toggle-group',
    description: 'A group of toggle controls.',
  },
  { 
    name: 'Tooltip', 
    category: 'Overlay',
    status: 'stable',
    path: '/admin/design-system/components/tooltip',
    description: 'A popup that displays information when hovering over an element.',
  },
];

const DesignSystemPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filtrar componentes según búsqueda y filtros
  const filteredComponents = uiComponents.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? component.category === categoryFilter : true;
    const matchesStatus = statusFilter ? component.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Obtener lista única de categorías para filtrado
  const categories = Array.from(new Set(uiComponents.map(comp => comp.category)));
  
  // Obtener lista única de estados para filtrado
  const statuses = Array.from(new Set(uiComponents.map(comp => comp.status)));

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-500';
      case 'beta': return 'bg-blue-500';
      case 'alpha': return 'bg-amber-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
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
            Explorador de componentes y patrones de diseño utilizados en la plataforma.
          </p>
        </div>

        <Tabs defaultValue="components">
          <TabsList className="mb-4">
            <TabsTrigger value="components">
              <Component className="h-4 w-4 mr-2" />
              Componentes
            </TabsTrigger>
            <TabsTrigger value="foundations">
              <Palette className="h-4 w-4 mr-2" />
              Fundamentos
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <Puzzle className="h-4 w-4 mr-2" />
              Patrones
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Componentes de UI</CardTitle>
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
                    <select 
                      className="border rounded px-3 py-2 text-sm bg-background"
                      onChange={(e) => setCategoryFilter(e.target.value || null)}
                      value={categoryFilter || ''}
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <select 
                      className="border rounded px-3 py-2 text-sm bg-background"
                      onChange={(e) => setStatusFilter(e.target.value || null)}
                      value={statusFilter || ''}
                    >
                      <option value="">Todos los estados</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    
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

                {filteredComponents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No se encontraron componentes</h3>
                    <p className="text-muted-foreground mt-2">
                      Intenta con otra búsqueda o elimina los filtros.
                    </p>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredComponents.map((component) => (
                      <Card key={component.name} className="h-full">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{component.name}</CardTitle>
                            <Badge className={getStatusBadgeColor(component.status)}>
                              {component.status}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="mt-1 font-normal">
                            {component.category}
                          </Badge>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <p className="text-sm text-muted-foreground mb-4">
                            {component.description}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="w-full mt-2"
                          >
                            <Link to={component.path}>
                              Ver componente
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredComponents.map((component) => (
                      <div key={component.name} className="flex items-center justify-between p-3 border rounded hover:bg-muted/30">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{component.name}</span>
                          <Badge variant="outline">{component.category}</Badge>
                          <Badge className={getStatusBadgeColor(component.status)}>
                            {component.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={component.path}>
                            <span className="sr-only">Ver {component.name}</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="foundations">
            <Card>
              <CardHeader>
                <CardTitle>Fundamentos de Diseño</CardTitle>
                <CardDescription>
                  Principios fundamentales de diseño que guían nuestro sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Colores</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Paleta de colores primarios, secundarios y variantes para la plataforma.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Tipografía</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sistema tipográfico, tamaños, pesos y jerarquía.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Espaciado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sistema de espaciado y grid para mantener consistencia.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Iconografía</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Conjunto de iconos y guías de uso.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Elevación y Sombras</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sistema de elevación para indicar jerarquía visual.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Bordes y Radios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Sistema de bordes y radios para elementos UI.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns">
            <Card>
              <CardHeader>
                <CardTitle>Patrones de Diseño</CardTitle>
                <CardDescription>
                  Soluciones recurrentes para problemas comunes de diseño.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Formularios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Patrones para construir formularios accesibles y usables.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Tablas y Listados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Patrones para presentar datos tabulares y listas.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Navegación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Patrones de navegación principal, secundaria y utility.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Manejo de Errores</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Patrones para mostrar errores y validación de datos.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Estados Vacíos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Patrones para manejar estados vacíos y primeras interacciones.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Accesibilidad</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Pautas para garantizar accesibilidad en todos los componentes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle>Guías de Código</CardTitle>
                <CardDescription>
                  Recursos para desarrolladores que trabajan con el sistema de diseño.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cómo usar Componentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Guía para implementar componentes correctamente en el código.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Theming</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cómo personalizar temas y aplicar variables CSS.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Optimización</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Buenas prácticas para optimizar el rendimiento.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contribución</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Cómo contribuir nuevos componentes al sistema de diseño.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystemPage;
