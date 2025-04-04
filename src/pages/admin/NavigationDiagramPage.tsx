
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import PageHeader from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info } from 'lucide-react';

const NavigationDiagramPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Diagrama de Navegación"
          description="Visualización gráfica de la estructura de navegación del sistema"
          backButton={true}
        />
        
        <div className="mt-6">
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Esta página muestra la estructura de navegación del sistema, incluyendo menús, enlaces y rutas.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="flow">
            <TabsList>
              <TabsTrigger value="flow">Diagrama de flujo</TabsTrigger>
              <TabsTrigger value="menu">Estructura de menús</TabsTrigger>
              <TabsTrigger value="routes">Mapa de rutas</TabsTrigger>
            </TabsList>
            <TabsContent value="flow" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Diagrama de flujo de navegación</CardTitle>
                  <CardDescription>
                    Visualización del flujo de navegación entre las principales páginas del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">El diagrama de flujo se visualizará aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="menu" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Estructura de menús</CardTitle>
                  <CardDescription>
                    Organización jerárquica de los menús de navegación por rol
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">La estructura de menús se visualizará aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="routes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de rutas</CardTitle>
                  <CardDescription>
                    Listado de todas las rutas definidas en el sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">El mapa de rutas se visualizará aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NavigationDiagramPage;
