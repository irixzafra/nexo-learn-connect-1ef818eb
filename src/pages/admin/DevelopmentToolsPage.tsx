
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Navigation, CheckSquare, Layers, FileCode, Database, Activity, Globe } from 'lucide-react';
import AdminMenu, { AdminMenuItem } from '@/components/ui/admin-menu/AdminMenu';

const DevelopmentToolsPage: React.FC = () => {
  // Navigation management tools
  const navigationTools: AdminMenuItem[] = [
    {
      icon: Navigation,
      label: 'Diagrama de Navegación',
      href: '/app/admin/navigation-diagram',
      description: 'Visualiza la estructura de navegación del sistema'
    },
    {
      icon: CheckSquare,
      label: 'Revisión de Elementos',
      href: '/app/admin/review-elements',
      description: 'Verifica la consistencia de los elementos UI'
    },
    {
      icon: Layers,
      label: 'Revisión de Huérfanos',
      href: '/app/admin/orphan-review',
      description: 'Identifica componentes sin referencia'
    }
  ];

  // Technical tools
  const technicalTools: AdminMenuItem[] = [
    {
      icon: Database,
      label: 'Explorador de Base de Datos',
      href: '/app/admin/database',
      description: 'Visualiza y gestiona la estructura de datos',
      badge: 'Próximo'
    },
    {
      icon: Activity,
      label: 'Registros del Sistema',
      href: '/app/admin/system/logs',
      description: 'Visualiza logs y eventos del sistema',
      badge: 'Próximo'
    },
    {
      icon: FileCode,
      label: 'Editor de Código',
      href: '/app/admin/code-editor',
      description: 'Editor integrado para ajustes técnicos',
      badge: 'Próximo'
    },
    {
      icon: Globe,
      label: 'API Explorer',
      href: '/app/admin/api-explorer',
      description: 'Explora y prueba los endpoints de la API',
      badge: 'Próximo'
    }
  ];

  return (
    <AdminPageLayout 
      title="Herramientas de Desarrollo"
      subtitle="Herramientas para desarrolladores y administradores técnicos del sistema"
    >
      <Tabs defaultValue="navigation" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="navigation">Navegación</TabsTrigger>
            <TabsTrigger value="technical">Herramientas Técnicas</TabsTrigger>
            <TabsTrigger value="developer">Configuración Dev</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="h-5 w-5 mr-2 text-primary" />
                Gestión de Navegación
              </CardTitle>
              <CardDescription>
                Herramientas para visualizar y gestionar la estructura de navegación del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminMenu items={navigationTools} variant="cards" columns={3} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-primary" />
                Herramientas Técnicas
              </CardTitle>
              <CardDescription>
                Herramientas avanzadas para la gestión técnica del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminMenu items={technicalTools} variant="cards" columns={4} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="developer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-primary" />
                Configuración para Desarrolladores
              </CardTitle>
              <CardDescription>
                Opciones y ajustes para el entorno de desarrollo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Imported from the existing DeveloperSettings component */}
              <iframe 
                src="/app/admin/settings/developer" 
                className="w-full min-h-[500px] border-none"
                title="Developer Settings"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default DevelopmentToolsPage;
