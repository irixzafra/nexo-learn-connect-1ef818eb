
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Database, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

export interface TestDataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const TestDataSettings: React.FC<TestDataSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-500" />
          Datos de Prueba
        </CardTitle>
        <CardDescription>
          Configuración para los generadores de datos de prueba
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableTestDataGenerator">Habilitar generador de datos</Label>
            <p className="text-sm text-muted-foreground">
              Activa el generador de datos de prueba para entornos de desarrollo
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableTestDataGenerator"
              checked={featuresConfig.enableTestDataGenerator}
              onCheckedChange={(value) => onToggleFeature('enableTestDataGenerator', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
