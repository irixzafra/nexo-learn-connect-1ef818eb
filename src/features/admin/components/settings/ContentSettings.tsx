
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileText, PenSquare } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/features/types';
import InlineEditingSettings from '@/components/admin/settings/InlineEditingSettings';

interface ContentSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (featureId: string, value?: boolean) => Promise<void>;
  isLoading: boolean;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading 
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Gestión de Contenido
          </CardTitle>
          <CardDescription>
            Configura cómo se administra el contenido en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-y-1">
            <div>
              <Label htmlFor="category-management" className="font-medium">Gestión de categorías</Label>
              <p className="text-sm text-muted-foreground">
                Permite crear y gestionar categorías personalizadas
              </p>
            </div>
            <Switch
              id="category-management"
              checked={featuresConfig.enableCategoryManagement}
              onCheckedChange={() => onToggleFeature('enableCategoryManagement')}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between space-y-1">
            <div>
              <Label htmlFor="advanced-filters" className="font-medium">Filtros avanzados</Label>
              <p className="text-sm text-muted-foreground">
                Habilita filtros avanzados en la búsqueda de contenido
              </p>
            </div>
            <Switch
              id="advanced-filters"
              checked={featuresConfig.enableAdvancedFilters}
              onCheckedChange={() => onToggleFeature('enableAdvancedFilters')}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>
      
      <InlineEditingSettings isLoading={isLoading} />
    </div>
  );
};

export default ContentSettings;
