import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, BookOpen, FileSymlink, Construction, PanelTop, ListTodo, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FeaturesConfig } from '@/contexts/features/types';

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
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <BookOpen className="h-4 w-4 text-orange-500" />
          Contenido
        </CardTitle>
        <CardDescription className="text-xs">
          Configura las opciones relacionadas con la gestión de contenido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Editor avanzado</h3>
            <p className="text-xs text-muted-foreground">
              Habilita el editor avanzado para la creación de contenido
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableAdvancedEditor"
              checked={featuresConfig.enableAdvancedEditor}
              onCheckedChange={(value) => onToggleFeature('enableAdvancedEditor', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Gestión de categorías</h3>
            <p className="text-xs text-muted-foreground">
              Permite crear y administrar categorías para organizar el contenido
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
            <h3 className="text-sm font-medium">Tabla de clasificación</h3>
            <p className="text-xs text-muted-foreground">
              Muestra una tabla de clasificación de usuarios
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableLeaderboard"
              checked={featuresConfig.enableLeaderboard}
              onCheckedChange={(value) => onToggleFeature('enableLeaderboard', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between py-1">
          <div>
            <h3 className="text-sm font-medium">Reordenamiento de contenido</h3>
            <p className="text-xs text-muted-foreground">
              Permite a los usuarios reordenar el contenido
            </p>
          </div>
          <div className="flex items-center">
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
      </CardContent>
    </Card>
  );
};

export default ContentSettings;
