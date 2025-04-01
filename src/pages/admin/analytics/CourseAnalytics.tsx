
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useFeature } from '@/hooks/useFeatures';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, BookOpen, AlertTriangle, PieChart, LineChart, Layers } from 'lucide-react';
import CoursesAnalyticsSection from './sections/CoursesAnalyticsSection';

const CourseAnalytics: React.FC = () => {
  const analyticsEnabled = useFeature('enableAnalytics');

  if (!analyticsEnabled) {
    return (
      <AdminPageLayout
        title="Analíticas de Cursos"
        subtitle="Esta funcionalidad no está habilitada"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Funcionalidad no habilitada
            </CardTitle>
            <CardDescription>
              Las analíticas de cursos están desactivadas en la configuración de características.
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
      title="Analíticas de Cursos"
      subtitle="Estadísticas y métricas de los cursos en la plataforma"
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Categorías
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Contenido
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <CoursesAnalyticsSection />
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement de Cursos</CardTitle>
              <CardDescription>
                Análisis detallado del engagement de los estudiantes con los cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de engagement estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categorías</CardTitle>
              <CardDescription>
                Análisis de la distribución de cursos por categorías
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de categorías estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Contenido</CardTitle>
              <CardDescription>
                Estadísticas sobre el contenido de los cursos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <Layers className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de contenido estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default CourseAnalytics;
