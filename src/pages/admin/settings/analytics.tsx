
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart, LineChart, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFeature } from '@/hooks/useFeatures';

const AnalyticsSettings: React.FC = () => {
  const analyticsEnabled = useFeature('enableAnalytics');
  
  return (
    <AdminPageLayout 
      title="Analíticas y Estadísticas" 
      subtitle="Configuración de analíticas y visualización de estadísticas del sistema"
    >
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Estadísticas de Rendimiento</CardTitle>
          </div>
          <CardDescription>
            Visualización de métricas clave del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="content">Contenido</TabsTrigger>
              <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-4">
              <div className="rounded-md border p-6 bg-muted/40">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Crecimiento de Usuarios</h3>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                </div>
                
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-16 w-16 mb-2" />
                  <div className="text-center">
                    <p className="mb-2">Gráfica de crecimiento de usuarios</p>
                    <p className="text-sm">Habilite las analíticas para visualizar los datos</p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="rounded-md border p-6 bg-muted/40">
                  <h3 className="font-medium mb-4">Distribución por Roles</h3>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    <PieChart className="h-12 w-12 mb-2" />
                    <div className="text-center">
                      <p className="text-sm">Distribución de usuarios por rol</p>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-6 bg-muted/40">
                  <h3 className="font-medium mb-4">Actividad Reciente</h3>
                  <div className="h-48 flex items-center justify-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mb-2" />
                    <div className="text-center">
                      <p className="text-sm">Histograma de actividad de usuarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              <div className="h-64 flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>El análisis de contenido estará disponible próximamente</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="h-64 flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  <p>Las métricas de rendimiento estarán disponibles próximamente</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <CardTitle>Configuración de Analíticas</CardTitle>
          </div>
          <CardDescription>
            Personaliza las opciones de analíticas y seguimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>La configuración avanzada de analíticas estará disponible en futuras actualizaciones</p>
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default AnalyticsSettings;
