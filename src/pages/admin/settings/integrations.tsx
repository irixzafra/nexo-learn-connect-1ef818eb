
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plug } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const IntegrationsPage: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Conexiones e Integraciones" 
      subtitle="Configura las conexiones con servicios externos"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Integraciones y APIs</CardTitle>
            </div>
            <CardDescription>
              Conecta tu plataforma con servicios externos y APIs de terceros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Las integraciones te permiten conectar tu plataforma con servicios externos,
              como pasarelas de pago, herramientas de marketing, sistemas de terceros, etc.
            </p>
            <Separator className="my-4" />
            <div className="space-y-4">
              <p>Funcionalidad en desarrollo. Próximamente disponible.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default IntegrationsPage;
