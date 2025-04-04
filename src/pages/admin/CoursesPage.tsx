
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoursesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Gestión de Cursos"
          description="Administración de cursos y contenido educativo"
        />
        
        <div className="mt-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Todos los cursos</TabsTrigger>
              <TabsTrigger value="published">Publicados</TabsTrigger>
              <TabsTrigger value="draft">Borradores</TabsTrigger>
              <TabsTrigger value="archived">Archivados</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todos los cursos</CardTitle>
                  <CardDescription>
                    Listado completo de todos los cursos en la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">La lista de cursos se mostrará aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Similar structures for other tabs */}
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CoursesPage;
