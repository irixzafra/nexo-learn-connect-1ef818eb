
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { ToggleRight, Users, BookOpen, Medal, Award, Route, Edit, MousePointer, BarChart3, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
  beta?: boolean;
  coming_soon?: boolean;
}

interface FeaturesSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const FeaturesSettings: React.FC<FeaturesSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  // Simulated features list
  const features: Feature[] = [
    {
      id: 'community',
      name: 'Comunidad',
      description: 'Habilita funciones sociales como grupos, foros y publicaciones',
      enabled: true,
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'finances',
      name: 'Pagos/Finanzas',
      description: 'Activa procesamiento de pagos, suscripciones y facturación',
      enabled: true,
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 'gamification',
      name: 'Gamificación',
      description: 'Puntos, insignias, niveles y tablas de clasificación',
      enabled: false,
      icon: <Medal className="h-5 w-5" />
    },
    {
      id: 'certificates',
      name: 'Certificados',
      description: 'Emite certificados digitales para cursos completados',
      enabled: false,
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 'learning_paths',
      name: 'Rutas de Aprendizaje',
      description: 'Crea secuencias estructuradas de cursos y contenido',
      enabled: true,
      icon: <Route className="h-5 w-5" />
    },
    {
      id: 'inline_editing',
      name: 'Edición Inline',
      description: 'Edita contenido directamente sin cambiar de página',
      enabled: true,
      icon: <Edit className="h-5 w-5" />
    },
    {
      id: 'drag_drop_reordering',
      name: 'Reordenamiento Drag & Drop',
      description: 'Arrastra y suelta para reorganizar contenido',
      enabled: true,
      icon: <MousePointer className="h-5 w-5" />
    },
    {
      id: 'onboarding_tutorial',
      name: 'Tutorial de Onboarding',
      description: 'Guía paso a paso para nuevos usuarios',
      enabled: true,
      icon: <MousePointer className="h-5 w-5" />
    },
    {
      id: 'advanced_analytics',
      name: 'Analíticas Avanzadas',
      description: 'Estadísticas detalladas y reportes avanzados',
      enabled: false,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 'ai_assistant',
      name: 'Asistente IA',
      description: 'Integración de asistentes inteligentes en la plataforma',
      enabled: false,
      icon: <Bot className="h-5 w-5" />,
      coming_soon: true
    }
  ];

  // Additional feature-specific settings based on enabled features
  const onboardingEnabled = features.find(f => f.id === 'onboarding_tutorial')?.enabled || false;
  const communityEnabled = features.find(f => f.id === 'community')?.enabled || false;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Funcionalidades</CardTitle>
          <CardDescription>
            Activa o desactiva módulos y características clave de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="flex items-center justify-between space-x-2 rounded-lg border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{feature.name}</h3>
                      {feature.beta && (
                        <Badge variant="outline" className="text-xs">Beta</Badge>
                      )}
                      {feature.coming_soon && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200">Próximamente</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={feature.enabled} 
                  disabled={feature.coming_soon || isLoading}
                  onCheckedChange={(checked) => {
                    // Simulate toggling the feature
                    console.log(`Toggle feature ${feature.id} to ${checked}`);
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conditional cards based on enabled features */}
      {onboardingEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Onboarding</CardTitle>
            <CardDescription>
              Configura la experiencia de iniciación para nuevos usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="onboarding_auto_start">Iniciar Automáticamente</Label>
                <p className="text-sm text-muted-foreground">
                  Inicia el tutorial automáticamente para nuevos usuarios
                </p>
              </div>
              <Switch 
                id="onboarding_auto_start"
                checked={featuresConfig.autoStartOnboarding || false}
                onCheckedChange={(checked) => onToggleFeature('autoStartOnboarding', checked)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="onboarding_show_manual_button">Mostrar Botón Manual</Label>
                <p className="text-sm text-muted-foreground">
                  Muestra un botón para iniciar el tutorial manualmente
                </p>
              </div>
              <Switch 
                id="onboarding_show_manual_button"
                checked={featuresConfig.showOnboardingTrigger || false}
                onCheckedChange={(checked) => onToggleFeature('showOnboardingTrigger', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {communityEnabled && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Comunidad</CardTitle>
            <CardDescription>
              Opciones para las funcionalidades sociales y de comunidad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="enable_lesson_comments">Comentarios en Lecciones</Label>
                <p className="text-sm text-muted-foreground">
                  Permite a los usuarios comentar en las lecciones
                </p>
              </div>
              <Switch 
                id="enable_lesson_comments"
                checked={true}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="enable_user_messaging">Mensajería entre Usuarios</Label>
                <p className="text-sm text-muted-foreground">
                  Permite la comunicación privada entre usuarios
                </p>
              </div>
              <Switch 
                id="enable_user_messaging"
                checked={true}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notificaciones (siempre visible) */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Configura las opciones de notificaciones de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="enable_notifications">Notificaciones Globales</Label>
              <p className="text-sm text-muted-foreground">
                Habilita el sistema de notificaciones en la plataforma
              </p>
            </div>
            <Switch 
              id="enable_notifications"
              checked={featuresConfig.enableNotifications || false}
              onCheckedChange={(checked) => onToggleFeature('enableNotifications', checked)}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="show_notification_badge">Indicador en Navegación</Label>
              <p className="text-sm text-muted-foreground">
                Muestra indicador de notificaciones no leídas en la navegación
              </p>
            </div>
            <Switch 
              id="show_notification_badge"
              checked={true}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesSettings;
