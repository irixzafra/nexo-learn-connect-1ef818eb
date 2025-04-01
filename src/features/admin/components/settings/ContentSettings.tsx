
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Image, 
  Layers,
  Upload,
  FileCode,
  Trophy,
  PenSquare,
  Loader2,
  Construction
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import SettingsAccordion, { SettingsSection } from '@/components/admin/settings/SettingsAccordion';
import { Badge } from '@/components/ui/badge';

interface ContentSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const contentSections: SettingsSection[] = [
    {
      id: "editor",
      title: "Editor de Contenido",
      icon: <PenSquare className="h-5 w-5" />,
      iconColor: "text-blue-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Editor Avanzado</h3>
              <p className="text-xs text-muted-foreground">
                Habilita opciones avanzadas de edición
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
              <h3 className="text-sm font-medium">Gestión de Categorías</h3>
              <p className="text-xs text-muted-foreground">
                Permite la creación y edición de categorías
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
        </div>
      )
    },
    {
      id: "media",
      title: "Gestión de Archivos",
      icon: <Image className="h-5 w-5" />,
      iconColor: "text-green-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Optimización de Imágenes</h3>
              <p className="text-xs text-muted-foreground">
                Comprime automáticamente las imágenes subidas
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              <Switch id="imageOptimization" disabled />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Límite de Subida</h3>
              <p className="text-xs text-muted-foreground">
                Tamaño máximo para archivos subidos: 10MB
              </p>
            </div>
            <div className="flex items-center">
              <Switch id="uploadLimit" defaultChecked disabled />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "community",
      title: "Comunidad",
      icon: <Trophy className="h-5 w-5" />,
      iconColor: "text-orange-500",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <h3 className="text-sm font-medium">Tabla de Clasificación</h3>
              <p className="text-xs text-muted-foreground">
                Muestra tabla de clasificación de usuarios
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
              <h3 className="text-sm font-medium">Moderación Automática</h3>
              <p className="text-xs text-muted-foreground">
                Modera automáticamente el contenido generado por usuarios
              </p>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 text-xs border-amber-200 mt-1">
                <Construction className="h-3 w-3 mr-1" />
                En desarrollo
              </Badge>
            </div>
            <div className="flex items-center">
              <Switch id="autoModeration" disabled />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SettingsAccordion 
      sections={contentSections}
      title="Contenido"
      description="Configuración relacionada con la gestión de contenido"
    />
  );
};

export default ContentSettings;
