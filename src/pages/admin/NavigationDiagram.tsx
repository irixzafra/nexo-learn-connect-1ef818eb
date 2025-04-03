
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { routeMap } from '@/utils/routeUtils';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import NavigationFlowDiagram from '@/components/admin/navigation/NavigationFlowDiagram';
import NavigationFlowControls from '@/components/admin/navigation/NavigationFlowControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const NavigationDiagram: React.FC = () => {
  const { userRole } = useAuth();
  const [activeRole, setActiveRole] = useState<UserRoleType>('admin');
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');

  // Función para exportar el diagrama
  const handleExport = useCallback(() => {
    // En una implementación real, esto exportaría el diagrama como imagen
    toast.success('Exportación de diagrama iniciada', {
      description: 'El diagrama se descargará en breve'
    });
  }, []);

  // Función para refrescar el diagrama
  const handleRefresh = useCallback(() => {
    toast.success('Diagrama refrescado', {
      description: 'Se han actualizado todas las rutas y conexiones'
    });
  }, []);

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
            <BreadcrumbLink href="/admin/navigation-diagram" aria-current="page">
              Diagrama de Navegación
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diagrama de Navegación</h1>
          <p className="text-muted-foreground mt-2">
            Visualización completa de la estructura de navegación del sistema.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="visual">Diagrama Visual</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mapa Visual de Navegación</CardTitle>
                <CardDescription>
                  Diagrama interactivo que muestra la estructura completa de navegación del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationFlowControls
                  activeRole={activeRole}
                  setActiveRole={setActiveRole}
                  showAllRoutes={showAllRoutes}
                  setShowAllRoutes={setShowAllRoutes}
                  onExport={handleExport}
                  onRefresh={handleRefresh}
                />
                
                <NavigationFlowDiagram 
                  activeRole={activeRole}
                  showAllRoutes={showAllRoutes}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-muted/30 border">
                <CardHeader>
                  <CardTitle>Recursos de Navegación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Documentos de Navegación</h3>
                      <ul className="ml-6 list-disc mt-2 space-y-1">
                        <li>
                          <Link to="/docs/MAPA_DE_RUTAS.md" className="text-blue-600 hover:underline">
                            Mapa de Rutas
                          </Link>
                        </li>
                        <li>
                          <Link to="/docs/ESTRUCTURA_NAVEGACION.md" className="text-blue-600 hover:underline">
                            Estructura de Navegación
                          </Link>
                        </li>
                        <li>
                          <Link to="/docs/estructura-navegacion.md" className="text-blue-600 hover:underline">
                            Guía de Navegación Detallada
                          </Link>
                        </li>
                        <li>
                          <Link to="/docs/routes.md" className="text-blue-600 hover:underline">
                            Documentación de Rutas
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border">
                <CardHeader>
                  <CardTitle>Herramientas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/admin/route-validator">
                        <PanelLeft className="mr-2 h-4 w-4" />
                        Validador de Rutas
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={routeMap.adminDesignSystem}>
                        <PanelLeft className="mr-2 h-4 w-4" />
                        Sistema de Diseño
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documentation">
            <Card>
              <CardHeader>
                <CardTitle>Documentación de Navegación</CardTitle>
                <CardDescription>
                  Información detallada sobre la estructura de navegación y mejores prácticas
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Principios de Navegación</h3>
                <ol>
                  <li>
                    <strong>Simplicidad</strong>: Máximo 2 niveles de navegación para evitar la complejidad
                  </li>
                  <li>
                    <strong>Contextualidad</strong>: Elementos de navegación específicos al contexto del usuario
                  </li>
                  <li>
                    <strong>Consistencia</strong>: Patrones de navegación similares en toda la aplicación
                  </li>
                  <li>
                    <strong>Adaptabilidad</strong>: Sistema de navegación único que se adapta a cada rol
                  </li>
                </ol>
                
                <h3>Estructura del Diagrama</h3>
                <p>
                  El diagrama muestra las conexiones entre diferentes secciones de la aplicación, 
                  organizadas por roles de usuario. Los colores indican a qué rol pertenece cada sección:
                </p>
                <ul>
                  <li><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span> Verde: Accesible para todos</li>
                  <li><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Azul: Estudiantes</li>
                  <li><span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span> Púrpura: Instructores</li>
                  <li><span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span> Naranja: Administradores</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NavigationDiagram;
