
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';
import { BarChart2Icon } from '@/components/icons/BarChart2Icon';

const DashboardPage: React.FC = () => {
  return (
    <AdminPageLayout title="Panel de Administración">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Componentes Totales</CardTitle>
              <BarChart2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                +2 desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Páginas Activas</CardTitle>
              <BarChart2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +4 desde el mes pasado
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Elementos Huérfanos</CardTitle>
              <BarChart2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                -3 desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Actividad</CardTitle>
              <CardDescription>
                Vista general de la plataforma y sus elementos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Panel de control en desarrollo. Las métricas completas estarán disponibles próximamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
};

export default DashboardPage;
