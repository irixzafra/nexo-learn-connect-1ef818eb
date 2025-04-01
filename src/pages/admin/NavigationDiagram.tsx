
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud, RefreshCw, Share2 } from 'lucide-react';

const NavigationDiagram: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };
  
  return (
    <AdminPageLayout
      title="Diagrama de Navegación"
      subtitle="Visualización de la estructura de navegación de la plataforma"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <DownloadCloud className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vista de Diagrama</CardTitle>
            <CardDescription>
              Representación gráfica de la estructura de navegación de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <div className="w-full h-[600px] bg-muted/20 border border-dashed border-muted-foreground/20 rounded-md flex items-center justify-center text-muted-foreground">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                  <p>Generando diagrama de navegación...</p>
                </div>
              ) : (
                <div className="text-center">
                  <p>Diagrama de navegación se mostrará aquí</p>
                  <p className="mt-2 text-sm">En desarrollo</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default NavigationDiagram;
