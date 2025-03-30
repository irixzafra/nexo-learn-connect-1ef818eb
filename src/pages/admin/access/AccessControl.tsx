import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Shield, Key, UserCheck, LockIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AccessControl: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Control de Acceso",
        description: "Gestiona los permisos y accesos a la plataforma"
      }}
    >
      <Tabs defaultValue="permissions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="permissions">Permisos</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="logs">Registro de Accesos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permisos del Sistema</CardTitle>
              <CardDescription>Administra los permisos disponibles en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">usuarios:leer</TableCell>
                    <TableCell>Ver información de usuarios</TableCell>
                    <TableCell>Usuarios</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">usuarios:escribir</TableCell>
                    <TableCell>Modificar información de usuarios</TableCell>
                    <TableCell>Usuarios</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">cursos:publicar</TableCell>
                    <TableCell>Publicar cursos en la plataforma</TableCell>
                    <TableCell>Cursos</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Roles y Asignación de Permisos</CardTitle>
              <CardDescription>Configura los roles y sus permisos correspondientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>Crear Nuevo Rol</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rol</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Usuarios Asignados</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">admin</TableCell>
                    <TableCell>Acceso completo a la plataforma</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Permisos</Button>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">instructor</TableCell>
                    <TableCell>Gestión de cursos y contenido</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Permisos</Button>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">student</TableCell>
                    <TableCell>Acceso a cursos y contenido educativo</TableCell>
                    <TableCell>254</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Permisos</Button>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Accesos</CardTitle>
              <CardDescription>Historial de intentos de acceso a la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Detalles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>admin@nexo.com</TableCell>
                    <TableCell>2023-10-12 14:22:15</TableCell>
                    <TableCell className="text-green-500">Exitoso</TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>usuario@gmail.com</TableCell>
                    <TableCell>2023-10-12 13:45:02</TableCell>
                    <TableCell className="text-red-500">Fallido</TableCell>
                    <TableCell>186.24.156.78</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

export default AccessControl;
