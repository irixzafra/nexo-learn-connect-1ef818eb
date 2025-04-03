
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const GeneralSettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Configuración General</h1>
          <p className="text-muted-foreground mt-1">
            Administra la configuración general de la plataforma
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Preferencias Generales</CardTitle>
          </div>
          <CardDescription>
            Configura opciones básicas de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            La configuración general te permite personalizar aspectos básicos de la plataforma
            según las necesidades de tu organización.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettingsPage;
