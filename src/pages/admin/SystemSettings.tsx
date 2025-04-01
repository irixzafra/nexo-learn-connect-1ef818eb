import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import {
  Database,
  ServerCog,
  Bug,
  Wrench,
  Loader2
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const { toast } = useToast();
  const { featuresConfig, toggleExtendedFeature } = useFeatures();
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (featuresConfig && typeof featuresConfig.enableMaintenanceMode === 'boolean') {
      setIsMaintenanceMode(featuresConfig.enableMaintenanceMode);
    }
  }, [featuresConfig]);

  const handleMaintenanceModeToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await toggleExtendedFeature('enableMaintenanceMode', checked);
      setIsMaintenanceMode(checked);
      toast({
        title: "Modo Mantenimiento",
        description: `Modo mantenimiento ${checked ? 'activado' : 'desactivado'}.`,
      });
    } catch (error) {
      console.error("Error toggling maintenance mode:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cambiar el modo mantenimiento.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración general del sistema y las opciones de desarrollo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-yellow-500" />
            Mantenimiento
          </CardTitle>
          <CardDescription>
            Activa el modo mantenimiento para realizar tareas de actualización o reparación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
              <p className="text-sm text-muted-foreground">
                Activa este modo para deshabilitar temporalmente el acceso público al sitio.
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="maintenanceMode"
                checked={isMaintenanceMode}
                onCheckedChange={handleMaintenanceModeToggle}
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Base de Datos
          </CardTitle>
          <CardDescription>
            Configuración y herramientas para la gestión de la base de datos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dbBackupPath">Ruta de Respaldo</Label>
            <Input id="dbBackupPath" defaultValue="/var/backups/nexo-learning/" disabled />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Realizar Respaldo Manual</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ServerCog className="h-5 w-5 text-green-500" />
            Opciones de Desarrollo
          </CardTitle>
          <CardDescription>
            Herramientas y configuraciones para facilitar el desarrollo y las pruebas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableDevMode">Modo Desarrollo</Label>
              <p className="text-sm text-muted-foreground">
                Activa este modo para mostrar información de depuración y facilitar el desarrollo.
              </p>
            </div>
            <Switch id="enableDevMode" disabled />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableQueryLog">Registro de Consultas</Label>
              <p className="text-sm text-muted-foreground">
                Habilita el registro de todas las consultas a la base de datos para depuración.
              </p>
            </div>
            <Switch id="enableQueryLog" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-red-500" />
            Depuración
          </CardTitle>
          <CardDescription>
            Herramientas para identificar y solucionar problemas en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="errorReportingLevel">Nivel de Reporte de Errores</Label>
            <Input id="errorReportingLevel" defaultValue="Medio" disabled />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Enviar Reporte de Prueba</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
