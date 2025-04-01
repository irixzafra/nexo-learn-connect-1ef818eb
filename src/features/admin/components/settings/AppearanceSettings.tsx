
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Paintbrush, Globe, Loader2, Construction, Palette } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Paintbrush className="h-4 w-4 text-pink-500" />
          Apariencia
        </CardTitle>
        <CardDescription className="text-xs">
          Configura la apariencia y las opciones visuales del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Selector de temas</h3>
            <p className="text-xs text-muted-foreground">
              Permite a los usuarios cambiar entre tema claro y oscuro
            </p>
          </div>
          <div className="flex items-center">
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
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Sistema de Diseño</h3>
            <p className="text-xs text-muted-foreground">
              Habilita el sistema de diseño personalizado
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableDesignSystem"
              checked={featuresConfig.enableDesignSystem}
              onCheckedChange={(value) => onToggleFeature('enableDesignSystem', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Soporte multilenguaje</h3>
            <p className="text-xs text-muted-foreground">
              Habilita el soporte para múltiples idiomas
            </p>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
              <Construction className="h-3 w-3 mr-1" />
              En desarrollo
            </Badge>
          </div>
          <div className="flex items-center">
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
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Modo oscuro automático</h3>
            <p className="text-xs text-muted-foreground">
              Cambia el tema automáticamente según preferencias del sistema
            </p>
            <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
              <Construction className="h-3 w-3 mr-1" />
              En desarrollo
            </Badge>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableAutoTheme"
              checked={false}
              disabled={true}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            size="sm"
            onClick={() => navigate('/admin/design')}
          >
            <Palette className="mr-2 h-4 w-4" />
            Configurar Sistema de Diseño
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
