
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrokenLinkMonitor from '@/components/error-tracking/BrokenLinkMonitor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Link2, ScanLine, BadgeAlert, BarChart2 } from 'lucide-react';
import { useRouteValidation } from '@/hooks/useRouteValidation';

const LinkDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { runValidation } = useRouteValidation();
  
  const handleScanRoutes = () => {
    runValidation();
    navigate('/admin/route-validator');
  };
  
  return (
    <AdminPageLayout
      title="Centro de Integridad de Enlaces"
      subtitle="Monitorea y gestiona la integridad de enlaces en toda la plataforma"
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center gap-2">
                <Link2 className="h-5 w-5 text-blue-500" />
                Enlaces Rotos
              </CardTitle>
              <CardDescription>
                Enlaces que llevan a páginas inexistentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">12% menos que el mes pasado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center gap-2">
                <BadgeAlert className="h-5 w-5 text-amber-500" />
                Redirecciones
              </CardTitle>
              <CardDescription>
                Enlaces que requieren redirección
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86</div>
              <p className="text-xs text-muted-foreground mt-1">3% más que el mes pasado</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-green-500" />
                Tasa de Éxito
              </CardTitle>
              <CardDescription>
                Porcentaje de enlaces funcionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground mt-1">0.3% mejor que el mes pasado</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Gestión de Enlaces</h2>
          <Button onClick={handleScanRoutes} className="flex items-center gap-2">
            <ScanLine className="h-4 w-4" />
            Ejecutar Validación de Rutas
          </Button>
        </div>
        
        <Tabs defaultValue="broken" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="broken">Enlaces Rotos</TabsTrigger>
            <TabsTrigger value="redirects">Redirecciones</TabsTrigger>
            <TabsTrigger value="external">Enlaces Externos</TabsTrigger>
            <TabsTrigger value="audit">Auditoría</TabsTrigger>
          </TabsList>
          
          <TabsContent value="broken">
            <BrokenLinkMonitor />
          </TabsContent>
          
          <TabsContent value="redirects">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Redirecciones</CardTitle>
                <CardDescription>
                  Configura y gestiona redirecciones para mantener la validez de enlaces antiguos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>La tabla de redirecciones se mostrará aquí</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="external">
            <Card>
              <CardHeader>
                <CardTitle>Monitoreo de Enlaces Externos</CardTitle>
                <CardDescription>
                  Verifica la validez de enlaces a sitios de terceros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>La lista de enlaces externos se mostrará aquí</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Auditoría</CardTitle>
                <CardDescription>
                  Historial de cambios y acciones realizadas en los enlaces del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>El registro de auditoría se mostrará aquí</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageLayout>
  );
};

export default LinkDashboard;
