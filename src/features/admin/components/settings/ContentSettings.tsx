
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileText, ListTree, Folders, MoveHorizontal } from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ContentSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-500" />
          Gestión de Contenido
        </CardTitle>
        <CardDescription>
          Configura las opciones para administrar categorías y contenido del sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableCategoryManagement">Gestión de categorías</Label>
            <p className="text-sm text-muted-foreground">
              Permite crear, editar y eliminar categorías para cursos y contenido
            </p>
          </div>
          <Switch
            id="enableCategoryManagement"
            checked={featuresConfig.enableCategoryManagement}
            onCheckedChange={(value) => onToggleFeature('enableCategoryManagement', value)}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableContentReordering">Reordenación de contenido</Label>
            <p className="text-sm text-muted-foreground">
              Permite reorganizar lecciones, módulos y otros elementos mediante arrastrar y soltar
            </p>
          </div>
          <Switch
            id="enableContentReordering"
            checked={featuresConfig.enableContentReordering}
            onCheckedChange={(value) => onToggleFeature('enableContentReordering', value)}
          />
        </div>
        
        <Separator />
        
        {featuresConfig.enableCategoryManagement && (
          <div className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/admin/categories')}
            >
              <Folders className="mr-2 h-4 w-4" />
              Administrar Categorías
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
