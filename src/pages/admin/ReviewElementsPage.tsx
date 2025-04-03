
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Package, FileQuestion, AlertTriangle, Code, FolderOpen, Eye, Filter, BookOpen, FileX } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ComponentPreview from '@/components/admin/ComponentPreview';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Checkbox } from '@/components/ui/checkbox';
import { SitePage } from '@/types/pages';

type ComponentModule = {
  path: string;
  module: () => Promise<any>;
  name: string;
};

type GroupedComponents = {
  [key: string]: ComponentModule[];
};

// Mock data for Site Pages
const mockSitePages: SitePage[] = [
  {
    id: '1',
    title: 'Página de inicio',
    slug: 'home',
    status: 'published',
    content: '<h1>Bienvenido a Nexo Learning</h1>',
    meta_description: 'Página principal de Nexo Learning',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: true,
  },
  {
    id: '2',
    title: 'Acerca de nosotros',
    slug: 'about',
    status: 'published',
    content: '<h1>Sobre Nexo Learning</h1>',
    meta_description: 'Conoce más sobre nuestra plataforma',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: false,
  },
  {
    id: '3',
    title: 'Términos y Condiciones',
    slug: 'terms',
    status: 'draft',
    content: '<h1>Términos y Condiciones</h1>',
    meta_description: 'Términos legales de uso',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: true,
  }
];

// Mock data for Orphan Pages
const mockOrphanPages = [
  {
    id: '4',
    title: 'Página antigua de promociones',
    path: '/old/promotions',
    lastAccessed: '2024-01-15',
    accessCount: 3,
    status: 'no referrer'
  },
  {
    id: '5',
    title: 'Guía de inicio (versión beta)',
    path: '/guides/getting-started-beta',
    lastAccessed: '2024-02-20',
    accessCount: 12,
    status: 'no links'
  },
  {
    id: '6',
    title: 'Blog post borrador',
    path: '/blog/draft-post-123',
    lastAccessed: '2024-03-05',
    accessCount: 0,
    status: 'unreachable'
  }
];

const ComponentInventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ui-components');
  const [components, setComponents] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isDevelopment, setIsDevelopment] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    'ui-components': [],
    'navigation-components': [],
    'common-components': [],
    'site-pages': [],
    'orphan-pages': []
  });
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedElementType, setSelectedElementType] = useState<string>('');

  // Check if we're in development mode
  useEffect(() => {
    // In Vite, we can check if we're in development mode
    setIsDevelopment(import.meta.env.MODE === 'development');
    // Load components
    loadComponents();
  }, []);

  const loadComponents = async () => {
    setLoading(true);

    try {
      // Use import.meta.glob to dynamically scan component directories
      const uiComponents = import.meta.glob('/src/components/ui/**/*.tsx', { eager: false });
      const navigationComponents = import.meta.glob('/src/components/navigation/**/*.tsx', { eager: false });
      const commonComponents = import.meta.glob('/src/components/common/**/*.tsx', { eager: false, import: 'default' });
      const adminComponents = import.meta.glob('/src/components/admin/**/*.tsx', { eager: false });
      const layoutComponents = import.meta.glob('/src/components/layout/**/*.tsx', { eager: false });
      const sharedComponents = import.meta.glob('/src/components/shared/**/*.tsx', { eager: false });

      // Collect all unique component locations
      const allComponents = {
        ...uiComponents,
        ...navigationComponents,
        ...commonComponents,
        ...adminComponents,
        ...layoutComponents,
        ...sharedComponents
      };

      const locations = extractUniqueLocations(allComponents);
      setAvailableLocations(['all', ...locations]);

      setComponents({
        ui: uiComponents,
        navigation: navigationComponents,
        common: commonComponents,
        admin: adminComponents,
        layout: layoutComponents,
        shared: sharedComponents
      });
    } catch (error) {
      console.error('Error loading components:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique locations from component paths
  const extractUniqueLocations = (componentsObj: Record<string, any>): string[] => {
    const locations = Object.keys(componentsObj).map(path => {
      const pathParts = path.split('/');
      if (pathParts.length >= 4) {
        return pathParts.slice(0, 4).join('/').replace('/src/', '');
      }
      return '';
    }).filter(Boolean);
    
    return [...new Set(locations)];
  };

  // Extract component name from file path
  const extractComponentName = (path: string) => {
    const fileName = path.split('/').pop() || '';
    const nameWithoutExtension = fileName.replace(/\.tsx$/, '');
    
    // Try to convert kebab-case or snake_case to PascalCase
    if (nameWithoutExtension.includes('-') || nameWithoutExtension.includes('_')) {
      return nameWithoutExtension
        .split(/[-_]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    }
    
    return nameWithoutExtension;
  };

  // Get file path relative to src
  const getRelativePath = (path: string) => {
    return path.replace(/^\/src\//, '');
  };

  // Filter components by location
  const filterComponentsByLocation = (components: Record<string, any>, location: string): Record<string, any> => {
    if (location === 'all') return components;
    
    return Object.entries(components).reduce((filtered, [path, module]) => {
      if (path.includes(location)) {
        filtered[path] = module;
      }
      return filtered;
    }, {} as Record<string, any>);
  };

  // Group components by directory
  const groupComponentsByDirectory = (components: Record<string, any>): GroupedComponents => {
    const grouped: GroupedComponents = {};
    
    Object.entries(components).forEach(([path, module]) => {
      const pathParts = path.split('/');
      const directoryPath = pathParts.slice(0, -1).join('/');
      const directory = directoryPath.split('/').slice(3, 4).join('/'); // Get the main directory
      
      if (!grouped[directory]) {
        grouped[directory] = [];
      }
      
      grouped[directory].push({
        path,
        module,
        name: extractComponentName(path),
      });
    });
    
    return grouped;
  };

  // Filter components by search term
  const filterComponentsBySearchTerm = (components: Record<string, any>, searchTerm: string): Record<string, any> => {
    if (!searchTerm) return components;
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    
    return Object.entries(components).reduce((filtered, [path, module]) => {
      const componentName = extractComponentName(path);
      
      if (
        componentName.toLowerCase().includes(lowercaseSearchTerm) ||
        path.toLowerCase().includes(lowercaseSearchTerm)
      ) {
        filtered[path] = module;
      }
      
      return filtered;
    }, {} as Record<string, any>);
  };

  // Handle checkbox selection
  const handleToggleSelection = (tab: string, itemId: string) => {
    setSelectedItems(prev => {
      const tabItems = prev[tab] || [];
      const newItems = tabItems.includes(itemId)
        ? tabItems.filter(id => id !== itemId)
        : [...tabItems, itemId];
      
      return { ...prev, [tab]: newItems };
    });
  };

  // Handle view element details
  const handleViewElementDetails = (element: any, type: string) => {
    setSelectedElement(element);
    setSelectedElementType(type);
    setDrawerOpen(true);
  };

  // Filter site pages by search term
  const filterSitePagesBySearchTerm = (pages: SitePage[], searchTerm: string): SitePage[] => {
    if (!searchTerm) return pages;
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    
    return pages.filter(page => 
      page.title.toLowerCase().includes(lowercaseSearchTerm) ||
      page.slug.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  // Filter orphan pages by search term
  const filterOrphanPagesBySearchTerm = (pages: any[], searchTerm: string): any[] => {
    if (!searchTerm) return pages;
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    
    return pages.filter(page => 
      page.title.toLowerCase().includes(lowercaseSearchTerm) ||
      page.path.toLowerCase().includes(lowercaseSearchTerm)
    );
  };

  if (!isDevelopment) {
    return (
      <AdminPageLayout 
        title="Inventario de Componentes"
        subtitle="Esta herramienta solo está disponible en modo desarrollo"
        backHref="/app/admin/dashboard"
      >
        <Card>
          <CardHeader>
            <CardTitle>Herramienta de Desarrollo</CardTitle>
            <CardDescription>
              El Inventario de Componentes solo está disponible en modo desarrollo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Acceso Restringido</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Esta herramienta está diseñada para ayudar a los desarrolladores a visualizar componentes durante el desarrollo.
              No está disponible en el entorno de producción.
            </p>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout 
      title="Inventario Dinámico de Elementos" 
      subtitle="Visualización, revisión y gestión de componentes y páginas del sistema"
      backHref="/app/admin/dashboard"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventario Dinámico de Elementos
          </CardTitle>
          <CardDescription>
            Esta herramienta muestra todos los elementos disponibles en el proyecto.
            Use las pestañas para filtrar por categorías de elementos.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar elementos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        
        {(activeTab === 'ui-components' || activeTab === 'navigation-components' || activeTab === 'common-components') && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Ubicación:</span>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Todas las ubicaciones" />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'Todas las ubicaciones' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="ui-components" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Componentes UI</span>
            <span className="md:hidden">UI</span>
          </TabsTrigger>
          <TabsTrigger value="navigation-components" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Componentes Navegación</span>
            <span className="md:hidden">Navegación</span>
          </TabsTrigger>
          <TabsTrigger value="common-components" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            <span className="hidden md:inline">Componentes Comunes</span>
            <span className="md:hidden">Comunes</span>
          </TabsTrigger>
          <TabsTrigger value="site-pages" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Páginas del Sitio</span>
            <span className="md:hidden">Páginas</span>
          </TabsTrigger>
          <TabsTrigger value="orphan-pages" className="flex items-center gap-2">
            <FileX className="h-4 w-4" />
            <span className="hidden md:inline">Páginas Huérfanas</span>
            <span className="md:hidden">Huérfanas</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ui-components" className="mt-0">
          <ComponentsTable 
            componentType="ui" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.ui || {}, locationFilter), searchTerm)} 
            loading={loading} 
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
            selectedItems={selectedItems['ui-components']}
            onToggleSelection={(id) => handleToggleSelection('ui-components', id)}
            onViewDetails={(element) => handleViewElementDetails(element, 'ui-component')}
          />
        </TabsContent>
        
        <TabsContent value="navigation-components" className="mt-0">
          <ComponentsTable 
            componentType="navigation" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.navigation || {}, locationFilter), searchTerm)} 
            loading={loading}
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
            selectedItems={selectedItems['navigation-components']}
            onToggleSelection={(id) => handleToggleSelection('navigation-components', id)}
            onViewDetails={(element) => handleViewElementDetails(element, 'navigation-component')}
          />
        </TabsContent>
        
        <TabsContent value="common-components" className="mt-0">
          <ComponentsTable 
            componentType="common" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.common || {}, locationFilter), searchTerm)} 
            loading={loading} 
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
            selectedItems={selectedItems['common-components']}
            onToggleSelection={(id) => handleToggleSelection('common-components', id)}
            onViewDetails={(element) => handleViewElementDetails(element, 'common-component')}
          />
        </TabsContent>

        <TabsContent value="site-pages" className="mt-0">
          <SitePagesTable 
            pages={filterSitePagesBySearchTerm(mockSitePages, searchTerm)}
            selectedItems={selectedItems['site-pages']}
            onToggleSelection={(id) => handleToggleSelection('site-pages', id)}
            onViewDetails={(page) => handleViewElementDetails(page, 'site-page')}
          />
        </TabsContent>

        <TabsContent value="orphan-pages" className="mt-0">
          <OrphanPagesTable 
            pages={filterOrphanPagesBySearchTerm(mockOrphanPages, searchTerm)}
            selectedItems={selectedItems['orphan-pages']}
            onToggleSelection={(id) => handleToggleSelection('orphan-pages', id)}
            onViewDetails={(page) => handleViewElementDetails(page, 'orphan-page')}
          />
        </TabsContent>
      </Tabs>

      {/* Element Details Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              {selectedElementType === 'ui-component' && <Package className="h-5 w-5" />}
              {selectedElementType === 'navigation-component' && <FileText className="h-5 w-5" />}
              {selectedElementType === 'common-component' && <FolderOpen className="h-5 w-5" />}
              {selectedElementType === 'site-page' && <BookOpen className="h-5 w-5" />}
              {selectedElementType === 'orphan-page' && <FileX className="h-5 w-5" />}
              {selectedElement?.name || selectedElement?.title || 'Detalles del elemento'}
            </DrawerTitle>
            <DrawerDescription>
              {selectedElementType.includes('component') 
                ? (selectedElement ? getRelativePath(selectedElement.path) : '')
                : (selectedElement?.slug || selectedElement?.path || '')}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            {selectedElementType.includes('component') && selectedElement && (
              <ElementPreview 
                element={selectedElement} 
                type={selectedElementType} 
                getRelativePath={getRelativePath} 
              />
            )}
            {selectedElementType === 'site-page' && selectedElement && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Información</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">ID:</dt>
                          <dd>{selectedElement.id}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Slug:</dt>
                          <dd className="font-mono">{selectedElement.slug}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Estado:</dt>
                          <dd>
                            <Badge variant={
                              selectedElement.status === 'published' ? 'success' : 
                              selectedElement.status === 'draft' ? 'outline' : 'secondary'
                            }>
                              {selectedElement.status === 'published' ? 'Publicado' : 
                               selectedElement.status === 'draft' ? 'Borrador' : 'Archivado'}
                            </Badge>
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Tipo:</dt>
                          <dd>{selectedElement.is_system_page ? 'Sistema' : 'Personalizada'}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Actualización:</dt>
                          <dd>{new Date(selectedElement.updated_at).toLocaleDateString()}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Metadatos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-1 text-sm font-medium">Descripción Meta</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedElement.meta_description || "Sin descripción meta"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Vista Previa del Contenido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-4 bg-muted/20">
                      <div dangerouslySetInnerHTML={{ __html: selectedElement.content }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            {selectedElementType === 'orphan-page' && selectedElement && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Información de Página Huérfana</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">ID:</dt>
                        <dd>{selectedElement.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Ruta:</dt>
                        <dd className="font-mono">{selectedElement.path}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Estado:</dt>
                        <dd>
                          <Badge variant={
                            selectedElement.status === 'no referrer' ? 'warning' : 
                            selectedElement.status === 'no links' ? 'destructive' : 'outline'
                          }>
                            {selectedElement.status === 'no referrer' ? 'Sin referencias' : 
                             selectedElement.status === 'no links' ? 'Sin enlaces' : 'Inaccesible'}
                          </Badge>
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Último acceso:</dt>
                        <dd>{selectedElement.lastAccessed}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Conteo de accesos:</dt>
                        <dd>{selectedElement.accessCount}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Acciones recomendadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        Intentar acceder a la página
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Code className="mr-2 h-4 w-4" />
                        Revisar código fuente
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        <FileX className="mr-2 h-4 w-4" />
                        Eliminar ruta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cerrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </AdminPageLayout>
  );
};

interface ComponentsTableProps {
  componentType: string;
  components: Record<string, any>;
  loading: boolean;
  groupComponentsByDirectory: (components: Record<string, any>) => GroupedComponents;
  getRelativePath: (path: string) => string;
  selectedItems: string[];
  onToggleSelection: (id: string) => void;
  onViewDetails: (component: ComponentModule) => void;
}

const ComponentsTable: React.FC<ComponentsTableProps> = ({ 
  componentType, 
  components, 
  loading,
  groupComponentsByDirectory,
  getRelativePath,
  selectedItems,
  onToggleSelection,
  onViewDetails
}) => {
  if (loading) {
    return <ComponentsLoadingState />;
  }
  
  if (Object.keys(components).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No hay componentes disponibles</CardTitle>
          <CardDescription>
            No se encontraron componentes en esta categoría o con los filtros aplicados
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay componentes para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  const groupedComponents = groupComponentsByDirectory(components);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {componentType === 'ui' && 'Componentes de UI'}
          {componentType === 'navigation' && 'Componentes de Navegación'}
          {componentType === 'common' && 'Componentes Comunes'}
        </CardTitle>
        <CardDescription>
          {Object.keys(components).length} componentes encontrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Componente</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupedComponents).map(([directory, dirComponents]) => (
                <React.Fragment key={directory}>
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={4} className="py-2">
                      <div className="flex items-center gap-2 font-medium">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{directory}</span>
                        <Badge variant="outline" className="ml-2">
                          {dirComponents.length}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                  {dirComponents.map((component) => (
                    <TableRow key={component.path}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedItems.includes(component.path)} 
                          onCheckedChange={() => onToggleSelection(component.path)}
                          aria-label={`Seleccionar ${component.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          <span>{component.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        {getRelativePath(component.path)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 px-2"
                          onClick={() => onViewDetails(component)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

interface SitePagesTableProps {
  pages: SitePage[];
  selectedItems: string[];
  onToggleSelection: (id: string) => void;
  onViewDetails: (page: SitePage) => void;
}

const SitePagesTable: React.FC<SitePagesTableProps> = ({ 
  pages, 
  selectedItems, 
  onToggleSelection, 
  onViewDetails 
}) => {
  if (pages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No hay páginas disponibles</CardTitle>
          <CardDescription>
            No se encontraron páginas con los filtros aplicados
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay páginas para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Páginas del Sitio</CardTitle>
        <CardDescription>
          {pages.length} páginas encontradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(page.id)} 
                      onCheckedChange={() => onToggleSelection(page.id)}
                      aria-label={`Seleccionar ${page.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{page.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {page.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      page.status === 'published' ? 'success' : 
                      page.status === 'draft' ? 'outline' : 'secondary'
                    } className={
                      page.status === 'published' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                      page.status === 'draft' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 
                      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }>
                      {page.status === 'published' ? 'Publicado' : 
                       page.status === 'draft' ? 'Borrador' : 'Archivado'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.is_system_page ? 
                      <Badge variant="outline">Sistema</Badge> : 
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Personalizada</Badge>
                    }
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => onViewDetails(page)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

interface OrphanPagesTableProps {
  pages: any[];
  selectedItems: string[];
  onToggleSelection: (id: string) => void;
  onViewDetails: (page: any) => void;
}

const OrphanPagesTable: React.FC<OrphanPagesTableProps> = ({ 
  pages, 
  selectedItems, 
  onToggleSelection, 
  onViewDetails 
}) => {
  if (pages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No hay páginas huérfanas disponibles</CardTitle>
          <CardDescription>
            No se encontraron páginas huérfanas con los filtros aplicados
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay páginas huérfanas para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Páginas Huérfanas</CardTitle>
        <CardDescription>
          {pages.length} páginas huérfanas encontradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead>Conteo</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.includes(page.id)} 
                      onCheckedChange={() => onToggleSelection(page.id)}
                      aria-label={`Seleccionar ${page.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileX className="h-4 w-4 text-destructive" />
                      <span>{page.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {page.path}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      page.status === 'no referrer' ? 'warning' : 
                      page.status === 'no links' ? 'destructive' : 'outline'
                    } className={
                      page.status === 'no referrer' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 
                      page.status === 'no links' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                      'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }>
                      {page.status === 'no referrer' ? 'Sin referencias' : 
                       page.status === 'no links' ? 'Sin enlaces' : 'Inaccesible'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.lastAccessed}
                  </TableCell>
                  <TableCell>
                    {page.accessCount}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 px-2"
                      onClick={() => onViewDetails(page)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

interface ElementPreviewProps {
  element: ComponentModule;
  type: string;
  getRelativePath: (path: string) => string;
}

const ElementPreview: React.FC<ElementPreviewProps> = ({ element, type, getRelativePath }) => {
  const [previewLoading, setPreviewLoading] = useState<boolean>(true);
  const [previewError, setPreviewError] = useState<Error | null>(null);
  const [previewContent, setPreviewContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        setPreviewLoading(true);
        setPreviewError(null);
        
        // Intentar cargar el componente para la vista previa
        const importedModule = await element.module();
        const ComponentToRender = importedModule.default;
        
        // Solo intentar renderizar si es un componente válido
        if (typeof ComponentToRender === 'function') {
          setPreviewContent(<ComponentToRender />);
        } else {
          setPreviewError(new Error('Este componente no exporta un valor por defecto válido o requiere props específicas.'));
        }
      } catch (error) {
        console.error('Error loading component preview:', error);
        setPreviewError(error instanceof Error ? error : new Error('Error desconocido al cargar el componente'));
      } finally {
        setPreviewLoading(false);
      }
    };

    loadPreview();
  }, [element]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Vista Previa</CardTitle>
        </CardHeader>
        <CardContent>
          {previewLoading ? (
            <div className="flex items-center justify-center h-40">
              <Skeleton className="h-8 w-8 rounded-full animate-spin" />
              <span className="ml-2">Cargando componente...</span>
            </div>
          ) : previewError ? (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center text-muted-foreground">
              <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
              <h3 className="font-semibold">Error al cargar la vista previa</h3>
              <p className="mt-2 text-sm">
                {previewError.message}
              </p>
            </div>
          ) : (
            <div className="border rounded-md p-4 relative overflow-hidden">
              <ErrorBoundary 
                FallbackComponent={({ error, resetError }) => (
                  <ErrorBoundaryFallback error={error} resetError={resetError} />
                )}
              >
                {previewContent}
              </ErrorBoundary>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Información</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Nombre:</dt>
              <dd className="font-medium">{element.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tipo:</dt>
              <dd>
                {type === 'ui-component' ? 'Componente UI' : 
                 type === 'navigation-component' ? 'Componente de Navegación' : 
                 'Componente Común'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Ruta:</dt>
              <dd className="font-mono text-xs">{getRelativePath(element.path)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
};

// Loading state component
const ComponentsLoadingState: React.FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-48 mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full mb-4" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

export default ComponentInventoryPage;
