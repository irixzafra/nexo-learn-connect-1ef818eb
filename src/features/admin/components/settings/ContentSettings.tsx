
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FileText, Trophy, Loader2 } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4 text-orange-500" />
          Contenido
        </CardTitle>
        <CardDescription className="text-xs">
          Configura cómo se gestiona el contenido en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Gestión de categorías</h3>
              <p className="text-xs text-muted-foreground">
                Habilita la gestión de categorías para cursos y contenidos
              </p>
            </div>
            <div className="flex items-center">
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
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Edición y ordenación en línea</h3>
              <p className="text-xs text-muted-foreground">
                Permite editar contenido y reordenar elementos directamente en la interfaz
              </p>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableEditMode"
                checked={featuresConfig.enableEditMode}
                onCheckedChange={(value) => onToggleFeature('enableEditMode', value)}
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Leaderboard de gamificación</h3>
              <p className="text-xs text-muted-foreground">
                Activa el sistema de clasificaciones y puntos para estudiantes
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center">
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
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Contenidos interactivos</h3>
              <p className="text-xs text-muted-foreground">
                Permite crear cuestionarios, encuestas y ejercicios interactivos
              </p>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200 mt-1">Próximamente</Badge>
            </div>
            <div className="flex items-center">
              {isLoading && (
                <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
              )}
              <Switch
                id="enableInteractiveContent"
                checked={false}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
