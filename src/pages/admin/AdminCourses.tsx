
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminCourses: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de Cursos</h1>
        
        <Button variant="default">
          Crear Nuevo Curso
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-4 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
          <TabsTrigger value="archived">Archivados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Cursos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Lista de todos los cursos disponibles.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cursos que están actualmente publicados.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Borradores</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cursos en desarrollo que no están publicados.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Archivados</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Cursos que ya no están activos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCourses;
