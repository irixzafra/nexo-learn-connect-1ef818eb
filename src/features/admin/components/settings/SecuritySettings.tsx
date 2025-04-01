import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, Shield, Users, Mail, Construction, Activity, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FeaturesConfig } from '@/contexts/features/types';

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
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="h-4 w-4 text-red-500" />
          Seguridad
        </CardTitle>
        <CardDescription className="text-xs">
          Configura las opciones de seguridad del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Autenticación de dos factores</h3>
            <p className="text-xs text-muted-foreground">
              Habilita 2FA para mayor seguridad
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
              id="enable2FA"
              checked={featuresConfig.enable2FA}
              onCheckedChange={(value) => onToggleFeature('enable2FA', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Sesiones múltiples</h3>
            <p className="text-xs text-muted-foreground">
              Permite iniciar sesión desde múltiples dispositivos
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableMultipleSessions"
              checked={featuresConfig.enableMultipleSessions}
              onCheckedChange={(value) => onToggleFeature('enableMultipleSessions', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Registro público</h3>
            <p className="text-xs text-muted-foreground">
              Permite que cualquier persona se registre
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enablePublicRegistration"
              checked={featuresConfig.enablePublicRegistration}
              onCheckedChange={(value) => onToggleFeature('enablePublicRegistration', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Verificación de correo</h3>
            <p className="text-xs text-muted-foreground">
              Requiere verificar el email al registrarse
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="requireEmailVerification"
              checked={featuresConfig.requireEmailVerification}
              onCheckedChange={(value) => onToggleFeature('requireEmailVerification', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Registro de actividad</h3>
            <p className="text-xs text-muted-foreground">
              Guarda un historial de acciones de usuarios
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableActivityLog"
              checked={featuresConfig.enableActivityLog}
              onCheckedChange={(value) => onToggleFeature('enableActivityLog', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
