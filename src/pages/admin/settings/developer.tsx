
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import DeveloperSettings from '@/components/admin/settings/DeveloperSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Table } from 'lucide-react';
import AIServicesManager from '@/components/admin/pages/ai-generator/AIServicesManager';

const DeveloperSettingsPage: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Configuración para Desarrolladores" 
      subtitle="Herramientas y opciones avanzadas para desarrollo"
    >
      <div className="space-y-6">
        <DeveloperSettings />
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Table className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Base de Datos y API</CardTitle>
            </div>
            <CardDescription>
              Configuración avanzada de base de datos y endpoints de API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Esta sección permite gestionar la configuración de base de datos y API para desarrolladores.
              Las modificaciones en esta sección requieren conocimientos técnicos avanzados.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Estado de la API</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Disponible</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Cache</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Última actualización:</span>
                  <span className="text-sm font-mono">2023-06-22 14:30</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <AIServicesManager />
      </div>
    </AdminPageLayout>
  );
};

export default DeveloperSettingsPage;
