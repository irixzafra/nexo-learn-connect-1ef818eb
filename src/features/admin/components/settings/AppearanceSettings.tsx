
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Paintbrush, Globe, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

export interface AppearanceSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paintbrush className="h-5 w-5 text-pink-500" />
          Apariencia
        </CardTitle>
        <CardDescription>
          Configura la apariencia y las opciones visuales del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableThemeSwitcher">Selector de temas</Label>
            <p className="text-sm text-muted-foreground">
              Permite a los usuarios cambiar entre tema claro y oscuro
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableThemeSwitcher"
              checked={featuresConfig.enableThemeSwitcher}
              onCheckedChange={(value) => onToggleFeature('enableThemeSwitcher', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableMultiLanguage">Soporte multilenguaje</Label>
            <p className="text-sm text-muted-foreground">
              Habilita el soporte para múltiples idiomas
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableMultiLanguage"
              checked={featuresConfig.enableMultiLanguage}
              onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
