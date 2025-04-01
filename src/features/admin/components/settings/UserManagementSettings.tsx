
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Users, Loader2 } from 'lucide-react';
import { useFeatures } from '@/hooks/useFeatures';
import type { FeaturesConfig } from '@/contexts/features/types';

interface UserManagementSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const UserManagementSettings: React.FC<UserManagementSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isLoading = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-500" />
          Gestión de Usuarios
        </CardTitle>
        <CardDescription>
          Opciones relacionadas con la gestión de usuarios y roles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableUserFeedback">Reporte de usuarios</Label>
            <p className="text-sm text-muted-foreground">
              Permite que los usuarios envíen comentarios y reportes
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableUserFeedback"
              checked={!!featuresConfig.enableUserFeedback}
              onCheckedChange={(value) => onToggleFeature('enableUserFeedback', value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableSocialSharing">Compartir social</Label>
            <p className="text-sm text-muted-foreground">
              Permite a los usuarios compartir contenido en redes sociales
            </p>
          </div>
          <div className="flex items-center">
            {isLoading && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
            )}
            <Switch
              id="enableSocialSharing"
              checked={!!featuresConfig.enableSocialSharing}
              onCheckedChange={(value) => onToggleFeature('enableSocialSharing', value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementSettings;
