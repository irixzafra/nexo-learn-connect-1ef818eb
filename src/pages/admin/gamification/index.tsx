
import React from 'react';
import { Award, Shield, Medal, Star, Users, Plus, RefreshCw } from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GamificationAdmin: React.FC = () => {
  const tabs: AdminTabItem[] = [
    {
      value: 'badges',
      label: 'Insignias',
      icon: <Award className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Gestión de Insignias</h2>
              <p className="text-muted-foreground">Administra las insignias del sistema de gamificación</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Insignia
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Insignias de Logros</CardTitle>
                <CardDescription>Reconocimiento por alcanzar metas específicas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">12 insignias</span>
                      <p className="text-sm text-muted-foreground">Tipo: achievement</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Insignias de Cursos</CardTitle>
                <CardDescription>Otorgadas al completar cursos específicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Medal className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">8 insignias</span>
                      <p className="text-sm text-muted-foreground">Tipo: course</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Insignias Especiales</CardTitle>
                <CardDescription>Otorgadas en eventos o circunstancias especiales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">5 insignias</span>
                      <p className="text-sm text-muted-foreground">Tipo: special</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      value: 'points',
      label: 'Puntos',
      icon: <RefreshCw className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Sistema de Puntos</h2>
            <p className="text-muted-foreground">Configuración del sistema de puntos y niveles</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Niveles</CardTitle>
              <CardDescription>Define los puntos necesarios para cada nivel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Nivel 1</span>
                    <p className="text-sm text-muted-foreground">0 - 100 puntos</p>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Nivel 2</span>
                    <p className="text-sm text-muted-foreground">101 - 250 puntos</p>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Nivel 3</span>
                    <p className="text-sm text-muted-foreground">251 - 500 puntos</p>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      value: 'leaderboard',
      label: 'Clasificación',
      icon: <Users className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Tablas de Clasificación</h2>
            <p className="text-muted-foreground">Gestiona las tablas de clasificación de usuarios</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Clasificación</CardTitle>
              <CardDescription>Personaliza las tablas de clasificación del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Clasificación Global</span>
                    <p className="text-sm text-muted-foreground">Basada en puntos totales</p>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Clasificación por Curso</span>
                    <p className="text-sm text-muted-foreground">Puntos obtenidos en cada curso</p>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <span className="font-medium">Clasificación Mensual</span>
                    <p className="text-sm text-muted-foreground">Puntos ganados en el mes actual</p>
                  </div>
                  <Button variant="outline" size="sm">Gestionar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <AdminPageLayout
      title="Gamificación"
      subtitle="Administra el sistema de gamificación, puntos e insignias"
      tabs={tabs}
      defaultTabValue="badges"
    />
  );
};

export default GamificationAdmin;
