
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Package, FileQuestion, AlertTriangle, Code, FolderOpen, Eye, Filter } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ComponentPreview from '@/components/admin/ComponentPreview';

type ComponentModule = {
  path: string;
  module: () => Promise<any>;
  name: string;
};

type GroupedComponents = {
  [key: string]: ComponentModule[];
};

const ComponentInventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('ui-components');
  const [components, setComponents] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isDevelopment, setIsDevelopment] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

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
      title="Inventario Dinámico de Componentes" 
      subtitle="Visualización de componentes de UI reutilizables para desarrollo"
      backHref="/app/admin/dashboard"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary flex items-center gap-2">
            <Package className="h-5 w-5" />
            Inventario Dinámico de Componentes
          </CardTitle>
          <CardDescription>
            Esta herramienta muestra todos los componentes de UI disponibles en el proyecto.
            Use las pestañas para filtrar por categorías de componentes.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar componentes..."
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
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none mb-6">
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
        </TabsList>
        
        <TabsContent value="ui-components" className="mt-0">
          <ComponentsTab 
            componentType="ui" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.ui || {}, locationFilter), searchTerm)} 
            loading={loading} 
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
          />
        </TabsContent>
        
        <TabsContent value="navigation-components" className="mt-0">
          <ComponentsTab 
            componentType="navigation" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.navigation || {}, locationFilter), searchTerm)} 
            loading={loading}
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
          />
        </TabsContent>
        
        <TabsContent value="common-components" className="mt-0">
          <ComponentsTab 
            componentType="common" 
            components={filterComponentsBySearchTerm(filterComponentsByLocation(components.common || {}, locationFilter), searchTerm)} 
            loading={loading} 
            groupComponentsByDirectory={groupComponentsByDirectory}
            getRelativePath={getRelativePath}
          />
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

interface ComponentsTabProps {
  componentType: string;
  components: Record<string, any>;
  loading: boolean;
  groupComponentsByDirectory: (components: Record<string, any>) => GroupedComponents;
  getRelativePath: (path: string) => string;
}

const ComponentsTab: React.FC<ComponentsTabProps> = ({ 
  componentType, 
  components, 
  loading,
  groupComponentsByDirectory,
  getRelativePath
}) => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentModule | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewLoading, setPreviewLoading] = useState<boolean>(false);
  const [previewError, setPreviewError] = useState<Error | null>(null);
  const [previewContent, setPreviewContent] = useState<React.ReactNode | null>(null);

  const handleShowPreview = async (component: ComponentModule) => {
    setSelectedComponent(component);
    setIsPreviewOpen(true);
    setPreviewLoading(true);
    setPreviewContent(null);
    setPreviewError(null);

    try {
      // Intentar cargar el componente para la vista previa
      const importedModule = await component.module();
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
    <>
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
          <StyledAccordion type="multiple" collapsible>
            {Object.entries(groupedComponents).map(([directory, dirComponents]) => (
              <StyledAccordionItem 
                key={directory} 
                value={directory}
                title={directory}
                description={`${dirComponents.length} componentes`}
                icon={<FolderOpen className="h-5 w-5" />}
              >
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Componente</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dirComponents.map((component) => (
                        <TableRow key={component.path}>
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
                              onClick={() => handleShowPreview(component)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Vista Previa
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </StyledAccordionItem>
            ))}
          </StyledAccordion>
        </CardContent>
      </Card>

      {/* Modal para la vista previa del componente */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              {selectedComponent?.name}
            </DialogTitle>
            <DialogDescription className="font-mono text-xs">
              {selectedComponent ? getRelativePath(selectedComponent.path) : ''}
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            {selectedComponent && (
              <ComponentPreview
                componentPath={selectedComponent.path}
                componentName={selectedComponent.name}
                getRelativePath={getRelativePath}
                isLoading={previewLoading}
                error={previewError}
              >
                <ErrorBoundary>
                  {previewContent}
                </ErrorBoundary>
              </ComponentPreview>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
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

