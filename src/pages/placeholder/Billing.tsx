
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';

const Billing: React.FC = () => {
  const title = "Facturación";
  const subtitle = "Gestión de facturación y pagos";
  const baseRoute = "/billing";
  
  const subMenuItems: AdminSubMenuItem[] = [
    {
      title: "Facturas",
      path: "",
    },
    {
      title: "Métodos de Pago",
      path: "/payment-methods",
    },
    {
      title: "Historial",
      path: "/history",
    },
    {
      title: "Configuración",
      path: "/settings",
    }
  ];

  return (
    <AdminPageLayout 
      title={title} 
      subtitle={subtitle}
      navigationItems={subMenuItems}
      baseRoute={baseRoute}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen de facturación</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              El módulo de facturación está en desarrollo. Pronto podrás gestionar tus pagos y facturas desde aquí.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default Billing;
