
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Paintbrush, Globe, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-between p-4 rounded-lg border text-center space-y-2">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm">Selector de temas</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Permite a los usuarios cambiar entre tema claro y oscuro
              </p>
            </div>
            <div className="flex items-center pt-2">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableThemeSwitcher"
                checked={featuresConfig.enableThemeSwitcher}
                onCheckedChange={(value) => onToggleFeature('enableThemeSwitcher', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between p-4 rounded-lg border text-center space-y-2">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm">Soporte multilenguaje</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Habilita el soporte para múltiples idiomas
              </p>
            </div>
            <div className="flex items-center pt-2">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableMultiLanguage"
                checked={featuresConfig.enableMultiLanguage}
                onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/admin/design')}
          >
            <Paintbrush className="mr-2 h-4 w-4" />
            Ir al Sistema de Diseño
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
