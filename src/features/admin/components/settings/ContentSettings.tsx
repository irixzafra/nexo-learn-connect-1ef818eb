
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FileText, Trophy, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

export interface ContentSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-orange-500" />
          Contenido
        </CardTitle>
        <CardDescription>
          Configura cómo se gestiona el contenido en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableCategoryManagement">Gestión de categorías</Label>
            <p className="text-sm text-muted-foreground">
              Habilita la gestión de categorías para cursos y contenidos
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableCategoryManagement"
              checked={featuresConfig.enableCategoryManagement}
              onCheckedChange={(value) => onToggleFeature('enableCategoryManagement', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableContentReordering">Reordenamiento de contenido</Label>
            <p className="text-sm text-muted-foreground">
              Permite reordenar módulos y lecciones mediante arrastrar y soltar
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableContentReordering"
              checked={featuresConfig.enableContentReordering}
              onCheckedChange={(value) => onToggleFeature('enableContentReordering', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableLeaderboard">Leaderboard de gamificación</Label>
            <p className="text-sm text-muted-foreground">
              Activa el sistema de clasificaciones y puntos para estudiantes
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableLeaderboard"
              checked={featuresConfig.enableLeaderboard}
              onCheckedChange={(value) => onToggleFeature('enableLeaderboard', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
