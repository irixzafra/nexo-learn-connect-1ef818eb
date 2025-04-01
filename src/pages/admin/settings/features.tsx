
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { FeaturesSettings } from '@/features/admin/components/settings/FeaturesSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';

const Features: React.FC = () => {
  const handleResetFeatures = () => {
    // Esto se implementará cuando se necesite
    toast.info('Esta funcionalidad estará disponible próximamente');
  };

  return (
    <AdminPageLayout 
      title="Gestión de Funcionalidades" 
      subtitle="Activa o desactiva las funcionalidades disponibles en la plataforma"
    >
      <div className="space-y-6">
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>Funcionalidades del Sistema</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleResetFeatures}
                >
                  Restaurar valores por defecto
                </Button>
              </div>
              <CardDescription>
                Gestiona qué funcionalidades están disponibles para los usuarios de la plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FeaturesSettings />
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
    </AdminPageLayout>
  );
};

export default Features;
