
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { FeaturesSettings } from '@/features/admin/components/settings/FeaturesSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleLeft } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Gestión de Funcionalidades" 
      subtitle="Activa o desactiva las funcionalidades disponibles en la plataforma"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <ToggleLeft className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Funcionalidades del Sistema</CardTitle>
            </div>
            <CardDescription>
              Gestiona qué funcionalidades están disponibles para los usuarios de la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeaturesSettings />
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default Features;
