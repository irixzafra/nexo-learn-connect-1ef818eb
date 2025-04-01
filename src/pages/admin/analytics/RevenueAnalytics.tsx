
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useFeature } from '@/hooks/useFeature';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, DollarSign, AlertTriangle, CreditCard, TrendingUp, PiggyBank } from 'lucide-react';
import RevenueAnalyticsSection from './sections/RevenueAnalyticsSection';

const RevenueAnalytics: React.FC = () => {
  const analyticsEnabled = useFeature('enableAnalytics');

  if (!analyticsEnabled) {
    return (
      <AdminPageLayout
        title="Analíticas de Ingresos"
        subtitle="Esta funcionalidad no está habilitada"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Funcionalidad no habilitada
            </CardTitle>
            <CardDescription>
              Las analíticas de ingresos están desactivadas en la configuración de características.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Para habilitar esta funcionalidad, ve a Configuración &gt; Características y activa "Analíticas".
            </p>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Analíticas de Ingresos"
      subtitle="Estadísticas financieras y métricas de ingresos de la plataforma"
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Suscripciones
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Transacciones
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Proyecciones
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <RevenueAnalyticsSection />
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Suscripciones</CardTitle>
              <CardDescription>
                Detalles sobre los ingresos por suscripciones y renovaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las analíticas de suscripciones estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Transacciones</CardTitle>
              <CardDescription>
                Análisis detallado de transacciones y pagos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  El análisis de transacciones estará disponible próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>Proyecciones de Ingresos</CardTitle>
              <CardDescription>
                Proyecciones futuras basadas en datos históricos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
                <p className="text-muted-foreground">
                  Las proyecciones de ingresos estarán disponibles próximamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default RevenueAnalytics;
