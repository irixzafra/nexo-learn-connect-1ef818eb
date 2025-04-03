
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Package, FileQuestion, AlertTriangle, Code, FolderOpen, Eye, Filter, BookOpen, FileX, Plus } from 'lucide-react';
import { StyledAccordion, StyledAccordionItem } from '@/components/ui/styled-accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Checkbox } from '@/components/ui/checkbox';
import { SitePage } from '@/types/pages';
import { toast } from 'sonner';
import { 
  getUIComponents, 
  getNavigationComponents, 
  getSitePages, 
  getOrphanPages,
  UIComponent,
  NavigationComponent,
  OrphanPage
} from '@/features/admin/services/componentsService';

// Simple component to render preview placeholders
const ComponentPreview: React.FC<{componentPath: string}> = ({componentPath}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
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
  | (NavigationComponent & { type: 'navigation' })
  | (OrphanPage & { type: 'orphan' })
  | (SitePage & { type: 'page' });

const ReviewElementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ui-components');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Estados para datos de la base de datos
  const [uiComponents, setUIComponents] = useState<UIComponent[]>([]);
  const [navComponents, setNavComponents] = useState<NavigationComponent[]>([]);
  const [sitePages, setSitePages] = useState<SitePage[]>([]);
  const [orphanPages, setOrphanPages] = useState<OrphanPage[]>([]);
  
  // Estados de carga
  const [loadingUI, setLoadingUI] = useState(false);
  const [loadingNav, setLoadingNav] = useState(false);
  const [loadingPages, setLoadingPages] = useState(false);
  const [loadingOrphan, setLoadingOrphan] = useState(false);
  
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
        } else if (activeTab === 'site-pages') {
          setLoadingPages(true);
          const data = await getSitePages();
          setSitePages(data);
          setLoadingPages(false);
        } else if (activeTab === 'orphan-pages') {
          setLoadingOrphan(true);
          const data = await getOrphanPages();
          setOrphanPages(data);
          setLoadingOrphan(false);
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
    } else if (element.type === 'page' || element.type === 'orphan') {
      return element.title;
    }
    return '';
  };

  // Función para obtener la descripción del elemento según su tipo - con comprobación de nulos
  const getElementDescription = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.description;
    } else if (element.type === 'page') {
      return element.description;
    }
    return undefined;
  };

  // Función para obtener la categoría del elemento según su tipo - con comprobación de nulos
  const getElementCategory = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation') {
      return element.category;
    } else if (element.type === 'page') {
      return element.is_system_page ? 'Sistema' : 'Contenido';
    }
    return undefined;
  };

  // Función para obtener la ruta del elemento según su tipo - con comprobación de nulos
  const getElementPath = (element: ElementType | null): string | undefined => {
    if (!element) return undefined;
    
    if (element.type === 'ui' || element.type === 'navigation' || element.type === 'orphan') {
      return element.path;
    }
    return undefined;
  };
  
  return (
    <AdminPageLayout title="Revisión de Elementos">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Revisión de Elementos</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar elementos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="ui">Interfaz</SelectItem>
                <SelectItem value="navigation">Navegación</SelectItem>
                <SelectItem value="common">Comunes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros avanzados
          </Button>
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
            <TabsTrigger value="site-pages" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Páginas del Sitio
            </TabsTrigger>
            <TabsTrigger value="orphan-pages" className="flex items-center">
              <FileQuestion className="h-4 w-4 mr-2" />
              Páginas Huérfanas
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
                              <Eye className="h-4 w-4" />
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
                              <Eye className="h-4 w-4" />
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
                {/* Este tab podría usar otra tabla en el futuro o unificar con componentes UI */}
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay componentes comunes registrados</h3>
                  <p className="text-muted-foreground mb-4">
                    Los componentes comunes se mostrarán aquí una vez que sean registrados en el sistema.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar componente común
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Pages Tab */}
          <TabsContent value="site-pages" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Páginas del Sitio</CardTitle>
                <CardDescription>
                  Páginas disponibles en el sitio web
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingPages ? (
                  renderLoadingSkeleton()
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sitePages.map((page) => (
                        <TableRow 
                          key={page.id} 
                          className="cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleElementSelect({...page, type: 'page'})}
                        >
                          <TableCell>
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          </TableCell>
                          <TableCell className="font-medium">{page.title}</TableCell>
                          <TableCell>/{page.slug}</TableCell>
                          <TableCell>{page.is_system_page ? 'Sistema' : 'Contenido'}</TableCell>
                          <TableCell>
                            <Badge variant={page.status === 'published' ? 'success' : 'warning'}>
                              {page.status === 'published' ? 'Publicada' : 'Borrador'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleElementSelect({...page, type: 'page'});
                              }}
                            >
                              <Eye className="h-4 w-4" />
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

          {/* Orphan Pages Tab */}
          <TabsContent value="orphan-pages" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Páginas Huérfanas</CardTitle>
                <CardDescription>
                  Páginas sin referencias o enlaces en el sitio
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingOrphan ? (
                  renderLoadingSkeleton()
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Ruta</TableHead>
                        <TableHead>Último acceso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orphanPages.map((page) => (
                        <TableRow 
                          key={page.id} 
                          className="cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleElementSelect({...page, type: 'orphan'})}
                        >
                          <TableCell>
                            <Checkbox onClick={(e) => e.stopPropagation()} />
                          </TableCell>
                          <TableCell className="font-medium">{page.title}</TableCell>
                          <TableCell>{page.path}</TableCell>
                          <TableCell>{new Date(page.last_accessed).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="warning">
                              {page.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleElementSelect({...page, type: 'orphan'});
                              }}
                            >
                              <Eye className="h-4 w-4" />
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
                  (selectedElement.type === 'page' ? 'Página del sitio' : 
                    selectedElement.type === 'orphan' ? 'Página huérfana' : 
                      'Componente del sistema')}
                </DrawerDescription>
              </DrawerHeader>
              
              <div className="px-4 py-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Tipo
                    </h4>
                    <p className="text-sm">
                      {getElementCategory(selectedElement) || 
                      (selectedElement.type === 'orphan' ? 'Huérfana' : '')}
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
                  {selectedElement.type === 'page' && (
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        URL
                      </h4>
                      <p className="text-sm font-mono bg-muted p-2 rounded">
                        /{selectedElement.slug}
                      </p>
                    </div>
                  )}
                  {selectedElement.type === 'orphan' && (
                    <>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          Último acceso
                        </h4>
                        <p className="text-sm">{new Date(selectedElement.last_accessed).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          Número de accesos
                        </h4>
                        <p className="text-sm">{selectedElement.access_count}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-3">Vista previa</h3>
                  
                  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                    {selectedElement.type === 'ui' || selectedElement.type === 'navigation' ? (
                      <div className="border rounded-md p-4 bg-background">
                        <ComponentPreview componentPath={selectedElement.path} />
                      </div>
                    ) : selectedElement.type === 'page' ? (
                      <div className="border rounded-md p-4 bg-background">
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ 
                          __html: typeof selectedElement.content === 'string' 
                            ? selectedElement.content 
                            : JSON.stringify(selectedElement.content, null, 2) 
                        }} />
                      </div>
                    ) : selectedElement.type === 'orphan' ? (
                      <div className="flex flex-col items-center justify-center border rounded-md p-6 bg-background">
                        <FileX className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Esta página no tiene contenido disponible para previsualizar.</p>
                      </div>
                    ) : null}
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
