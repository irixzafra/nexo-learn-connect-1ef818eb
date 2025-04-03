
import React from 'react';
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
import { routeMap } from '@/utils/routeUtils';

const NavigationDiagram: React.FC = () => {
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
            <BreadcrumbLink href="/app/admin/navigation-diagram" aria-current="page">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/30 border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Recursos de Navegación</h2>
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
              
              <div>
                <h3 className="font-medium">Herramientas</h3>
                <ul className="ml-6 list-disc mt-2 space-y-1">
                  <li>
                    <Link to="/app/admin/route-validator" className="text-blue-600 hover:underline">
                      Validador de Rutas
                    </Link>
                  </li>
                  <li>
                    <Link to={routeMap.adminDesignSystem} className="text-blue-600 hover:underline">
                      Sistema de Diseño
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link to="/app/admin/design-system">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  Sistema de Diseño
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/app/admin/route-validator">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  Validador de Rutas
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/app/admin/navigation-diagram">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  Diagrama de Navegación
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/app/admin/pages">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  Gestión de Páginas
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Mapa Visual de Navegación</h2>
          <div className="p-4 border bg-muted/20 rounded-md text-center h-[400px] flex items-center justify-center">
            <div>
              <p className="text-muted-foreground mb-4">
                El diagrama interactivo de navegación se cargará aquí.
              </p>
              <Button>Cargar Diagrama</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationDiagram;
