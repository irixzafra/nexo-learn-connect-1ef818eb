
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Loader2, 
  ToggleRight, 
  Shield, 
  Bell, 
  Users, 
  ChevronDown, 
  ChevronRight, 
  Globe, 
  Layout,
  Database,
  UserCircle,
  Gamepad2,
  MessageCircle,
  Bot,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  features: FeatureItem[];
}

interface FeatureItem {
  id: keyof FeaturesConfig;
  title: string;
  description: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  comingSoon?: boolean;
  category: string;
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
  // State for collapsible sections
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'basic': true,
    'security': true,
    'content': true,
    'users': true,
    'communication': false,
    'learning': false,
    'advanced': false
  });

  // Toggle category open/closed
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Define all features with categories
  const allFeatures: FeatureItem[] = [
    // Basic features
    {
      id: 'enableThemeSwitcher',
      title: 'Cambio de tema',
      description: 'Permite a los usuarios cambiar entre tema claro y oscuro',
      category: 'basic',
      icon: <Layout className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'enableMultiLanguage',
      title: 'Múltiples idiomas',
      description: 'Activa soporte para varios idiomas en la plataforma',
      category: 'basic',
      icon: <Globe className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'enableNotifications',
      title: 'Notificaciones',
      description: 'Activa notificaciones push en la plataforma',
      category: 'basic',
      icon: <Bell className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'enableOfflineMode',
      title: 'Modo offline',
      description: 'Permite acceder a contenido sin conexión',
      category: 'basic',
      icon: <Database className="h-4 w-4 text-blue-500" />
    },
    
    // Security features
    {
      id: 'enableSocial',
      title: 'Registro con redes sociales',
      description: 'Permite iniciar sesión con Google, Facebook, etc.',
      category: 'security',
      icon: <Users className="h-4 w-4 text-green-500" />
    },
    {
      id: 'enablePasswordPolicy',
      title: 'Políticas de contraseñas',
      description: 'Establece requisitos mínimos para contraseñas seguras',
      category: 'security',
      icon: <Shield className="h-4 w-4 text-green-500" />
    },
    
    // Content features
    {
      id: 'enableEditMode',
      title: 'Modo de edición',
      description: 'Habilita la edición de contenidos directamente',
      category: 'content',
      icon: <Layout className="h-4 w-4 text-purple-500" />
    },
    {
      id: 'enableContentReordering',
      title: 'Reordenamiento de contenido',
      description: 'Permite reorganizar el contenido mediante drag & drop',
      category: 'content',
      icon: <Layout className="h-4 w-4 text-purple-500" />
    },
    {
      id: 'enableCategoryManagement',
      title: 'Gestión de categorías',
      description: 'Permite crear y gestionar categorías para el contenido',
      category: 'content',
      icon: <BookOpen className="h-4 w-4 text-purple-500" />
    },
    
    // User tracking & gamification
    {
      id: 'enableUserTracking',
      title: 'Seguimiento de usuarios',
      description: 'Registra la actividad de los usuarios para analíticas',
      category: 'users',
      icon: <UserCircle className="h-4 w-4 text-orange-500" />
    },
    {
      id: 'enableGamification',
      title: 'Gamificación',
      description: 'Activa sistema de puntos, niveles y logros',
      category: 'users',
      icon: <Gamepad2 className="h-4 w-4 text-orange-500" />
    },
    {
      id: 'enableLeaderboard',
      title: 'Tabla de clasificación',
      description: 'Muestra los mejores usuarios en diferentes categorías',
      category: 'users',
      icon: <Users className="h-4 w-4 text-orange-500" />
    },
    
    // Community features
    {
      id: 'enableCommunity',
      title: 'Comunidad',
      description: 'Habilita foros y espacios de discusión',
      category: 'communication',
      icon: <MessageCircle className="h-4 w-4 text-indigo-500" />
    },
    
    // Advanced features
    {
      id: 'enableAI',
      title: 'Asistente IA',
      description: 'Integra un asistente impulsado por IA',
      category: 'advanced',
      icon: <Bot className="h-4 w-4 text-rose-500" />
    },
    {
      id: 'enableAIFeatures',
      title: 'Funciones avanzadas de IA',
      description: 'Activa capacidades avanzadas de inteligencia artificial',
      category: 'advanced',
      icon: <Bot className="h-4 w-4 text-rose-500" />
    },
    {
      id: 'enableDebugMode',
      title: 'Modo debug',
      description: 'Muestra información adicional para desarrolladores',
      category: 'advanced',
      icon: <Database className="h-4 w-4 text-rose-500" />
    }
  ];

  // Organizar features por categoría
  const categories: FeatureCategory[] = [
    {
      id: 'basic',
      title: 'Básicas',
      icon: <ToggleRight className="h-5 w-5 text-blue-500" />,
      features: allFeatures.filter(f => f.category === 'basic')
    },
    {
      id: 'security',
      title: 'Seguridad',
      icon: <Shield className="h-5 w-5 text-green-500" />,
      features: allFeatures.filter(f => f.category === 'security')
    },
    {
      id: 'content',
      title: 'Contenido',
      icon: <Layout className="h-5 w-5 text-purple-500" />,
      features: allFeatures.filter(f => f.category === 'content')
    },
    {
      id: 'users',
      title: 'Usuarios',
      icon: <Users className="h-5 w-5 text-orange-500" />,
      features: allFeatures.filter(f => f.category === 'users')
    },
    {
      id: 'communication',
      title: 'Comunicación',
      icon: <MessageCircle className="h-5 w-5 text-indigo-500" />,
      features: allFeatures.filter(f => f.category === 'communication')
    },
    {
      id: 'advanced',
      title: 'Avanzadas',
      icon: <Bot className="h-5 w-5 text-rose-500" />,
      features: allFeatures.filter(f => f.category === 'advanced')
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

        <div className="space-y-3">
          {categories.map(category => (
            <Collapsible 
              key={category.id} 
              open={openCategories[category.id]} 
              onOpenChange={() => toggleCategory(category.id)}
              className="border rounded-lg"
            >
              <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 flex-1">
                  {category.icon}
                  <span className="font-medium">{category.title}</span>
                </div>
                <div className="text-muted-foreground">
                  {openCategories[category.id] ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-3 border-t pt-2">
                <div className="space-y-3">
                  {category.features.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between py-2">
                      <div className="flex gap-2">
                        {feature.icon}
                        <div>
                          <h3 className="text-sm font-medium">{feature.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                          {feature.comingSoon && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              Próximamente
                            </span>
                          )}
                        </div>
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
                          className={cn(
                            feature.disabled && "opacity-50"
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesSettings;
