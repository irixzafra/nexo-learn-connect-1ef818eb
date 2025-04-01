
import React from 'react';
import { ToggleRight, Users, BookOpen, Trophy, CreditCard, Award, BarChart3, MessageSquare, Palette } from 'lucide-react';
import { useFeatures } from '@/hooks/useFeatures';
import { FeatureId, FeatureGroup } from '@/contexts/features/types';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getFeatureDependencies, getFeatureDependents } from '@/contexts/features/dependencies';

const featureGroups: FeatureGroup[] = [
  {
    title: 'Core',
    description: 'Funcionalidades esenciales de la plataforma',
    features: ['user-management', 'courses']
  },
  {
    title: 'Experiencia de Usuario',
    description: 'Funcionalidades que mejoran la experiencia del usuario',
    features: ['gamification', 'theming', 'certificates']
  },
  {
    title: 'Comunidad y Social',
    description: 'Funcionalidades relacionadas con interacción social',
    features: ['community']
  },
  {
    title: 'Administración',
    description: 'Funcionalidades administrativas y de gestión',
    features: ['payment-system', 'analytics']
  }
];

const featureIcons: Record<FeatureId, React.ReactNode> = {
  'user-management': <Users className="h-5 w-5" />,
  'courses': <BookOpen className="h-5 w-5" />,
  'gamification': <Trophy className="h-5 w-5" />,
  'payment-system': <CreditCard className="h-5 w-5" />,
  'certificates': <Award className="h-5 w-5" />,
  'analytics': <BarChart3 className="h-5 w-5" />,
  'community': <MessageSquare className="h-5 w-5" />,
  'theming': <Palette className="h-5 w-5" />
};

const FeatureItem: React.FC<{ featureId: FeatureId }> = ({ featureId }) => {
  const { getFeature, toggleFeature, isEnabled } = useFeatures();
  const feature = getFeature(featureId);
  
  if (!feature) return null;
  
  const dependencies = getFeatureDependencies(featureId);
  const dependents = getFeatureDependents(featureId);
  
  const hasDependencies = dependencies.length > 0;
  const hasDependents = dependents.length > 0;
  const allDependenciesEnabled = dependencies.every(depId => isEnabled(depId));
  const canDisable = !hasDependents || dependents.every(depId => !isEnabled(depId));
  
  const handleToggle = () => {
    toggleFeature(featureId);
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {featureIcons[featureId]}
              <h3 className="text-lg font-medium">{feature.name}</h3>
              {feature.isCore && <Badge variant="secondary">Core</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
            
            {hasDependencies && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1">Depende de:</p>
                <div className="flex flex-wrap gap-1">
                  {dependencies.map(depId => {
                    const dep = getFeature(depId);
                    return (
                      <Badge 
                        key={depId} 
                        variant={isEnabled(depId) ? "outline" : "destructive"}
                        className="text-xs"
                      >
                        {dep?.name || depId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            
            {hasDependents && isEnabled(featureId) && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1">Usado por:</p>
                <div className="flex flex-wrap gap-1">
                  {dependents.map(depId => {
                    const dep = getFeature(depId);
                    return (
                      <Badge 
                        key={depId} 
                        variant={isEnabled(depId) ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {dep?.name || depId}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <Switch 
            checked={feature.enabled} 
            onCheckedChange={handleToggle}
            disabled={
              (feature.isCore) || 
              (!feature.enabled && !allDependenciesEnabled) ||
              (feature.enabled && !canDisable)
            }
          />
        </div>
        
        {!feature.enabled && hasDependencies && !allDependenciesEnabled && (
          <Alert className="mt-3" variant="destructive">
            <AlertDescription>
              Esta funcionalidad requiere habilitar las dependencias indicadas.
            </AlertDescription>
          </Alert>
        )}
        
        {feature.enabled && hasDependents && !canDisable && (
          <Alert className="mt-3">
            <AlertDescription>
              No se puede desactivar porque otras funcionalidades dependen de esta.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const FeatureGroupAccordion: React.FC<{ group: FeatureGroup }> = ({ group }) => {
  return (
    <AccordionItem value={group.title}>
      <AccordionTrigger className="hover:no-underline py-4 px-6">
        <div className="flex flex-col items-start text-left">
          <h3 className="text-lg font-medium">{group.title}</h3>
          <p className="text-sm text-muted-foreground">{group.description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-6 pt-2 pb-4 space-y-2">
          {group.features.map(featureId => (
            <FeatureItem key={featureId} featureId={featureId} />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const FeatureManagement: React.FC = () => {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden">
        {featureGroups.map(group => (
          <FeatureGroupAccordion key={group.title} group={group} />
        ))}
      </Accordion>
      
      <div className="text-sm text-muted-foreground p-2">
        <ToggleRight className="h-4 w-4 inline mr-2" />
        Consejo: Las funcionalidades marcadas como "Core" no pueden ser deshabilitadas.
      </div>
    </div>
  );
};

export default FeatureManagement;
