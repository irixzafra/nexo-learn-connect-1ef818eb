
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DashboardWidgetArea: React.FC = () => {
  return (
    <div className="mt-6 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Resumen de tu actividad en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cursos">
            <TabsList className="mb-4">
              <TabsTrigger value="cursos">Cursos</TabsTrigger>
              <TabsTrigger value="tareas">Tareas</TabsTrigger>
              <TabsTrigger value="discusiones">Discusiones</TabsTrigger>
            </TabsList>
            <TabsContent value="cursos">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b last:border-0">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Curso {i + 1}</h4>
                      <p className="text-sm text-muted-foreground">Última actividad: hace {i + 1} días</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tareas">
              <div className="p-4 text-center text-muted-foreground">
                No hay tareas pendientes
              </div>
            </TabsContent>
            <TabsContent value="discusiones">
              <div className="p-4 text-center text-muted-foreground">
                No hay discusiones activas
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
