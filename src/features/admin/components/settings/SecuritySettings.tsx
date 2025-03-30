
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Shield, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

export interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-500" />
          Seguridad y Permisos
        </CardTitle>
        <CardDescription>
          Configura los permisos y roles del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableRoleManagement">Gestión de roles</Label>
            <p className="text-sm text-muted-foreground">
              Permite la gestión de roles para usuarios
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableRoleManagement"
              checked={featuresConfig.enableRoleManagement}
              onCheckedChange={(value) => onToggleFeature('enableRoleManagement', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableRoleSwitcher">Selector de roles</Label>
            <p className="text-sm text-muted-foreground">
              Muestra el selector de roles en la barra de navegación
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableRoleSwitcher"
              checked={featuresConfig.enableRoleSwitcher}
              onCheckedChange={(value) => onToggleFeature('enableRoleSwitcher', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
