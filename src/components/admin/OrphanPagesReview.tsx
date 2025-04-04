
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import { ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { routeMap } from '@/utils/routeUtils';

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
  
  // Lista de páginas para analizar
  const pages: OrphanPage[] = [
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
    {
      path: '/app/learning-paths',
      title: 'Rutas de Aprendizaje',
      status: 'linked',
      description: 'Secuencias estructuradas de cursos',
      inMenu: true,
      inRouteMap: true
    },
    {
      path: '/app/certificates',
      title: 'Certificados',
      status: 'linked',
      description: 'Gestión de certificados de cursos',
      inMenu: true,
      inRouteMap: true
    },
    {
      path: '/app/calendar',
      title: 'Calendario',
      status: 'linked',
      description: 'Calendario de eventos y plazos',
      inMenu: true,
      inRouteMap: true
    },
    {
      path: '/app/help',
      title: 'Centro de Ayuda',
      status: 'linked',
      description: 'Recursos de soporte y ayuda',
      inMenu: true,
      inRouteMap: true
    },
    {
      path: '/app/messages',
      title: 'Mensajes',
      status: 'linked',
      description: 'Sistema de mensajería interna',
      inMenu: true,
      inRouteMap: true
    },
    {
      path: '/app/community',
      title: 'Comunidad',
      status: 'linked',
      description: 'Espacio social para participantes',
      inMenu: true,
      inRouteMap: true
    }
  ];
  
  const orphanCount = pages.filter(page => page.status === 'orphan').length;
  const partialCount = pages.filter(page => page.status === 'partial').length;
  const linkedCount = pages.filter(page => page.status === 'linked').length;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Páginas Huérfanas</CardTitle>
          <CardDescription>
            Revisión de páginas que podrían no estar correctamente enlazadas desde los menús principales
          </CardDescription>
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
          
          {orphanCount === 0 && partialCount === 0 ? (
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
              {pages.map((page) => (
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrphanPagesReview;
