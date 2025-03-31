
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FileText, Trophy, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Badge } from '@/components/ui/badge';

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
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-between p-4 rounded-lg border text-center space-y-2">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm">Gestión de categorías</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Habilita la gestión de categorías para cursos y contenidos
              </p>
            </div>
            <div className="flex items-center pt-2">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableCategoryManagement"
                checked={featuresConfig.enableCategoryManagement}
                onCheckedChange={(value) => onToggleFeature('enableCategoryManagement', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between p-4 rounded-lg border text-center space-y-2">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm">Reordenamiento de contenido</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Permite reordenar módulos y lecciones mediante arrastrar y soltar
              </p>
            </div>
            <div className="flex items-center pt-2">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableContentReordering"
                checked={featuresConfig.enableContentReordering}
                onCheckedChange={(value) => onToggleFeature('enableContentReordering', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-between p-4 rounded-lg border text-center space-y-2">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm">Leaderboard de gamificación</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Activa el sistema de clasificaciones y puntos para estudiantes
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center pt-2">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableLeaderboard"
                checked={featuresConfig.enableLeaderboard}
                onCheckedChange={(value) => onToggleFeature('enableLeaderboard', value)}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
