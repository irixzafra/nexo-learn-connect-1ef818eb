
import React from 'react';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  FileText, 
  CreditCard, 
  RefreshCw, 
  BellDot, 
  BarChart3 
} from 'lucide-react';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';
import { SubscriptionPlans } from '@/features/payments/components/SubscriptionPlans';
import { ManageSubscription } from '@/features/payments/components/ManageSubscription';
import { PaymentMethodList } from '@/features/payments/components/PaymentMethodList';
import { InvoiceList } from '@/features/payments/components/InvoiceList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const subMenuItems: AdminSubMenuItem[] = [
  {
    id: 'invoices',
    label: 'Facturas',
    path: '/admin/billing/invoices',
    icon: FileText
  },
  {
    id: 'subscriptions',
    label: 'Suscripciones',
    path: '/admin/billing/subscriptions',
    icon: RefreshCw
  },
  {
    id: 'bank',
    label: 'Movimientos Bancarios',
    path: '/admin/billing/bank',
    icon: BarChart3
  },
  {
    id: 'alerts',
    label: 'Alertas',
    path: '/admin/billing/alerts',
    icon: BellDot
  }
];

const Billing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AdminPageLayout 
      title="Gestión de Finanzas"
      subtitle="Administra transacciones, facturación y reportes financieros"
      subMenuItems={subMenuItems}
      baseRoute="/admin/billing"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/admin/billing/invoices" replace />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/subscriptions" element={<ManageSubscription />} />
        <Route path="/bank" element={<BankTransactions />} />
        <Route path="/alerts" element={<BillingAlerts />} />
      </Routes>
    </AdminPageLayout>
  );
};

// Placeholder components for new routes
const BankTransactions: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movimientos Bancarios</h2>
      <p>Visualiza y gestiona todos tus movimientos bancarios.</p>
    </div>
  );
};

// Enhanced BillingAlerts component to match the design in the image
const BillingAlerts: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle>Alertas Financieras</CardTitle>
        <p className="text-sm text-muted-foreground">Notificaciones y avisos importantes</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between mb-2">
            <div className="relative w-[260px]">
              <Input placeholder="Buscar alerta..." className="pl-3" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <span className="mr-2">Exportar CSV</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <span className="mr-2">Columnas</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-left">
                  <th className="py-3 px-2 font-medium">Título</th>
                  <th className="py-3 px-2 font-medium">Descripción</th>
                  <th className="py-3 px-2 font-medium">Fecha</th>
                  <th className="py-3 px-2 font-medium">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="font-medium">Pago tardío</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    El cliente Ana Martínez tiene una factura pendiente de pago.
                  </td>
                  <td className="py-3 px-2">15/09/2023 12:00</td>
                  <td className="py-3 px-2">
                    <Badge className="bg-red-500">Alta</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                      <span className="font-medium">Suscripción por vencer</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    5 suscripciones vencerán en los próximos 7 días.
                  </td>
                  <td className="py-3 px-2">14/09/2023 14:00</td>
                  <td className="py-3 px-2">
                    <Badge className="bg-orange-500">Media</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Informe mensual listo</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    El informe financiero del mes pasado está disponible.
                  </td>
                  <td className="py-3 px-2">10/09/2023 17:00</td>
                  <td className="py-3 px-2">
                    <Badge className="bg-slate-500">Baja</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              0 de 3 fila(s) seleccionada(s).
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Filas por página</span>
                <select className="h-8 w-16 rounded-md border border-input px-2 py-1 text-sm">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center text-sm">
                Página 1 de 1
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  «
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  ‹
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  ›
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                  »
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Billing;
