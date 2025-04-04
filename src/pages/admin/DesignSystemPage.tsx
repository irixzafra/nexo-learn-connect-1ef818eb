
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DesignSystemPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Sistema de Diseño"
          description="Guía de estilos y componentes para la plataforma"
        />
        
        <div className="mt-6">
          <Tabs defaultValue="components">
            <TabsList>
              <TabsTrigger value="components">Componentes</TabsTrigger>
              <TabsTrigger value="colors">Colores</TabsTrigger>
              <TabsTrigger value="typography">Tipografía</TabsTrigger>
              <TabsTrigger value="spacing">Espaciado</TabsTrigger>
            </TabsList>
            <TabsContent value="components" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Biblioteca de Componentes</CardTitle>
                  <CardDescription>
                    Componentes de UI disponibles en el sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Los componentes se mostrarán aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Similar structures for other tabs */}
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DesignSystemPage;
