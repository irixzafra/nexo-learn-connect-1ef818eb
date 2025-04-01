
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  DatabaseZap, 
  Database, 
  Server, 
  Construction,
  Loader2
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';

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
  const dataSections: SettingsSection[] = [
    {
      id: "database",
      title: "Base de Datos",
      icon: <Database className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Modo Desarrollo DB</h3>
              <p className="text-xs text-muted-foreground">
                Muestra SQL queries en consola para depuración
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                Solo usar en desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableDatabaseDevMode"
                checked={featuresConfig.enableDatabaseDevMode}
                onCheckedChange={(value) => onToggleFeature('enableDatabaseDevMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Generador de Datos de Prueba</h3>
              <p className="text-xs text-muted-foreground">
                Habilita la generación de datos de prueba
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableTestDataGenerator"
                checked={featuresConfig.enableTestDataGenerator}
                onCheckedChange={(value) => onToggleFeature('enableTestDataGenerator', value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "backups",
      title: "Respaldos",
      icon: <Server className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Respaldos Automáticos</h3>
              <p className="text-xs text-muted-foreground">
                Programación de respaldos automáticos
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableAutoBackups"
                checked={featuresConfig.enableAutoBackups}
                onCheckedChange={(value) => onToggleFeature('enableAutoBackups', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Modo Mantenimiento</h3>
              <p className="text-xs text-muted-foreground">
                Pone la plataforma en modo mantenimiento
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableMaintenanceMode"
                checked={featuresConfig.enableMaintenanceMode}
                onCheckedChange={(value) => onToggleFeature('enableMaintenanceMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "performance",
      title: "Rendimiento",
      icon: <DatabaseZap className="h-5 w-5" />,
      iconColor: "text-yellow-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Caché de Consultas</h3>
              <p className="text-xs text-muted-foreground">
                Mejora rendimiento almacenando resultados en caché
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableQueryCache"
                checked={featuresConfig.enableQueryCache}
                onCheckedChange={(value) => onToggleFeature('enableQueryCache', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm">Limpiar Caché</Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <SettingsAccordion 
      sections={dataSections} 
      title="Datos"
      description="Administra la configuración de datos y respaldos"
    />
  );
};

export default DataSettings;
