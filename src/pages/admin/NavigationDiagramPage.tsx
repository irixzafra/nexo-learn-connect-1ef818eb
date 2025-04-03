
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, Share2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const NavigationDiagramPage: React.FC = () => {
  return (
    <AdminPageLayout
      title="Diagrama de Navegación"
      subtitle="Visualiza y analiza la estructura de navegación de la plataforma"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Diagrama de Navegación
          </CardTitle>
          <CardDescription>
            Visualización gráfica de la estructura de navegación de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md">
            <AlertTriangle className="h-16 w-16 text-amber-500 mb-4 opacity-40" />
            <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              El diagrama de navegación está actualmente en desarrollo. Esta funcionalidad
              permitirá visualizar gráficamente la estructura completa de navegación de la plataforma.
            </p>
            <Badge variant="outline" className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
              Disponible próximamente
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" disabled className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar Diagrama
              </Button>
              <Button variant="outline" disabled className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartir Diagrama
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Características Planificadas</CardTitle>
          <CardDescription>Futuras funcionalidades del diagrama de navegación</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Visualización interactiva de la estructura de navegación</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Detección de rutas huérfanas y problemas de navegación</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Análisis de flujos de navegación de usuarios</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Exportación del diagrama en múltiples formatos</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Editor visual para modificar la estructura de navegación</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default NavigationDiagramPage;
