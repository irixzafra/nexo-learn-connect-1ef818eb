
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Layout, 
  FileText, 
  Trophy, 
  Layers,
  Edit,
  Tag
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/features/types';

interface ContentSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Layout className="h-5 w-5 text-primary" />
          Contenido
        </h2>
        <p className="text-muted-foreground">
          Configura opciones relacionadas con el contenido y categorías
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Editor de contenido
            </CardTitle>
            <CardDescription>Opciones para el editor de contenido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="advancedEditor">Editor Avanzado</Label>
                <p className="text-sm text-muted-foreground">Activar editor avanzado con más opciones</p>
              </div>
              <Switch
                id="advancedEditor"
                checked={!!featuresConfig.enableAdvancedEditor}
                onCheckedChange={(checked) => onToggleFeature('enableAdvancedEditor', checked)}
                disabled={isLoading}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contentReordering">Reordenación de Contenido</Label>
                <p className="text-sm text-muted-foreground">Permitir reordenar contenido mediante arrastrar y soltar</p>
              </div>
              <Switch
                id="contentReordering"
                checked={featuresConfig.enableContentReordering}
                onCheckedChange={(checked) => onToggleFeature('enableContentReordering', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Categorías
            </CardTitle>
            <CardDescription>Gestión de categorías y etiquetas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="categoryManagement">Gestión de Categorías</Label>
                <p className="text-sm text-muted-foreground">Activar gestión avanzada de categorías</p>
              </div>
              <Switch
                id="categoryManagement"
                checked={featuresConfig.enableCategoryManagement}
                onCheckedChange={(checked) => onToggleFeature('enableCategoryManagement', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Gamificación
            </CardTitle>
            <CardDescription>Elementos de gamificación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="leaderboard">Tabla de Clasificación</Label>
                <p className="text-sm text-muted-foreground">Activar tabla de clasificación y competencia</p>
              </div>
              <Switch
                id="leaderboard"
                checked={!!featuresConfig.enableLeaderboard}
                onCheckedChange={(checked) => onToggleFeature('enableLeaderboard', checked)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentSettings;
