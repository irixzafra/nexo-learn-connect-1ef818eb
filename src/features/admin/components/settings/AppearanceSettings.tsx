
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Paintbrush, Globe, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
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
  const { designFeatureEnabled, toggleDesignFeature } = useDesignSystem();
  const navigate = useNavigate();

  const handleToggleDesignSystem = async (value: boolean) => {
    await toggleDesignFeature(value);
  };
  
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
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableDesignSystem">Sistema de Diseño</Label>
            <p className="text-sm text-muted-foreground">
              Activa o desactiva el sistema de personalización de diseño
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableDesignSystem"
              checked={designFeatureEnabled}
              onCheckedChange={handleToggleDesignSystem}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className={`mt-2 p-4 rounded-lg ${designFeatureEnabled ? 'bg-green-50' : 'bg-amber-50'}`}>
          <div className="flex items-start gap-3">
            <Paintbrush className={`h-5 w-5 mt-0.5 ${designFeatureEnabled ? 'text-green-600' : 'text-amber-600'}`} />
            <div>
              <p className={`text-sm font-medium ${designFeatureEnabled ? 'text-green-800' : 'text-amber-800'}`}>
                {designFeatureEnabled ? 'Sistema de Diseño Activo' : 'Sistema de Diseño Desactivado'}
              </p>
              <p className={`text-xs ${designFeatureEnabled ? 'text-green-700' : 'text-amber-700'} mt-1`}>
                {designFeatureEnabled 
                  ? 'Los usuarios pueden personalizar los colores, tipografías y estilos de la plataforma.' 
                  : 'La personalización de diseño está desactivada. Los usuarios no pueden modificar el aspecto visual de la plataforma.'
                }
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className={`px-0 py-0 h-auto mt-2 ${designFeatureEnabled ? 'text-green-700' : 'text-amber-700'}`}
                onClick={() => navigate('/admin/design')}
              >
                Ir al Sistema de Diseño →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
