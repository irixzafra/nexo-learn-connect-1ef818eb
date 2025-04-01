
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings, 
  ToggleLeft, 
  Palette,
  Plug, 
  Database, 
  FileText,
  BarChart,
  Shield
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFeatures } from '@/hooks/useFeatures';

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

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/design')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Diseño</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Personaliza la apariencia visual del sistema
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/integrations')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Conexiones</CardTitle>
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
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/pages')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Páginas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Administra las páginas del sistema
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/analytics')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Analíticas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configuración de seguimiento y métricas
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin/settings/roles')}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Roles y Permisos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestión de roles de usuario y permisos
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
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default SystemSettings;
