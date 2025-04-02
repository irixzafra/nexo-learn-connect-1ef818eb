
import React from 'react';
import { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';

interface LocalizationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading: boolean;
}

const LocalizationSettings: React.FC<LocalizationSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Localización
        </h2>
        <p className="text-muted-foreground">
          Configura las opciones de internacionalización y localización
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Idiomas</CardTitle>
          <CardDescription>
            Gestiona los idiomas y opciones de traducción
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableMultiLanguage">Soporte Multi-idioma</Label>
              <p className="text-sm text-muted-foreground">Habilitar soporte para múltiples idiomas</p>
            </div>
            <Switch
              id="enableMultiLanguage"
              checked={!!featuresConfig.enableMultiLanguage}
              onCheckedChange={(checked) => onToggleFeature('enableMultiLanguage', checked)}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableHreflangTags">Etiquetas Hreflang</Label>
              <p className="text-sm text-muted-foreground">Añadir etiquetas hreflang para SEO multilingüe</p>
            </div>
            <Switch
              id="enableHreflangTags"
              checked={!!featuresConfig.enableHreflangTags}
              onCheckedChange={(checked) => onToggleFeature('enableHreflangTags', checked)}
              disabled={isLoading || !featuresConfig.enableMultiLanguage}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableRegionalContent">Contenido Regional</Label>
              <p className="text-sm text-muted-foreground">Habilitar personalización de contenido por región</p>
            </div>
            <Switch
              id="enableRegionalContent"
              checked={!!featuresConfig.enableRegionalContent}
              onCheckedChange={(checked) => onToggleFeature('enableRegionalContent', checked)}
              disabled={isLoading || !featuresConfig.enableMultiLanguage}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableLangPrefixUrls">URLs con Prefijo de Idioma</Label>
              <p className="text-sm text-muted-foreground">Añadir prefijos de idioma a las URLs (ej: /es/inicio)</p>
            </div>
            <Switch
              id="enableLangPrefixUrls"
              checked={!!featuresConfig.enableLangPrefixUrls}
              onCheckedChange={(checked) => onToggleFeature('enableLangPrefixUrls', checked)}
              disabled={isLoading || !featuresConfig.enableMultiLanguage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalizationSettings;
