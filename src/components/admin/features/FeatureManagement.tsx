
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFeatures } from '@/hooks/useFeatures';
import FeatureAccordionGroup from './FeatureAccordionGroup';
import PlatformFeaturesAccordion from './PlatformFeaturesAccordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Settings, Palette, Users, BookOpen, Trophy, CreditCard, Award, BarChart, Users2, Paintbrush } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/features/types';

export const FeatureManagement: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();
  
  // Feature groups by category
  const contentFeatures = [
    {
      id: 'enableCategoryManagement' as keyof FeaturesConfig,
      name: 'Gestión de categorías',
      description: 'Permite crear y gestionar categorías personalizadas',
    },
    {
      id: 'enableAdvancedFilters' as keyof FeaturesConfig,
      name: 'Filtros avanzados',
      description: 'Habilita filtros avanzados en la búsqueda de contenido',
    },
    {
      id: 'enableMultiLanguage' as keyof FeaturesConfig,
      name: 'Contenido multilingüe',
      description: 'Permite localizar el contenido en múltiples idiomas',
    },
  ];
  
  const gamificationFeatures = [
    {
      id: 'enableGamification' as keyof FeaturesConfig,
      name: 'Gamificación',
      description: 'Activa elementos de gamificación como puntos y niveles',
    },
    {
      id: 'enableLeaderboards' as keyof FeaturesConfig,
      name: 'Tablas de clasificación',
      description: 'Muestra clasificaciones de usuarios basadas en logros',
      isExperimental: true,
    },
    {
      id: 'enableBadges' as keyof FeaturesConfig,
      name: 'Insignias y logros',
      description: 'Sistema de insignias por completar objetivos',
    },
  ];
  
  const userManagementFeatures = [
    {
      id: 'enableAdminTools' as keyof FeaturesConfig,
      name: 'Herramientas administrativas',
      description: 'Funcionalidades avanzadas para administradores',
    },
    {
      id: 'enableLiveChat' as keyof FeaturesConfig,
      name: 'Chat en vivo',
      description: 'Soporte en tiempo real para usuarios',
      isExperimental: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Gestión de características</CardTitle>
        <CardDescription>
          Activa o desactiva funcionalidades de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="platform">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Plataforma</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Gamificación</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Apariencia</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform" className="space-y-4">
            <PlatformFeaturesAccordion />
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <FeatureAccordionGroup
              title="Gestión de contenido"
              features={contentFeatures}
            />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <FeatureAccordionGroup
              title="Gestión de usuarios"
              features={userManagementFeatures}
            />
          </TabsContent>
          
          <TabsContent value="gamification" className="space-y-4">
            <FeatureAccordionGroup
              title="Características de gamificación"
              features={gamificationFeatures}
            />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 border border-dashed">
              <p className="text-sm text-muted-foreground">
                Las opciones de apariencia están siendo rediseñadas y estarán disponibles próximamente.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeatureManagement;
