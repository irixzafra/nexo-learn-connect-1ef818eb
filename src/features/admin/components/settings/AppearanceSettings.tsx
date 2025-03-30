
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Paintbrush, Palette, Monitor } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';

interface AppearanceSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5 text-blue-500" />
          Configuración de Apariencia
        </CardTitle>
        <CardDescription>
          Personaliza la apariencia y las opciones visuales del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableThemeSwitcher">Selector de tema</Label>
            <p className="text-sm text-muted-foreground">
              Permite a los usuarios cambiar entre temas claro, oscuro y otros
            </p>
          </div>
          <Switch
            id="enableThemeSwitcher"
            checked={featuresConfig.enableThemeSwitcher}
            onCheckedChange={(value) => onToggleFeature('enableThemeSwitcher', value)}
          />
        </div>
        
        <Separator />
        
        {/* Aquí podrían ir más opciones de apariencia en el futuro */}
      </CardContent>
    </Card>
  );
};
