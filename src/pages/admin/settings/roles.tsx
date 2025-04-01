
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const RolesAndPermissions: React.FC = () => {
  return (
    <AdminPageLayout 
      title="Roles y Permisos" 
      subtitle="Administra los roles de usuario y sus permisos en el sistema"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Gestión de Roles</CardTitle>
            </div>
            <CardDescription>
              Define y personaliza los roles de usuario y sus capacidades en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              La gestión de roles te permite controlar qué usuarios tienen acceso a diferentes
              partes del sistema y qué acciones pueden realizar dentro de ellas.
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

export default RolesAndPermissions;
