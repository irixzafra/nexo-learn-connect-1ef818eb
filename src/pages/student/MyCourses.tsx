
import React from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MyCourses: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mis Cursos</h1>
        <p className="text-muted-foreground">Administra tus cursos y continúa tu aprendizaje</p>
      </div>

      <Tabs defaultValue="in-progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>En Progreso</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Completados</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Todos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Card key={`progress-${idx}`}>
                <CardHeader className="pb-2">
                  <CardTitle>Curso en Progreso {idx + 1}</CardTitle>
                  <CardDescription>Progreso: {Math.floor(Math.random() * 70)}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.floor(Math.random() * 70)}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Última actividad: hace 2 días</span>
                    <span className="text-sm font-medium">3/{Math.floor(Math.random() * 10) + 5} módulos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, idx) => (
              <Card key={`completed-${idx}`}>
                <CardHeader className="pb-2">
                  <CardTitle>Curso Completado {idx + 1}</CardTitle>
                  <CardDescription>Completado el {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <span className="text-sm text-muted-foreground">Calificación: {Math.floor(Math.random() * 3) + 8}/10</span>
                    <span className="text-sm font-medium">{Math.floor(Math.random() * 5) + 5}/{Math.floor(Math.random() * 5) + 5} módulos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Card key={`all-${idx}`}>
                <CardHeader className="pb-2">
                  <CardTitle>Curso {idx + 1}</CardTitle>
                  <CardDescription>
                    {idx < 3 ? `Progreso: ${Math.floor(Math.random() * 70)}%` : 'Completado'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${idx < 3 ? 'bg-primary' : 'bg-green-500'}`}
                      style={{ width: idx < 3 ? `${Math.floor(Math.random() * 70)}%` : '100%' }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCourses;
