
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFeatures } from '@/hooks/useFeatures';

const DesignPage: React.FC = () => {
  const { featuresConfig, toggleFeature } = useFeatures();

  return (
    <AdminPageLayout 
      title="Diseño del Sistema" 
      subtitle="Personaliza la apariencia visual de la plataforma"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Configuración de Diseño</CardTitle>
            </div>
            <CardDescription>
              Personaliza colores, fuentes y otros elementos visuales del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              La configuración de diseño te permite personalizar la apariencia visual de la plataforma
              según las necesidades de tu organización.
            </p>
            <Separator className="my-4" />
            <div className="space-y-4">
              <p>Funcionalidad en desarrollo. Próximamente disponible.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default DesignPage;
