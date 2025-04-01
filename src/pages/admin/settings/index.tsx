
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFeatures } from '@/hooks/useFeatures';

const SystemSettings: React.FC = () => {
  const { featuresConfig, toggleFeature } = useFeatures();

  return (
    <AdminPageLayout 
      title="Configuración del Sistema" 
      subtitle="Gestiona todos los aspectos de configuración de la plataforma"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Ajustes Generales</CardTitle>
            </div>
            <CardDescription>
              Configura las opciones generales del sistema. Estos cambios afectarán a toda la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              La configuración realizada aquí afectará a todos los usuarios de la plataforma.
              Algunas opciones pueden requerir un reinicio para aplicarse completamente.
            </p>
            <Separator className="my-4" />
            <SettingsTabs />
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default SystemSettings;
