
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Database } from 'lucide-react';

interface DataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Configuración de Datos
        </h2>
        <p className="text-muted-foreground">
          Gestiona cómo se manejan y almacenan los datos en el sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Datos</CardTitle>
          <CardDescription>
            Configure opciones relacionadas con el manejo de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableQueryCache">Caché de Consultas</Label>
              <p className="text-sm text-muted-foreground">Habilitar caché para consultas de datos</p>
            </div>
            <Switch
              id="enableQueryCache"
              checked={!!featuresConfig.enableQueryCache}
              onCheckedChange={(checked) => onToggleFeature('enableQueryCache', checked)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSettings;
