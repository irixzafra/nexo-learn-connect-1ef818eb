
import React from 'react';
import { useFeatures } from '@/hooks/useFeatures';
import FeatureAccordionGroup from './FeatureAccordionGroup';
import type { ExtendedFeatureId } from '@/contexts/features/types';

const PlatformFeaturesAccordion: React.FC = () => {
  const { featuresConfig } = useFeatures();

  const coreFeatures = [
    {
      id: 'enableDarkMode' as ExtendedFeatureId,
      name: 'Modo oscuro',
      description: 'Permite a los usuarios cambiar entre temas claro y oscuro.',
    },
    {
      id: 'enableNotifications' as ExtendedFeatureId,
      name: 'Sistema de notificaciones',
      description: 'Habilita las notificaciones en tiempo real para los usuarios.',
    },
    {
      id: 'enableAnalytics' as ExtendedFeatureId,
      name: 'Analíticas',
      description: 'Recolecta datos anónimos de uso para mejorar la plataforma.',
    },
    {
      id: 'enableThemingOptions' as ExtendedFeatureId,
      name: 'Opciones de tema',
      description: 'Permite personalizar colores y apariencia de la plataforma.',
    },
  ];

  const userFeatures = [
    {
      id: 'enableUserFeedback' as ExtendedFeatureId,
      name: 'Retroalimentación',
      description: 'Permite a los usuarios enviar comentarios y sugerencias.',
    },
    {
      id: 'enableEmailNotifications' as ExtendedFeatureId,
      name: 'Notificaciones por email',
      description: 'Envía actualizaciones importantes por correo electrónico.',
    },
    {
      id: 'enableSocialSharing' as ExtendedFeatureId,
      name: 'Compartir en redes sociales',
      description: 'Permite compartir contenido en plataformas sociales.',
    },
    {
      id: 'enableDashboardCustomization' as ExtendedFeatureId,
      name: 'Personalización del dashboard',
      description: 'Permite a los usuarios personalizar su panel principal.',
      isExperimental: true,
    },
  ];

  return (
    <div className="space-y-8">
      <FeatureAccordionGroup title="Características principales" features={coreFeatures} />
      <FeatureAccordionGroup title="Características de usuario" features={userFeatures} />
    </div>
  );
};

export default PlatformFeaturesAccordion;
