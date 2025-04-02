
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Database, TestTube } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TestDataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const TestDataSettings: React.FC<TestDataSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TestTube className="h-5 w-5 text-primary" />
          Datos de Prueba
        </h2>
        <p className="text-muted-foreground">
          Configura las opciones para generar y gestionar datos de prueba
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generador de Datos de Prueba</CardTitle>
          <CardDescription>
            Configura el generador de datos de prueba para desarrollo y pruebas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableTestDataGenerator">Generador de Datos de Prueba</Label>
              <p className="text-sm text-muted-foreground">Habilitar herramienta para generar datos de prueba</p>
            </div>
            <Switch
              id="enableTestDataGenerator"
              checked={!!featuresConfig.enableTestDataGenerator}
              onCheckedChange={(checked) => onToggleFeature('enableTestDataGenerator', checked)}
              disabled={isLoading}
            />
          </div>
          
          {featuresConfig.enableTestDataGenerator && (
            <Alert className="mt-4">
              <AlertDescription>
                El generador de datos de prueba está habilitado. Esto es recomendado solo para entornos de desarrollo y pruebas.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableDatabaseDevMode">Modo Desarrollo de Base de Datos</Label>
              <p className="text-sm text-muted-foreground">Habilitar modo de desarrollo para la base de datos</p>
            </div>
            <Switch
              id="enableDatabaseDevMode"
              checked={!!featuresConfig.enableDatabaseDevMode}
              onCheckedChange={(checked) => onToggleFeature('enableDatabaseDevMode', checked)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestDataSettings;
