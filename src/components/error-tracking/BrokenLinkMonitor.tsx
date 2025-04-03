
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Link2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const BrokenLinkMonitor: React.FC = () => {
  // Lista de enlaces rotos (simulados para demostración)
  const brokenLinks = [
    { url: '/app/admin/reports/weekly', referrer: '/app/admin/dashboard', lastChecked: '2024-07-01', status: 404 },
    { url: '/app/courses/react-advanced', referrer: '/app/courses', lastChecked: '2024-07-01', status: 404 },
    { url: '/app/student/certificates/expired', referrer: '/app/student/certificates', lastChecked: '2024-07-02', status: 500 },
    { url: '/app/instructor/resources', referrer: '/app/instructor/dashboard', lastChecked: '2024-07-02', status: 404 },
    { url: '/app/admin/analytics/engagement', referrer: '/app/admin/analytics', lastChecked: '2024-07-03', status: 404 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enlaces Rotos</CardTitle>
        <CardDescription>
          Se encontraron {brokenLinks.length} enlaces que están activos en la aplicación pero 
          dirigen a páginas inexistentes o con errores.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        
        <div className="space-y-3">
          {brokenLinks.map((link, index) => (
            <div 
              key={index} 
              className="flex items-start p-4 rounded-md border border-border bg-card/50 hover:bg-muted/50 transition-colors"
            >
              <Link2 className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-mono text-sm mb-1">{link.url}</div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 text-xs text-muted-foreground mb-2">
                  <span>Referenciado desde: <span className="font-mono">{link.referrer}</span></span>
                  <span className="hidden md:inline">•</span>
                  <span>Última verificación: {link.lastChecked}</span>
                  <span className="hidden md:inline">•</span>
                  <span>Estado: <span className="text-red-500 font-semibold">{link.status}</span></span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs text-blue-500 hover:text-blue-700">Ver detalles</button>
                  <button className="text-xs text-amber-500 hover:text-amber-700">Marcar como revisado</button>
                  <button className="text-xs text-purple-500 hover:text-purple-700">Redirigir</button>
                  <button className="text-xs text-red-500 hover:text-red-700">Eliminar enlace</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokenLinkMonitor;
