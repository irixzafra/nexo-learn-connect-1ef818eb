
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import BrokenLinkMonitor from '@/components/error-tracking/BrokenLinkMonitor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link2, AlertTriangle, ExternalLink, History } from 'lucide-react';

const BrokenLinksPage: React.FC = () => {
  return (
    <AdminPageLayout
      title="Monitor de Enlaces"
      subtitle="Detecta y corrige problemas con los enlaces de tu plataforma"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <Link2 className="h-5 w-5 text-red-500" />
              Enlaces Rotos
            </CardTitle>
            <CardDescription>
              Enlaces a páginas inexistentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">3 de alta prioridad</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-amber-500" />
              Enlaces Externos
            </CardTitle>
            <CardDescription>
              Referencias a sitios externos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">8 verificados recientemente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <History className="h-5 w-5 text-green-500" />
              Redirecciones
            </CardTitle>
            <CardDescription>
              Redirecciones configuradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Activas y funcionando</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="broken" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="broken">Enlaces Rotos</TabsTrigger>
          <TabsTrigger value="external">Enlaces Externos</TabsTrigger>
          <TabsTrigger value="redirects">Redirecciones</TabsTrigger>
          <TabsTrigger value="orphans">Huérfanos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="broken">
          <BrokenLinkMonitor />
        </TabsContent>
        
        <TabsContent value="external">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-amber-500" />
                Enlaces Externos
              </CardTitle>
              <CardDescription>
                Enlaces a sitios y recursos externos a la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-amber-500 mb-2 opacity-50" />
                <h3 className="text-lg font-medium">Módulo en desarrollo</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  La herramienta de monitorización de enlaces externos estará disponible próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="redirects">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-green-500" />
                Gestión de Redirecciones
              </CardTitle>
              <CardDescription>
                Configura redirecciones para mantener la continuidad de enlaces obsoletos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-amber-500 mb-2 opacity-50" />
                <h3 className="text-lg font-medium">Módulo en desarrollo</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  La herramienta de gestión de redirecciones estará disponible próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orphans">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Páginas Huérfanas
              </CardTitle>
              <CardDescription>
                Páginas que existen pero no tienen enlaces que apunten a ellas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-amber-500 mb-2 opacity-50" />
                <h3 className="text-lg font-medium">Módulo en desarrollo</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  La herramienta de detección de páginas huérfanas estará disponible próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default BrokenLinksPage;
