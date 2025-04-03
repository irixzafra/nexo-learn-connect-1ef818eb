
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertTriangle, Link2, ExternalLink, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const BrokenLinkMonitor: React.FC = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState([
    { url: '/app/admin/reports/weekly', referrer: '/app/admin/dashboard', lastChecked: '2025-07-01', status: 404 },
    { url: '/app/courses/react-advanced', referrer: '/app/courses', lastChecked: '2025-07-01', status: 404 },
    { url: '/app/student/certificates/expired', referrer: '/app/student/certificates', lastChecked: '2025-07-02', status: 500 },
    { url: '/app/instructor/resources', referrer: '/app/instructor/dashboard', lastChecked: '2025-07-02', status: 404 },
    { url: '/app/admin/analytics/engagement', referrer: '/app/admin/analytics', lastChecked: '2025-07-03', status: 404 },
  ]);

  const handleMarkAsReviewed = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    
    toast({
      title: "Enlace marcado como revisado",
      description: "El enlace ha sido eliminado de la lista de monitoreo",
    });
  };

  const handleRedirect = (index: number) => {
    toast({
      title: "Configuración de redirección",
      description: "Esta funcionalidad será implementada próximamente",
      variant: "default",
    });
  };

  const handleDetails = (index: number) => {
    toast({
      title: "Detalles del enlace",
      description: `Información detallada para: ${links[index].url}`,
      variant: "default",
    });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    
    toast({
      title: "Enlace eliminado",
      description: "El enlace ha sido completamente eliminado del sistema",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Enlaces Rotos
        </CardTitle>
        <CardDescription>
          Se encontraron {links.length} enlaces que están activos en la aplicación pero 
          dirigen a páginas inexistentes o con errores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
            <h3 className="text-lg font-medium">¡No hay enlaces rotos!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Todos los enlaces del sistema han sido verificados y funcionan correctamente.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link, index) => (
              <div 
                key={index} 
                className="flex items-start p-4 rounded-md border border-border bg-card/50 hover:bg-muted/50 transition-colors"
              >
                <Link2 className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-mono text-sm mb-1 flex items-center">
                    {link.url}
                    <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200 text-xs">
                      {link.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 text-xs text-muted-foreground mb-2">
                    <span>Referenciado desde: <span className="font-mono">{link.referrer}</span></span>
                    <span className="hidden md:inline">•</span>
                    <span>Última verificación: {link.lastChecked}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleDetails(index)}>
                      Ver detalles
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleMarkAsReviewed(index)}>
                      Marcar como revisado
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleRedirect(index)}>
                      Configurar redirección
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleRemoveLink(index)}>
                      Eliminar enlace
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          Exportar informe
        </Button>
        <Button variant="default" size="sm">
          Verificar enlaces
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrokenLinkMonitor;
