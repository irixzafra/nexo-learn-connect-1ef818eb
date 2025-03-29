
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import { createAllTestUsers, createTestUser, TestUser } from '@/lib/seed-test-users';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TestUsersPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createdUsers, setCreatedUsers] = useState<any[]>([]);
  
  const handleCreateUsers = async () => {
    setIsLoading(true);
    try {
      const users = await createAllTestUsers();
      setCreatedUsers(users.filter(Boolean));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Creación de Usuarios de Prueba</CardTitle>
            <CardDescription>
              Crea usuarios de prueba con diferentes roles para la aplicación Nexo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Esta herramienta creará los siguientes usuarios de prueba:
              </p>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Contraseña</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>admin@nexo.com</TableCell>
                    <TableCell>Admin123!</TableCell>
                    <TableCell>Administrador Nexo</TableCell>
                    <TableCell>admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>instructor@nexo.com</TableCell>
                    <TableCell>Instructor123!</TableCell>
                    <TableCell>Instructor Nexo</TableCell>
                    <TableCell>instructor</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>student@nexo.com</TableCell>
                    <TableCell>Student123!</TableCell>
                    <TableCell>Estudiante Nexo</TableCell>
                    <TableCell>student</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {createdUsers.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
                <h3 className="font-semibold text-green-700 mb-2">Usuarios creados exitosamente</h3>
                <p className="text-green-600 mb-2">Se han creado los siguientes usuarios:</p>
                <ul className="list-disc pl-5 text-green-600">
                  {createdUsers.map((user) => (
                    <li key={user.id}>
                      {user.email} - {user.role}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={handleCreateUsers} 
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando usuarios...
                </>
              ) : 'Crear Usuarios de Prueba'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default TestUsersPage;
