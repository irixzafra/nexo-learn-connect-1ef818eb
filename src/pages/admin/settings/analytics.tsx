
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useFeatures } from '@/hooks/useFeatures';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AnalyticsSettings: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();

  return (
    <AdminPageLayout 
      title="Configuración de Analíticas" 
      subtitle="Configura las opciones de seguimiento y análisis de datos"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Configuración de Analíticas</CardTitle>
            </div>
            <CardDescription>
              Gestiona cómo se recopilan y utilizan los datos analíticos en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              La configuración de analíticas te permite controlar qué datos se recopilan
              y cómo se utilizan para mejorar la experiencia del usuario y el rendimiento del sistema.
            </p>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAnalytics">Habilitar analíticas</Label>
                  <p className="text-sm text-muted-foreground">
                    Recopila datos de uso para mejorar la plataforma
                  </p>
                </div>
                <Switch
                  id="enableAnalytics"
                  checked={!!featuresConfig?.enableAnalytics}
                  onCheckedChange={(value) => toggleFeature('enableAnalytics', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default AnalyticsSettings;
