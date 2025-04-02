
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Paintbrush, 
  Globe, 
  Monitor,
  Sun,
  Moon
} from 'lucide-react';
import { toast } from 'sonner';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Button } from '@/components/ui/button';

interface AppearanceSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  const handleApplyTheme = (theme: string) => {
    toast.success(`Tema aplicado: ${theme}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Apariencia
        </h2>
        <p className="text-muted-foreground">
          Personaliza el aspecto y comportamiento visual de la plataforma
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paintbrush className="h-5 w-5" />
              Sistema de Diseño
            </CardTitle>
            <CardDescription>Configuración del sistema de diseño</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="designSystem">Sistema de Diseño Avanzado</Label>
                <p className="text-sm text-muted-foreground">Activar sistema de diseño personalizable</p>
              </div>
              <Switch
                id="designSystem"
                checked={!!featuresConfig.designSystemEnabled}
                onCheckedChange={(checked) => onToggleFeature('designSystemEnabled', checked)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="themeSwitcher">Selector de Temas</Label>
                <p className="text-sm text-muted-foreground">Permitir a los usuarios cambiar entre temas</p>
              </div>
              <Switch
                id="themeSwitcher"
                checked={!!featuresConfig.enableThemeSwitcher}
                onCheckedChange={(checked) => onToggleFeature('enableThemeSwitcher', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Internacionalización
            </CardTitle>
            <CardDescription>Configuración de idiomas y localización</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiLanguage">Soporte Multi-idioma</Label>
                <p className="text-sm text-muted-foreground">Activar soporte para múltiples idiomas</p>
              </div>
              <Switch
                id="multiLanguage"
                checked={!!featuresConfig.enableMultiLanguage}
                onCheckedChange={(checked) => onToggleFeature('enableMultiLanguage', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Temas Predefinidos
            </CardTitle>
            <CardDescription>Selecciona un tema predefinido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 h-24 justify-start p-4"
                onClick={() => handleApplyTheme('Claro')}
              >
                <Sun className="h-5 w-5 text-amber-500" />
                <div className="text-left">
                  <div className="font-medium">Tema Claro</div>
                  <div className="text-xs text-muted-foreground">Interfaz con fondo claro</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 h-24 justify-start p-4"
                onClick={() => handleApplyTheme('Oscuro')}
              >
                <Moon className="h-5 w-5 text-indigo-400" />
                <div className="text-left">
                  <div className="font-medium">Tema Oscuro</div>
                  <div className="text-xs text-muted-foreground">Interfaz con fondo oscuro</div>
                </div>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Los cambios de tema se aplicarán inmediatamente a todos los usuarios
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppearanceSettings;
