
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Users, Globe, BarChart } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-500" />
          Configuración de Seguridad
        </CardTitle>
        <CardDescription>
          Administra las configuraciones de seguridad y acceso del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableRoleManagement">Gestión de roles</Label>
            <p className="text-sm text-muted-foreground">
              Permite la creación y asignación de roles personalizados
            </p>
          </div>
          <Switch
            id="enableRoleManagement"
            checked={featuresConfig.enableRoleManagement}
            onCheckedChange={(value) => onToggleFeature('enableRoleManagement', value)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableRoleSwitcher">Cambio de roles</Label>
            <p className="text-sm text-muted-foreground">
              Permite a los administradores cambiar temporalmente su rol para ver la plataforma como otro tipo de usuario
            </p>
          </div>
          <Switch
            id="enableRoleSwitcher"
            checked={featuresConfig.enableRoleSwitcher}
            onCheckedChange={(value) => onToggleFeature('enableRoleSwitcher', value)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableMultiLanguage">Soporte multiidioma</Label>
            <p className="text-sm text-muted-foreground">
              Activa la funcionalidad de cambio de idioma en la plataforma
            </p>
          </div>
          <Switch
            id="enableMultiLanguage"
            checked={featuresConfig.enableMultiLanguage}
            onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableLeaderboard">Leaderboard</Label>
            <p className="text-sm text-muted-foreground">
              Activa el sistema de clasificación de usuarios y gamificación
            </p>
          </div>
          <Switch
            id="enableLeaderboard"
            checked={featuresConfig.enableLeaderboard}
            onCheckedChange={(value) => onToggleFeature('enableLeaderboard', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
