
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Package, FolderOpen, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { 
  getUIComponents, 
  getNavigationComponents, 
  UIComponent,
  NavigationComponent
} from '@/features/admin/services/componentsService';

// Simple component to render preview placeholders
const ComponentPreview: React.FC<{componentPath: string}> = ({componentPath}) => {
  const getRelativePath = (path: string) => {
    // Simple function to format the path for display
    return path.startsWith('/') ? path.substring(1) : path;
  };
  
  return (
    <div className="p-4 border rounded">
      <div className="text-sm text-muted-foreground mb-2">
        {getRelativePath(componentPath)}
      </div>
      <div className="p-4 bg-muted/20 rounded flex items-center justify-center min-h-[100px]">
        <p className="text-muted-foreground">Vista previa del componente</p>
      </div>
    </div>
  );
};

// Tipo para los elementos seleccionados
type ElementType = 
  | (UIComponent & { type: 'ui' })
  | (NavigationComponent & { type: 'navigation' });

const ReviewElementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ui-components');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Estados para datos de la base de datos
  const [uiComponents, setUIComponents] = useState<UIComponent[]>([]);
  const [navComponents, setNavComponents] = useState<NavigationComponent[]>([]);
  
  // Estados de carga
  const [loadingUI, setLoadingUI] = useState(false);
  const [loadingNav, setLoadingNav] = useState(false);
  
  // Cargar datos al iniciar o cambiar de pestaña
  useEffect(() => {
    const loadData = async () => {
      try {
        if (activeTab === 'ui-components') {
          setLoadingUI(true);
          const data = await getUIComponents();
          setUIComponents(data);
          setLoadingUI(false);
        } else if (activeTab === 'navigation-components') {
          setLoadingNav(true);
          const data = await getNavigationComponents();
          setNavComponents(data);
          setLoadingNav(false);
        } else if (activeTab === 'common-components') {
          // Por ahora no cargamos datos para esta pestaña
          // Esta sección cargaría datos de componentes comunes en el futuro
        }
      } catch (error) {
        console.error(`Error loading data for ${activeTab}:`, error);
        toast.error(`Error al cargar datos: ${(error as Error).message}`);
      }
    };
    
    loadData();
  }, [activeTab]);
  
  const handleElementSelect = (element: ElementType) => {
    setSelectedElement(element);
    setIsDrawerOpen(true);
  };
  
  // Función auxiliar para renderizar el esqueleto de carga
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );

  // Función para obtener el nombre o título del elemento según su tipo - con comprobación de nulos
  const getElementName = (element: ElementType | null): string => {
    if (!element) return '';
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.name;
    }
    return '';
  };

  // Función para obtener la descripción del elemento según su tipo - con comprobación de nulos
  const getElementDescription = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.description;
    }
    return undefined;
  };

  // Función para obtener la categoría del elemento según su tipo - con comprobación de nulos
  const getElementCategory = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.category;
    }
    return undefined;
  };

  // Función para obtener la ruta del elemento según su tipo - con comprobación de nulos
  const getElementPath = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.path;
    }
    return undefined;
  };
  
  return (
    <AdminPageLayout title="Revisión de Componentes">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Revisión de Componentes</h1>
        
        <div className="mb-6">
          <Input
            placeholder="Buscar componentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="ui-components" className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Componentes UI
            </TabsTrigger>
            <TabsTrigger value="navigation-components" className="flex items-center">
              <FolderOpen className="h-4 w-4 mr-2" />
              Componentes Navegación
            </TabsTrigger>
            <TabsTrigger value="common-components" className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              Componentes Comunes
            </TabsTrigger>
          </TabsList>

          {/* UI Components Tab */}
          <TabsContent value="ui-components" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Componentes de Interfaz</CardTitle>
                <CardDescription>
                  Biblioteca de componentes UI disponibles en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUI ? (
                  renderLoadingSkeleton()
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Uso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uiComponents.map((component) => (
                        <TableRow 
                          key={component.id} 
                          className="cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleElementSelect({...component, type: 'ui'})}
                        >
                          <TableCell>
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          </TableCell>
                          <TableCell className="font-medium">{component.name}</TableCell>
                          <TableCell>{component.category}</TableCell>
                          <TableCell>{component.usage}</TableCell>
                          <TableCell>
                            <Badge variant="success">{component.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleElementSelect({...component, type: 'ui'});
                              }}
                            >
                              <span className="sr-only">Ver</span>
                              👁️
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navigation Components Tab */}
          <TabsContent value="navigation-components" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Componentes de Navegación</CardTitle>
                <CardDescription>
                  Elementos utilizados para la navegación por la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingNav ? (
                  renderLoadingSkeleton()
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Uso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {navComponents.map((component) => (
                        <TableRow 
                          key={component.id} 
                          className="cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleElementSelect({...component, type: 'navigation'})}
                        >
                          <TableCell>
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          </TableCell>
                          <TableCell className="font-medium">{component.name}</TableCell>
                          <TableCell>{component.category}</TableCell>
                          <TableCell>{component.usage}</TableCell>
                          <TableCell>
                            <Badge variant="success">{component.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleElementSelect({...component, type: 'navigation'});
                              }}
                            >
                              <span className="sr-only">Ver</span>
                              👁️
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Common Components Tab */}
          <TabsContent value="common-components" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Componentes Comunes</CardTitle>
                <CardDescription>
                  Componentes utilizados frecuentemente en múltiples secciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Code className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay componentes comunes registrados</h3>
                  <p className="text-muted-foreground mb-4">
                    Los componentes comunes se mostrarán aquí una vez que sean registrados en el sistema.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Element Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          {selectedElement && (
            <>
              <DrawerHeader>
                <DrawerTitle>{getElementName(selectedElement)}</DrawerTitle>
                <DrawerDescription>
                  {getElementDescription(selectedElement) || 
                  (selectedElement.type === 'navigation' ? 'Componente de navegación' : 'Componente del sistema')}
                </DrawerDescription>
              </DrawerHeader>
              
              <div className="px-4 py-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Tipo
                    </h4>
                    <p className="text-sm">
                      {getElementCategory(selectedElement)}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Estado
                    </h4>
                    <Badge variant={
                      selectedElement.status === 'Activo' || selectedElement.status === 'published' ? 'success' : 'warning'
                    }>
                      {selectedElement.status}
                    </Badge>
                  </div>
                  {getElementPath(selectedElement) && (
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Ruta
                      </h4>
                      <p className="text-sm font-mono bg-muted p-2 rounded">
                        {getElementPath(selectedElement)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">Vista previa</h3>
                  
                  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                    {(selectedElement.type === 'ui' || selectedElement.type === 'navigation') && (
                      <div className="border rounded-md p-4 bg-background">
                        <ComponentPreview componentPath={selectedElement.path} />
                      </div>
                    )}
                  </ErrorBoundary>
                </div>
              </div>

              <DrawerFooter>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                  Cerrar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </AdminPageLayout>
  );
};

export default ReviewElementsPage;
