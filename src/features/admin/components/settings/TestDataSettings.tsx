
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Database } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

interface TestDataSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const TestDataSettings: React.FC<TestDataSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-500" />
          Generador de Datos de Prueba
        </CardTitle>
        <CardDescription>
          Configura la herramienta de generación de datos de prueba
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableTestDataGenerator">Habilitar generador de datos</Label>
            <p className="text-sm text-muted-foreground">
              Activa la funcionalidad de generación de datos de prueba para administradores
            </p>
          </div>
          <Switch
            id="enableTestDataGenerator"
            checked={featuresConfig.enableTestDataGenerator}
            onCheckedChange={(value) => onToggleFeature('enableTestDataGenerator', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
