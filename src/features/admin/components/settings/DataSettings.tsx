
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Database, Server, Shield, AlertTriangle } from 'lucide-react';
import SettingsAccordion from '@/components/admin/settings/SettingsAccordion';
import { FeaturesConfig, FeatureId } from '@/contexts/features/types';
import SupabaseConnectionTest from './SupabaseConnectionTest';
import SyncManager from './SyncManager';

interface DataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle>Gestión de Datos</CardTitle>
          </div>
          <CardDescription>
            Administra la configuración de datos y base de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Modo de desarrollo de base de datos</h3>
                <p className="text-sm text-muted-foreground">
                  Habilita funciones avanzadas para desarrollo y depuración
                </p>
              </div>
              <Switch
                checked={featuresConfig.enableDatabaseDevMode || false}
                onCheckedChange={(value) => onToggleFeature('enableDatabaseDevMode', value)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Caché de consultas</h3>
                <p className="text-sm text-muted-foreground">
                  Almacena temporalmente resultados de consultas para mejorar el rendimiento
                </p>
              </div>
              <Switch
                checked={featuresConfig.enableQueryCache || false}
                onCheckedChange={(value) => onToggleFeature('enableQueryCache', value)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Copias de seguridad automáticas</h3>
                <p className="text-sm text-muted-foreground">
                  Programa copias de seguridad automáticas de la base de datos
                </p>
              </div>
              <Switch
                checked={featuresConfig.enableAutoBackups || false}
                onCheckedChange={(value) => onToggleFeature('enableAutoBackups', value)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Modo de mantenimiento</h3>
                <p className="text-sm text-muted-foreground">
                  Activa el modo de mantenimiento para tareas administrativas
                </p>
              </div>
              <Switch
                checked={featuresConfig.enableMaintenanceMode || false}
                onCheckedChange={(value) => onToggleFeature('enableMaintenanceMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          {featuresConfig.enableMaintenanceMode && (
            <div className="mt-4 p-4 border border-amber-200 bg-amber-50 rounded-md">
              <div className="flex items-start gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Modo de mantenimiento activado</h4>
                  <p className="text-sm">
                    El sistema está ahora en modo de mantenimiento. Los usuarios verán una página de mantenimiento.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Componente de prueba de conexión a Supabase */}
      <SupabaseConnectionTest showCard={true} autoTest={false} />
      
      {/* Componente de gestión de sincronización */}
      <SyncManager autoSync={false} />

      <SettingsAccordion
        sections={[
          {
            id: "database",
            title: "Configuración de Base de Datos",
            icon: <Database className="h-5 w-5" />,
            iconColor: "text-blue-500",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure los parámetros de la base de datos, incluyendo conexiones, rendimiento y seguridad.
                </p>
                <div className="p-4 border rounded-md bg-muted/40">
                  <h4 className="font-medium mb-2">Información de la Base de Datos</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium">PostgreSQL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versión:</span>
                      <span className="font-medium">14.x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ubicación:</span>
                      <span className="font-medium">Supabase Cloud</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: "backups",
            title: "Copias de Seguridad",
            icon: <Server className="h-5 w-5" />,
            iconColor: "text-emerald-500",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Gestione las copias de seguridad de la base de datos y configure la programación de respaldos automáticos.
                </p>
                <div className="p-4 border rounded-md bg-muted/40">
                  <h4 className="font-medium mb-2">Estado de Copias de Seguridad</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última copia:</span>
                      <span className="font-medium">No disponible</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Programación:</span>
                      <span className="font-medium">Desactivada</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Retención:</span>
                      <span className="font-medium">30 días</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: "security",
            title: "Seguridad de Datos",
            icon: <Shield className="h-5 w-5" />,
            iconColor: "text-red-500",
            content: (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Configure políticas de seguridad, encriptación y acceso a datos sensibles.
                </p>
                <div className="p-4 border rounded-md bg-muted/40">
                  <h4 className="font-medium mb-2">Configuración de Seguridad</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Política RLS:</span>
                      <span className="font-medium">Activa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Encriptación:</span>
                      <span className="font-medium">AES-256</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default DataSettings;
