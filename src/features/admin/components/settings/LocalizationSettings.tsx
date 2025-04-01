
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Locale, Globe, Loader2 } from 'lucide-react';
import { useFeatures } from '@/hooks/useFeatures';
import type { FeaturesConfig } from '@/contexts/features/types';

interface LocalizationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const LocalizationSettings: React.FC<LocalizationSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-indigo-500" />
          Localización
        </CardTitle>
        <CardDescription>
          Configura idiomas y regionalización de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableMultiLanguage">Soporte multiidioma</Label>
            <p className="text-sm text-muted-foreground">
              Habilita la traducción de la plataforma a múltiples idiomas
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

export default LocalizationSettings;
