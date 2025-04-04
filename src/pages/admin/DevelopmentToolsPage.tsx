
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Puzzle, Database, RefreshCw, FileCode, Package } from 'lucide-react';

const DevelopmentToolsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Herramientas de Desarrollo"
          description="Conjunto de herramientas para los desarrolladores del sistema"
        />
        
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Debug Console
                </CardTitle>
                <CardDescription>
                  Consola avanzada para depuración del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accede a registros detallados, inspecciona variables y evalúa expresiones en tiempo real.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Abrir consola</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-primary" />
                  Estado de componentes
                </CardTitle>
                <CardDescription>
                  Visualiza el árbol de componentes y su estado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Inspecciona el estado interno de los componentes React, sus props y sus relaciones.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explorar componentes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Inspector de datos
                </CardTitle>
                <CardDescription>
                  Explora y modifica datos del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualiza y manipula la estructura de datos, realiza consultas y prueba cambios.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Abrir inspector</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Ciclo de renderizado
                </CardTitle>
                <CardDescription>
                  Análisis del ciclo de vida y renderizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Monitorea y optimiza el rendimiento del ciclo de renderizado de componentes.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Ver métricas</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Editor de código
                </CardTitle>
                <CardDescription>
                  Modifica y prueba código en vivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Editor integrado con resaltado de sintaxis y herramientas de depuración.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Abrir editor</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Gestión de módulos
                </CardTitle>
                <CardDescription>
                  Administra y actualiza dependencias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Revisa versiones, resuelve conflictos y actualiza paquetes del sistema.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Gestionar módulos</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DevelopmentToolsPage;
