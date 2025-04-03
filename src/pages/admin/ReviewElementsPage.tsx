
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
    layout: 'landing'
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
    layout: 'default'
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
    layout: 'documentation'
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

const ReviewElementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ui-components');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  
  const handleElementSelect = (element: any) => {
    setSelectedElement(element);
    setIsDrawerOpen(true);
  };
  
  return (
    <AdminPageLayout>
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
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '1',
                      name: 'Button',
                      category: 'ui',
                      usage: 'Alto',
                      status: 'Activo',
                      description: 'Componente de botón estándar',
                      type: 'ui',
                      path: '/components/ui/button.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Button</TableCell>
                      <TableCell>Básico</TableCell>
                      <TableCell>Alto</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '1',
                            name: 'Button',
                            category: 'ui',
                            usage: 'Alto',
                            status: 'Activo',
                            description: 'Componente de botón estándar',
                            type: 'ui',
                            path: '/components/ui/button.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '2',
                      name: 'Card',
                      category: 'ui',
                      usage: 'Medio',
                      status: 'Activo',
                      description: 'Componente de tarjeta para mostrar contenido',
                      type: 'ui',
                      path: '/components/ui/card.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Card</TableCell>
                      <TableCell>Contenedor</TableCell>
                      <TableCell>Medio</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '2',
                            name: 'Card',
                            category: 'ui',
                            usage: 'Medio',
                            status: 'Activo',
                            description: 'Componente de tarjeta para mostrar contenido',
                            type: 'ui',
                            path: '/components/ui/card.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '3',
                      name: 'Sidebar',
                      category: 'navigation',
                      usage: 'Alto',
                      status: 'Activo',
                      description: 'Barra lateral de navegación principal',
                      type: 'navigation',
                      path: '/components/layout/Sidebar.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Sidebar</TableCell>
                      <TableCell>Principal</TableCell>
                      <TableCell>Alto</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '3',
                            name: 'Sidebar',
                            category: 'navigation',
                            usage: 'Alto',
                            status: 'Activo',
                            description: 'Barra lateral de navegación principal',
                            type: 'navigation',
                            path: '/components/layout/Sidebar.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '4',
                      name: 'Tabs',
                      category: 'navigation',
                      usage: 'Medio',
                      status: 'Activo',
                      description: 'Componente de pestañas para navegación en página',
                      type: 'navigation',
                      path: '/components/ui/tabs.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Tabs</TableCell>
                      <TableCell>Secundario</TableCell>
                      <TableCell>Medio</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '4',
                            name: 'Tabs',
                            category: 'navigation',
                            usage: 'Medio',
                            status: 'Activo',
                            description: 'Componente de pestañas para navegación en página',
                            type: 'navigation',
                            path: '/components/ui/tabs.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '5',
                      name: 'Table',
                      category: 'common',
                      usage: 'Alto',
                      status: 'Activo',
                      description: 'Componente de tabla para mostrar datos',
                      type: 'common',
                      path: '/components/ui/table.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Table</TableCell>
                      <TableCell>Datos</TableCell>
                      <TableCell>Alto</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '5',
                            name: 'Table',
                            category: 'common',
                            usage: 'Alto',
                            status: 'Activo',
                            description: 'Componente de tabla para mostrar datos',
                            type: 'common',
                            path: '/components/ui/table.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                      id: '6',
                      name: 'DataTable',
                      category: 'common',
                      usage: 'Alto',
                      status: 'Activo',
                      description: 'Tabla avanzada con ordenamiento y filtrado',
                      type: 'common',
                      path: '/components/shared/DataTable.tsx'
                    })}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">DataTable</TableCell>
                      <TableCell>Datos</TableCell>
                      <TableCell>Alto</TableCell>
                      <TableCell>
                        <Badge variant="success">Activo</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleElementSelect({
                            id: '6',
                            name: 'DataTable',
                            category: 'common',
                            usage: 'Alto',
                            status: 'Activo',
                            description: 'Tabla avanzada con ordenamiento y filtrado',
                            type: 'common',
                            path: '/components/shared/DataTable.tsx'
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                    {mockSitePages.map((page) => (
                      <TableRow key={page.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                        ...page,
                        type: 'page'
                      })}>
                        <TableCell>
                          <Checkbox />
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
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleElementSelect({
                              ...page,
                              type: 'page'
                            });
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                    {mockOrphanPages.map((page) => (
                      <TableRow key={page.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleElementSelect({
                        ...page,
                        type: 'orphan'
                      })}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{page.title}</TableCell>
                        <TableCell>{page.path}</TableCell>
                        <TableCell>{page.lastAccessed}</TableCell>
                        <TableCell>
                          <Badge variant="warning">
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleElementSelect({
                              ...page,
                              type: 'orphan'
                            });
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Element Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{selectedElement?.name || selectedElement?.title}</DrawerTitle>
            <DrawerDescription>
              {selectedElement?.description || 
               (selectedElement?.type === 'page' ? 'Página del sitio' : 
                selectedElement?.type === 'orphan' ? 'Página huérfana' : 
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
                  {selectedElement?.category || 
                   (selectedElement?.type === 'page' ? (selectedElement?.is_system_page ? 'Sistema' : 'Contenido') : 
                    selectedElement?.type === 'orphan' ? 'Huérfana' : '')}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Estado
                </h4>
                <Badge variant={
                  selectedElement?.status === 'Activo' || selectedElement?.status === 'published' ? 'success' : 'warning'
                }>
                  {selectedElement?.status}
                </Badge>
              </div>
              {selectedElement?.path && (
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Ruta
                  </h4>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    {selectedElement.path}
                  </p>
                </div>
              )}
              {selectedElement?.type === 'page' && (
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    URL
                  </h4>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    /{selectedElement.slug}
                  </p>
                </div>
              )}
              {selectedElement?.type === 'orphan' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Último acceso
                    </h4>
                    <p className="text-sm">{selectedElement.lastAccessed}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Número de accesos
                    </h4>
                    <p className="text-sm">{selectedElement.accessCount}</p>
                  </div>
                </>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-3">Vista previa</h3>
              
              <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                {selectedElement?.type === 'ui' || selectedElement?.type === 'navigation' || selectedElement?.type === 'common' ? (
                  <div className="border rounded-md p-4 bg-background">
                    <ComponentPreview componentPath={selectedElement.path} />
                  </div>
                ) : selectedElement?.type === 'page' ? (
                  <div className="border rounded-md p-4 bg-background">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedElement.content }} />
                  </div>
                ) : selectedElement?.type === 'orphan' ? (
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
        </DrawerContent>
      </Drawer>
    </AdminPageLayout>
  );
};

export default ReviewElementsPage;
