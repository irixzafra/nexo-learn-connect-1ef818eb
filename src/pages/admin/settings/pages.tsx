
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const PagesManagement: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Gestión de Páginas" 
      subtitle="Administra las páginas públicas y privadas de la plataforma"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Páginas del Sistema</CardTitle>
            </div>
            <CardDescription>
              Crea y edita páginas personalizadas para tu plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              El gestor de páginas te permite crear y administrar todo el contenido
              estático de la plataforma, como la página de inicio, sobre nosotros, etc.
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

export default PagesManagement;
