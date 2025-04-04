
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Export the DesignComponent interface so it can be imported elsewhere
export interface DesignComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  preview?: React.ReactNode;
  code?: string;
  status?: 'stable' | 'beta' | 'experimental' | 'deprecated';
  variants?: string[];
  usage?: string;
  path?: string;
  props?: Record<string, {
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }>;
}

const DesignSystemPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Design System</h1>
        <p className="text-muted-foreground">
          Documentación y componentes del sistema de diseño
        </p>
      </div>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="typography">Tipografía</TabsTrigger>
          <TabsTrigger value="colors">Colores</TabsTrigger>
          <TabsTrigger value="spacing">Espaciado</TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Componentes</CardTitle>
              <CardDescription>
                Biblioteca de componentes reutilizables para construir interfaces consistentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded p-4">
                  <h3 className="font-medium mb-2">Botones</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Componentes interactivos para activar acciones.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {/* Ejemplos de botones aquí */}
                  </div>
                </div>

                <div className="border rounded p-4">
                  <h3 className="font-medium mb-2">Tarjetas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contenedores para organizar información.
                  </p>
                  {/* Ejemplos de tarjetas aquí */}
                </div>

                <div className="border rounded p-4">
                  <h3 className="font-medium mb-2">Navegación</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Elementos para la navegación del usuario.
                  </p>
                  {/* Ejemplos de navegación aquí */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography">
          <Card>
            <CardHeader>
              <CardTitle>Tipografía</CardTitle>
              <CardDescription>
                Sistema tipográfico para mantener jerarquía y legibilidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Título H1</h1>
                  <p className="text-sm text-muted-foreground">Tamaño: 2.5rem / 40px</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Título H2</h2>
                  <p className="text-sm text-muted-foreground">Tamaño: 1.875rem / 30px</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Título H3</h3>
                  <p className="text-sm text-muted-foreground">Tamaño: 1.5rem / 24px</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Título H4</h4>
                  <p className="text-sm text-muted-foreground">Tamaño: 1.25rem / 20px</p>
                </div>
                <div>
                  <p className="text-base mb-2">Texto de párrafo estándar</p>
                  <p className="text-sm text-muted-foreground">Tamaño: 1rem / 16px</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Colores</CardTitle>
              <CardDescription>
                Paleta de colores del sistema de diseño
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <div className="h-20 rounded bg-primary mb-2"></div>
                  <p className="font-medium">Primary</p>
                  <p className="text-sm text-muted-foreground">Para elementos principales</p>
                </div>
                <div>
                  <div className="h-20 rounded bg-secondary mb-2"></div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm text-muted-foreground">Para elementos secundarios</p>
                </div>
                <div>
                  <div className="h-20 rounded bg-destructive mb-2"></div>
                  <p className="font-medium">Destructive</p>
                  <p className="text-sm text-muted-foreground">Para acciones de eliminación</p>
                </div>
                <div>
                  <div className="h-20 rounded bg-muted mb-2"></div>
                  <p className="font-medium">Muted</p>
                  <p className="text-sm text-muted-foreground">Para fondos sutiles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spacing">
          <Card>
            <CardHeader>
              <CardTitle>Espaciado</CardTitle>
              <CardDescription>
                Sistema de espaciado para mantener consistencia en el diseño
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary mr-4"></div>
                    <p className="font-medium">4px - xs</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-8">Espaciado extra pequeño</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary mr-4"></div>
                    <p className="font-medium">8px - sm</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-12">Espaciado pequeño</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-primary mr-4"></div>
                    <p className="font-medium">16px - md</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-20">Espaciado medio</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-primary mr-4"></div>
                    <p className="font-medium">24px - lg</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-28">Espaciado grande</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignSystemPage;
