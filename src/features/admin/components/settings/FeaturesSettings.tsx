
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';
import { Loader2, ToggleRight } from 'lucide-react';

interface FeatureItem {
  id: keyof FeaturesConfig;
  title: string;
  description: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  comingSoon?: boolean;
}

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
  // Define all features
  const allFeatures: FeatureItem[] = [
    {
      id: 'enableSocial',
      title: 'Registro con redes sociales',
      description: 'Permite iniciar sesión con Google, Facebook, etc.',
    },
    {
      id: 'enablePasswordPolicy',
      title: 'Políticas de contraseñas',
      description: 'Establece requisitos mínimos para contraseñas seguras',
    },
    {
      id: 'enableOfflineMode',
      title: 'Modo offline',
      description: 'Permite acceder a contenido sin conexión',
    },
    {
      id: 'enableNotifications',
      title: 'Notificaciones',
      description: 'Activa notificaciones push en la plataforma',
    },
    {
      id: 'enableUserTracking',
      title: 'Seguimiento de usuarios',
      description: 'Registra la actividad de los usuarios para analíticas',
    },
    {
      id: 'enableGamification',
      title: 'Gamificación',
      description: 'Activa sistema de puntos, niveles y logros',
    },
    {
      id: 'enableCommunity',
      title: 'Comunidad',
      description: 'Habilita foros y espacios de discusión',
    },
    {
      id: 'enableAI',
      title: 'Asistente IA',
      description: 'Integra un asistente impulsado por IA',
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center mb-2">
          <ToggleRight className="h-5 w-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Funcionalidades</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Activa o desactiva las funcionalidades del sistema
        </p>

        <div className="space-y-4">
          {allFeatures.map((feature, index) => (
            <React.Fragment key={feature.id}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="text-base font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.comingSoon && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Próximamente
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {isLoading && (
                    <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                  )}
                  <Switch
                    id={`enable-${feature.id}`}
                    checked={!!featuresConfig[feature.id]}
                    onCheckedChange={(value) => onToggleFeature(feature.id, value)}
                    disabled={isLoading || feature.disabled}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSettings;
