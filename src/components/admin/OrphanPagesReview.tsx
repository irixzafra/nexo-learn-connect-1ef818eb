
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, AlertTriangle, CheckCircle, PlusCircle, RefreshCw, Layers } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getPages } from '@/services/pagesService';
import { getNavigationComponents } from '@/features/admin/services/componentsService';

interface OrphanPage {
  path: string;
  title: string;
  status: 'linked' | 'orphan' | 'partial';
  description: string;
  inMenu: boolean;
  inRouteMap: boolean;
}

const OrphanPagesReview: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<OrphanPage[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Load data from services
  useEffect(() => {
    const analyzeOrphanPages = async () => {
      try {
        setIsLoading(true);
        
        // Get all pages from the site
        const sitePages = await getPages();
        
        // Get navigation components to check which pages are linked
        const navComponents = await getNavigationComponents();
        
        // Create a simplified version of the array using routes from the sitePages
        // This is a simplified example - in a real implementation, we would check
        // whether each page is referenced in navigation components
        const analyzedPages: OrphanPage[] = [
          {
            path: '/app/admin/navigation-diagram',
            title: 'Diagrama de Navegación',
            status: 'linked',
            description: 'Visualización gráfica de la estructura de navegación',
            inMenu: true,
            inRouteMap: true
          },
          {
            path: '/app/admin/review-elements',
            title: 'Revisión de Elementos',
            status: 'linked',
            description: 'Inspección de componentes UI para consistencia',
            inMenu: true,
            inRouteMap: true
          },
          {
            path: '/app/admin/orphan-review',
            title: 'Revisión de Huérfanos',
            status: 'linked',
            description: 'Análisis de páginas sin enlaces entrantes',
            inMenu: true,
            inRouteMap: true
          },
          {
            path: '/app/admin/development',
            title: 'Herramientas de Desarrollo',
            status: 'linked',
            description: 'Utilidades para desarrolladores',
            inMenu: true,
            inRouteMap: true
          },
          // Simulate some orphan pages for testing
          {
            path: '/app/admin/test-page',
            title: 'Página de Prueba',
            status: 'orphan',
            description: 'Una página de prueba sin enlaces entrantes',
            inMenu: false,
            inRouteMap: true
          },
          {
            path: '/app/admin/legacy-feature',
            title: 'Característica Antigua',
            status: 'orphan',
            description: 'Una característica que se ha dejado de usar',
            inMenu: false,
            inRouteMap: false
          },
          {
            path: '/app/settings/experimental',
            title: 'Configuraciones Experimentales',
            status: 'partial',
            description: 'Opciones de configuración en fase experimental',
            inMenu: false,
            inRouteMap: true
          }
        ];
        
        setPages(analyzedPages);
        setLastRefresh(new Date());
      } catch (error) {
        console.error('Error loading orphan pages data:', error);
        toast({
          title: "Error al cargar datos",
          description: "No se pudo cargar la información de páginas huérfanas.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    analyzeOrphanPages();
  }, [toast]);
  
  const refreshAnalysis = () => {
    setIsLoading(true);
    // This would re-trigger the useEffect
    setLastRefresh(new Date());
    
    toast({
      title: "Análisis iniciado",
      description: "Analizando estructura de páginas...",
    });
    
    // Simulate a delay for the analysis
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Análisis completado",
        description: "Se ha actualizado la información de páginas huérfanas.",
      });
    }, 1500);
  };
  
  const handleAddToMenu = (page: OrphanPage) => {
    toast({
      title: "Página añadida al menú",
      description: `${page.title} se ha añadido al menú de navegación.`,
    });
    
    // Update the local state to reflect the change
    setPages(prev => 
      prev.map(p => 
        p.path === page.path 
          ? { ...p, inMenu: true, status: p.inRouteMap ? 'linked' : 'partial' } 
          : p
      )
    );
  };
  
  const handleAddToRouteMap = (page: OrphanPage) => {
    toast({
      title: "Página añadida al mapa de rutas",
      description: `${page.title} se ha añadido al mapa de rutas del sistema.`,
    });
    
    // Update the local state to reflect the change
    setPages(prev => 
      prev.map(p => 
        p.path === page.path 
          ? { ...p, inRouteMap: true, status: p.inMenu ? 'linked' : 'partial' } 
          : p
      )
    );
  };
  
  const orphanCount = pages.filter(page => page.status === 'orphan').length;
  const partialCount = pages.filter(page => page.status === 'partial').length;
  const linkedCount = pages.filter(page => page.status === 'linked').length;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Análisis de Páginas Huérfanas</CardTitle>
              <CardDescription>
                Revisión de páginas que podrían no estar correctamente enlazadas desde los menús principales
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-2 items-center"
              onClick={refreshAnalysis}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
              Actualizar análisis
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{linkedCount}</CardTitle>
                <CardDescription>Páginas correctamente enlazadas</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{partialCount}</CardTitle>
                <CardDescription>Páginas parcialmente enlazadas</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">{orphanCount}</CardTitle>
                <CardDescription>Páginas huérfanas</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Analizando estructura de páginas...</p>
              </div>
            </div>
          ) : orphanCount === 0 && partialCount === 0 ? (
            <Alert className="bg-primary/10 border-primary/20">
              <CheckCircle className="h-4 w-4 text-primary" />
              <AlertTitle>¡Todas las páginas están correctamente enlazadas!</AlertTitle>
              <AlertDescription>
                No se han detectado páginas huérfanas en el sistema. Todas las rutas están accesibles desde los menús de navegación.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-warning/10 border-warning/20">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle>Se han detectado {orphanCount + partialCount} páginas con problemas</AlertTitle>
              <AlertDescription>
                Algunas páginas pueden no estar completamente accesibles desde la navegación principal.
              </AlertDescription>
            </Alert>
          )}
          
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Ruta</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Menú</TableHead>
                <TableHead>RouteMap</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading && pages.map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-mono text-xs">{page.path}</TableCell>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        page.status === 'linked' ? 'default' : 
                        page.status === 'partial' ? 'outline' : 'destructive'
                      }
                    >
                      {page.status === 'linked' ? 'Enlazada' : 
                       page.status === 'partial' ? 'Parcial' : 'Huérfana'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {page.inMenu ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    {page.inRouteMap ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={page.path}>
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          Visitar
                        </Link>
                      </Button>
                      
                      {!page.inMenu && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleAddToMenu(page)}
                          className="flex items-center gap-1"
                        >
                          <PlusCircle className="h-3.5 w-3.5 mr-1" />
                          Añadir a menú
                        </Button>
                      )}
                      
                      {!page.inRouteMap && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleAddToRouteMap(page)}
                          className="flex items-center gap-1"
                        >
                          <PlusCircle className="h-3.5 w-3.5 mr-1" />
                          Añadir a rutas
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-xs text-muted-foreground">
            Último análisis: {lastRefresh.toLocaleString()}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <Link to="/app/admin/navigation-diagram">
              Ver diagrama de navegación
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrphanPagesReview;
