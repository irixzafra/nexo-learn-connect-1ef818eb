
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Database, 
  Server,
  HardDrive,
  RefreshCw, 
  Download,
  Upload,
  KeyRound,
  AlertTriangle,
  Shield
} from 'lucide-react';
import SettingsAccordion from '@/components/admin/settings/SettingsAccordion';
import SupabaseConnectionTest from './SupabaseConnectionTest';
import { FeaturesConfig } from '@/contexts/features/types';

interface DataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

export const DataSettings: React.FC<DataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  const handleBackupDownload = () => {
    toast.success('Backup generado y descargado correctamente');
  };

  const handleDataRefresh = () => {
    toast.info('Datos actualizados correctamente');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Gestión de Datos
        </h2>
        <p className="text-muted-foreground">
          Administra las opciones relacionadas con la base de datos, respaldos y caché
        </p>
      </div>

      {/* Supabase connection status */}
      <SupabaseConnectionTest showCard />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Respaldos y Recuperación
            </CardTitle>
            <CardDescription>Configuración para respaldos automáticos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoBackups">Respaldos Automáticos</Label>
                <p className="text-sm text-muted-foreground">Programar respaldos automáticos de la base de datos</p>
              </div>
              <Switch
                id="autoBackups"
                checked={!!featuresConfig.enableAutoBackups}
                onCheckedChange={(checked) => onToggleFeature('enableAutoBackups', checked)}
                disabled={isLoading}
              />
            </div>
            <Separator />
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBackupDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Descargar backup
              </Button>
              <Button variant="outline" className="gap-2">
                <Upload className="h-4 w-4" />
                Restaurar backup
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Caché y Rendimiento
            </CardTitle>
            <CardDescription>Configuración de caché y rendimiento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="queryCache">Caché de Consultas</Label>
                <p className="text-sm text-muted-foreground">Activar caché para consultas frecuentes</p>
              </div>
              <Switch
                id="queryCache"
                checked={!!featuresConfig.enableQueryCache}
                onCheckedChange={(checked) => onToggleFeature('enableQueryCache', checked)}
                disabled={isLoading}
              />
            </div>
            <Separator />
            <Button variant="outline" onClick={handleDataRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Limpiar caché
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Estado del Sistema
            </CardTitle>
            <CardDescription>Configuración de mantenimiento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
                <p className="text-sm text-muted-foreground">
                  Activar modo mantenimiento (solo administradores podrán acceder)
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={!!featuresConfig.enableMaintenanceMode}
                onCheckedChange={(checked) => onToggleFeature('enableMaintenanceMode', checked)}
                disabled={isLoading}
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
              <div className="flex gap-2 items-center text-amber-800 mb-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Aviso</span>
              </div>
              <p className="text-sm text-amber-700">
                El modo mantenimiento bloquea el acceso a todos los usuarios excepto administradores.
                Úsalo con precaución.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Opciones de Desarrollo
            </CardTitle>
            <CardDescription>Configuración para desarrolladores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="devMode">Modo Desarrollo DB</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar herramientas de desarrollo para la base de datos
                </p>
              </div>
              <Switch
                id="devMode"
                checked={!!featuresConfig.enableDatabaseDevMode}
                onCheckedChange={(checked) => onToggleFeature('enableDatabaseDevMode', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <SettingsAccordion
        sections={[
          {
            id: "database",
            title: "Conexiones de Base de Datos",
            icon: <Database className="h-5 w-5" />,
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configuración de conexiones a bases de datos
                </p>
                <SupabaseConnectionTest />
              </div>
            ),
            iconColor: "text-blue-600"
          },
          {
            id: "queries",
            title: "Optimización de Consultas",
            icon: <Server className="h-5 w-5" />,
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Ajustes para optimizar el rendimiento de consultas
                </p>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="queryLog">Registro de consultas</Label>
                    <p className="text-xs text-muted-foreground">
                      Registrar consultas lentas para análisis
                    </p>
                  </div>
                  <Switch id="queryLog" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="queryTimeout">Tiempo de espera</Label>
                    <p className="text-xs text-muted-foreground">
                      Timeout para consultas largas (30 segundos)
                    </p>
                  </div>
                  <Switch id="queryTimeout" />
                </div>
              </div>
            ),
            iconColor: "text-green-600"
          }
        ]}
      />
    </div>
  );
};

export default DataSettings;
