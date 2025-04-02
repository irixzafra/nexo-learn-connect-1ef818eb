
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BarChart, Loader2 } from 'lucide-react';
import { useFeatures } from '@/hooks/useFeatures';
import type { FeaturesConfig, ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

interface AnalyticsSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: ExtendedFeatureId | FeatureId, value: boolean) => void | Promise<void>;
  isLoading?: boolean;
}

export const AnalyticsSettings: React.FC<AnalyticsSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-indigo-500" />
          Analíticas
        </CardTitle>
        <CardDescription>
          Configura las opciones relacionadas con las analíticas y métricas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableAnalytics">Habilitar analíticas</Label>
            <p className="text-sm text-muted-foreground">
              Recopila datos de uso para mejorar la plataforma
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableAnalytics"
              checked={!!featuresConfig.enableAnalytics}
              onCheckedChange={(value) => onToggleFeature('enableAnalytics', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSettings;
