
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { 
  Settings, 
  ToggleLeft, 
  Plug, 
  Database, 
  Code 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFeatures } from '@/hooks/useFeatures';
import { Button } from '@/components/ui/button';

const SystemSettings: React.FC = () => {
  const { featuresConfig, toggleFeature } = useFeatures();
  const navigate = useNavigate();

  return (
    <AdminPageLayout 
      title="Configuración del Sistema" 
      subtitle="Gestiona todos los aspectos de configuración de la plataforma"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/features')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ToggleLeft className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Funcionalidades</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestiona las funciones disponibles en la plataforma
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/developer')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Desarrollo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Herramientas avanzadas para desarrolladores
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/integrations')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Integraciones</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conecta con servicios externos y APIs
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/data')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Datos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestión de copias de seguridad y datos
              </p>
            </CardContent>
          </Card>
        </div>

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
          <CardFooter className="flex justify-between">
            <Button variant="outline">Restablecer ajustes por defecto</Button>
            <Button>Guardar cambios</Button>
          </CardFooter>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default SystemSettings;
