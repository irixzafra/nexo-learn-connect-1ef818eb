
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SystemPagesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Páginas del Sistema"
          description="Gestión de páginas principales del sistema"
        />
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Páginas del Sistema</CardTitle>
              <CardDescription>
                Páginas configuradas en el sistema y sus propiedades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">La lista de páginas se mostrará aquí</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemPagesPage;
