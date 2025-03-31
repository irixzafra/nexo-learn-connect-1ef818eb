
import React, { useState } from 'react';
import { Shield, MessageCircle, Users, FileText, Boxes, Cog } from 'lucide-react';
import FeatureAccordionGroup from './FeatureAccordionGroup';
import { toast } from 'sonner';

const PlatformFeaturesAccordion: React.FC = () => {
  // Estado simulado para las características de la plataforma
  const [features, setFeatures] = useState({
    // Básicas
    multiLanguage: true,
    darkMode: true,
    notifications: true,
    // Seguridad
    twoFactor: false,
    multipleSessions: true,
    // Contenido
    advancedEditor: true,
    autoSave: true,
    // Usuarios
    invitations: true,
    customRoles: false,
    // Comunicación
    internalMessages: true,
    emailNotifications: true,
    // Avanzadas
    publicApi: false,
    webhooks: false,
  });

  const handleFeatureChange = (feature: keyof typeof features, value: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: value }));
    
    // Simulamos actualizaciones a la base de datos
    setTimeout(() => {
      toast.success(`Característica "${feature}" ${value ? 'activada' : 'desactivada'}`);
    }, 500);
  };

  const featureGroups = [
    {
      id: 'basics',
      title: 'Básicas',
      icon: <Cog className="h-5 w-5" />,
      features: [
        {
          id: 'multiLanguage',
          name: 'Multi-idioma',
          enabled: features.multiLanguage,
          onChange: (value) => handleFeatureChange('multiLanguage', value)
        },
        {
          id: 'darkMode',
          name: 'Modo oscuro',
          enabled: features.darkMode,
          onChange: (value) => handleFeatureChange('darkMode', value)
        },
        {
          id: 'notifications',
          name: 'Notificaciones',
          enabled: features.notifications,
          onChange: (value) => handleFeatureChange('notifications', value)
        }
      ]
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: <Shield className="h-5 w-5 text-green-500" />,
      features: [
        {
          id: 'twoFactor',
          name: 'Autenticación de dos factores',
          enabled: features.twoFactor,
          onChange: (value) => handleFeatureChange('twoFactor', value)
        },
        {
          id: 'multipleSessions',
          name: 'Sesiones simultáneas',
          enabled: features.multipleSessions,
          onChange: (value) => handleFeatureChange('multipleSessions', value)
        }
      ]
    },
    {
      id: 'content',
      title: 'Contenido',
      icon: <FileText className="h-5 w-5 text-purple-500" />,
      features: [
        {
          id: 'advancedEditor',
          name: 'Editor avanzado',
          enabled: features.advancedEditor,
          onChange: (value) => handleFeatureChange('advancedEditor', value)
        },
        {
          id: 'autoSave',
          name: 'Autoguardado',
          enabled: features.autoSave,
          onChange: (value) => handleFeatureChange('autoSave', value)
        }
      ]
    },
    {
      id: 'users',
      title: 'Usuarios',
      icon: <Users className="h-5 w-5 text-orange-500" />,
      features: [
        {
          id: 'invitations',
          name: 'Invitaciones',
          enabled: features.invitations,
          onChange: (value) => handleFeatureChange('invitations', value)
        },
        {
          id: 'customRoles',
          name: 'Roles personalizados',
          enabled: features.customRoles,
          onChange: (value) => handleFeatureChange('customRoles', value)
        }
      ]
    },
    {
      id: 'communication',
      title: 'Comunicación',
      icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      features: [
        {
          id: 'internalMessages',
          name: 'Mensajes internos',
          enabled: features.internalMessages,
          onChange: (value) => handleFeatureChange('internalMessages', value)
        },
        {
          id: 'emailNotifications',
          name: 'Notificaciones por email',
          enabled: features.emailNotifications,
          onChange: (value) => handleFeatureChange('emailNotifications', value)
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Avanzadas',
      icon: <Boxes className="h-5 w-5 text-red-500" />,
      features: [
        {
          id: 'publicApi',
          name: 'API pública',
          enabled: features.publicApi,
          onChange: (value) => handleFeatureChange('publicApi', value)
        },
        {
          id: 'webhooks',
          name: 'Webhooks',
          enabled: features.webhooks,
          onChange: (value) => handleFeatureChange('webhooks', value)
        }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Activa o desactiva las funcionalidades del sistema</h2>
      <FeatureAccordionGroup 
        groups={featureGroups} 
        variant="default"
        gap="none" 
        type="single"
      />
    </div>
  );
};

export default PlatformFeaturesAccordion;
