
import React from 'react';
import PermissionGuard from '../PermissionGuard';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Shield, AlertTriangle, Lock } from 'lucide-react';

export default function PermissionExample() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ejemplo de Sistema de Permisos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Admin actions */}
        <PermissionGuard permission="system:manage">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Acciones de Administrador
              </CardTitle>
              <CardDescription>Estas acciones requieren permisos de administrador</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Con este permiso puedes administrar todo el sistema.</p>
            </CardContent>
            <CardFooter>
              <Button>Configurar Sistema</Button>
            </CardFooter>
          </Card>
        </PermissionGuard>
        
        {/* Instructor actions */}
        <PermissionGuard permission="courses:edit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Acciones de Instructor
              </CardTitle>
              <CardDescription>Estas acciones requieren permisos de instructor</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Con este permiso puedes editar cursos existentes.</p>
            </CardContent>
            <CardFooter>
              <Button>Editar Cursos</Button>
            </CardFooter>
          </Card>
        </PermissionGuard>
        
        {/* User actions - always visible */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones de Usuario</CardTitle>
            <CardDescription>Todos los usuarios pueden ver esto</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Cualquier usuario puede acceder a esta funcionalidad.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Ver Perfil</Button>
          </CardFooter>
        </Card>
        
        {/* Restricted action with fallback */}
        <PermissionGuard 
          permission="users:manage"
          fallback={
            <Card className="border-dashed border-muted-foreground/20">
              <CardHeader>
                <CardTitle className="text-muted-foreground flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Acceso Restringido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4 text-center text-muted-foreground">
                  <AlertTriangle className="h-10 w-10 mb-2" />
                  <p>No tienes permiso para acceder a esta sección.</p>
                </div>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Administra todos los usuarios del sistema.</p>
            </CardContent>
            <CardFooter>
              <Button>Gestionar Usuarios</Button>
            </CardFooter>
          </Card>
        </PermissionGuard>
      </div>
    </div>
  );
}
