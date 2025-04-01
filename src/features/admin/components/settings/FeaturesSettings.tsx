
import React from 'react';
import { 
  ToggleRight, 
  Shield, 
  MessageCircle, 
  Users, 
  FileText, 
  Boxes, 
  Cog,
  Bell,
  Palette,
  Zap
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';

interface FeaturesSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const FeaturesSettings: React.FC<FeaturesSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const featuresSections: SettingsSection[] = [
    {
      id: "apariencia",
      title: "Apariencia",
      icon: <Palette className="h-5 w-5" />,
      iconColor: "text-purple-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Selector de temas</h3>
              <p className="text-xs text-muted-foreground">
                Permite a los usuarios cambiar entre tema claro y oscuro
              </p>
            </div>
            <Switch
              id="enableThemeSwitcher"
              checked={featuresConfig.enableThemeSwitcher}
              onCheckedChange={(value) => onToggleFeature('enableThemeSwitcher', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Soporte multilenguaje</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el soporte para múltiples idiomas
              </p>
            </div>
            <Switch
              id="enableMultiLanguage"
              checked={featuresConfig.enableMultiLanguage}
              onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "contenido",
      title: "Contenido",
      icon: <FileText className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Edición en línea</h3>
              <p className="text-xs text-muted-foreground">
                Permite editar el contenido directamente en la página
              </p>
            </div>
            <Switch
              id="enableEditMode"
              checked={featuresConfig.enableEditMode}
              onCheckedChange={(value) => onToggleFeature('enableEditMode', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Editor avanzado</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el editor avanzado para el contenido
              </p>
            </div>
            <Switch
              id="enableAdvancedEditor"
              checked={featuresConfig.enableAdvancedEditor}
              onCheckedChange={(value) => onToggleFeature('enableAdvancedEditor', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "usuarios",
      title: "Usuarios",
      icon: <Users className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Invitaciones</h3>
              <p className="text-xs text-muted-foreground">
                Permite a los usuarios invitar a otros usuarios
              </p>
            </div>
            <Switch
              id="enableInvitations"
              checked={featuresConfig.enableInvitations}
              onCheckedChange={(value) => onToggleFeature('enableInvitations', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Roles personalizados</h3>
              <p className="text-xs text-muted-foreground">
                Permite crear roles personalizados para los usuarios
              </p>
            </div>
            <Switch
              id="enableCustomRoles"
              checked={featuresConfig.enableCustomRoles}
              onCheckedChange={(value) => onToggleFeature('enableCustomRoles', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "notificaciones",
      title: "Notificaciones",
      icon: <Bell className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Notificaciones en tiempo real</h3>
              <p className="text-xs text-muted-foreground">
                Habilita las notificaciones en tiempo real
              </p>
            </div>
            <Switch
              id="enableRealTimeNotifications"
              checked={featuresConfig.enableRealTimeNotifications}
              onCheckedChange={(value) => onToggleFeature('enableRealTimeNotifications', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Notificaciones por email</h3>
              <p className="text-xs text-muted-foreground">
                Envía notificaciones por email
              </p>
            </div>
            <Switch
              id="enableEmailNotifications"
              checked={featuresConfig.enableEmailNotifications}
              onCheckedChange={(value) => onToggleFeature('enableEmailNotifications', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    },
    {
      id: "avanzado",
      title: "Funciones Avanzadas",
      icon: <Zap className="h-5 w-5" />,
      iconColor: "text-red-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">API pública</h3>
              <p className="text-xs text-muted-foreground">
                Habilita el acceso a la API pública
              </p>
            </div>
            <Switch
              id="enablePublicApi"
              checked={featuresConfig.enablePublicApi}
              onCheckedChange={(value) => onToggleFeature('enablePublicApi', value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Webhooks</h3>
              <p className="text-xs text-muted-foreground">
                Permite configurar webhooks para eventos
              </p>
            </div>
            <Switch
              id="enableWebhooks"
              checked={featuresConfig.enableWebhooks}
              onCheckedChange={(value) => onToggleFeature('enableWebhooks', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2 text-purple-600">
          <ToggleRight className="h-5 w-5" />
          Funcionalidades
        </h1>
        <p className="text-muted-foreground">
          Activa o desactiva las funcionalidades del sistema
        </p>
      </div>

      <SettingsAccordion sections={featuresSections} />
    </div>
  );
};

export default FeaturesSettings;
