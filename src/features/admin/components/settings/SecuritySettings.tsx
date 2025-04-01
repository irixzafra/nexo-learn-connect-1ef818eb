
import React from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Users, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';

interface SecuritySettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const securitySections: SettingsSection[] = [
    {
      id: "authentication",
      title: "Autenticación",
      icon: <Key className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Autenticación de dos factores</h3>
              <p className="text-xs text-muted-foreground">
                Requiere autenticación de dos factores para todos los usuarios
              </p>
            </div>
            <Switch
              id="enable2FA"
              checked={featuresConfig.enable2FA}
              onCheckedChange={(value) => onToggleFeature('enable2FA', value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="passwordPolicy">Política de contraseñas</Label>
            <Select defaultValue="strong">
              <SelectTrigger id="passwordPolicy">
                <SelectValue placeholder="Seleccionar política" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Básica</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="strong">Fuerte</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Define la complejidad requerida para las contraseñas
            </p>
          </div>
        </div>
      )
    },
    {
      id: "sessions",
      title: "Sesiones",
      icon: <Clock className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="sessionTimeout">Tiempo de expiración de sesión</Label>
            <div className="flex items-center gap-2">
              <Input id="sessionTimeout" type="number" defaultValue="60" />
              <span className="text-sm text-muted-foreground">minutos</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tiempo de inactividad antes de cerrar la sesión
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Sesiones múltiples</h3>
              <p className="text-xs text-muted-foreground">
                Permite múltiples sesiones activas para un mismo usuario
              </p>
            </div>
            <Switch
              id="enableMultipleSessions"
              checked={featuresConfig.enableMultipleSessions}
              onCheckedChange={(value) => onToggleFeature('enableMultipleSessions', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "permissions",
      title: "Permisos",
      icon: <Lock className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Registro público</h3>
              <p className="text-xs text-muted-foreground">
                Permite que cualquier persona se registre en la plataforma
              </p>
            </div>
            <Switch
              id="enablePublicRegistration"
              checked={featuresConfig.enablePublicRegistration}
              onCheckedChange={(value) => onToggleFeature('enablePublicRegistration', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Verificación de email</h3>
              <p className="text-xs text-muted-foreground">
                Requiere verificación de email para nuevas cuentas
              </p>
            </div>
            <Switch
              id="requireEmailVerification"
              checked={featuresConfig.requireEmailVerification}
              onCheckedChange={(value) => onToggleFeature('requireEmailVerification', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "audit",
      title: "Auditoría",
      icon: <AlertTriangle className="h-5 w-5" />,
      iconColor: "text-red-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Registro de actividad</h3>
              <p className="text-xs text-muted-foreground">
                Mantiene un registro de todas las acciones de los usuarios
              </p>
            </div>
            <Switch
              id="enableActivityLog"
              checked={featuresConfig.enableActivityLog}
              onCheckedChange={(value) => onToggleFeature('enableActivityLog', value)}
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="logRetention">Retención de registros</Label>
            <Select defaultValue="90">
              <SelectTrigger id="logRetention">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 días</SelectItem>
                <SelectItem value="90">90 días</SelectItem>
                <SelectItem value="365">1 año</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Tiempo de retención de los registros de actividad
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-green-600">
          <ShieldCheck className="h-5 w-5" />
          Seguridad
        </h1>
        <p className="text-muted-foreground">
          Configura las opciones de seguridad del sistema
        </p>
      </div>

      <SettingsAccordion sections={securitySections} />
    </div>
  );
};

export default SecuritySettings;
