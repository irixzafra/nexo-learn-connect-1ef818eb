
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useFeature } from '@/hooks/useFeatures';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, LineChart, UserCog, Users, AlertTriangle } from 'lucide-react';
import { UserAnalyticsTab } from '@/features/users/components/UserAnalyticsTab';

const UserAnalytics: React.FC = () => {
  const analyticsEnabled = useFeature('enableAnalytics');

  if (!analyticsEnabled) {
    return (
      <AdminPageLayout
        title="Analíticas de Usuarios"
        subtitle="Esta funcionalidad no está habilitada"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Funcionalidad no habilitada
            </CardTitle>
            <CardDescription>
              Las analíticas de usuarios están desactivadas en la configuración de características.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Para habilitar esta funcionalidad, ve a Configuración &gt; Características y activa "Analíticas".
            </p>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Analíticas de Usuarios"
      subtitle="Estadísticas y métricas de los usuarios de la plataforma"
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="detailed" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detallado
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Actividad
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center">
            <UserCog className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <UserAnalyticsTab />
        </TabsContent>
        
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas detalladas</CardTitle>
              <CardDescription>
                Análisis detallado de comportamiento de usuario
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas detalladas estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Actividad de Usuarios</CardTitle>
              <CardDescription>
                Analiza la actividad de los usuarios a lo largo del tiempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de actividad estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Roles</CardTitle>
              <CardDescription>
                Analiza la distribución de usuarios por roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de roles estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default UserAnalytics;
