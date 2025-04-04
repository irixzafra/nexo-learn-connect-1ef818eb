
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <PageHeader
          title="Configuración"
          description="Personaliza tu experiencia en la plataforma"
        />
        
        <div className="mt-6">
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
              <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-4">
              <Card>
                <CardContent className="p-6 pt-4">
                  <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Las opciones de configuración se mostrarán aquí</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Similar structures for other tabs */}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
