
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileText, Loader2 } from 'lucide-react';
import type { FeaturesConfig } from '@/contexts/features/types';

interface ContentSettingsProps {
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
          <FileText className="h-5 w-5 text-indigo-500" />
          Contenido
        </CardTitle>
        <CardDescription>
          Configura las opciones relacionadas con el contenido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableCategoryManagement">Gestión de categorías</Label>
            <p className="text-sm text-muted-foreground">
              Permite crear y gestionar categorías personalizadas
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableCategoryManagement"
              checked={!!featuresConfig.enableCategoryManagement}
              onCheckedChange={(value) => onToggleFeature('enableCategoryManagement', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableAdvancedFilters">Filtros avanzados</Label>
            <p className="text-sm text-muted-foreground">
              Habilita filtros avanzados en la búsqueda de contenido
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableAdvancedFilters"
              checked={!!featuresConfig.enableAdvancedFilters}
              onCheckedChange={(value) => onToggleFeature('enableAdvancedFilters', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableMultiLanguage">Contenido multilingüe</Label>
            <p className="text-sm text-muted-foreground">
              Permite localizar el contenido en múltiples idiomas
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableMultiLanguage"
              checked={!!featuresConfig.enableMultiLanguage}
              onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentSettings;
