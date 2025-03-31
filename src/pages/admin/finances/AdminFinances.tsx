
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { 
  Receipt, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Bell,
  BanknoteIcon
} from "lucide-react";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdminDataTable } from "@/components/shared/AdminDataTable";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AdminTabItem } from "@/components/shared/AdminNavTabs";

// Definición de tipos para transacciones
interface Transaction {
  id: string;
  reference: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "subscription" | "course" | "certificate" | "other";
  customer: string;
  paymentMethod: string;
}

// Definición de tipos para facturas
interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

// Definición de tipos para suscripciones
interface Subscription {
  id: string;
  customer: string;
  plan: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "active" | "canceled" | "pending";
}

// Definición de tipos para movimientos bancarios
interface BankMovement {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  status: "completed" | "pending";
}

// Definición de tipos para alertas financieras
interface FinancialAlert {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "high" | "medium" | "low";
  isRead: boolean;
}

const AdminFinances: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: string }>();
  
  const activeTab = tab || "overview";

  // Datos de ejemplo para transacciones
  const [transactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      reference: "SUB-001234",
      amount: 29.99,
      date: "2023-09-15T10:24:00Z",
      status: "completed",
      type: "subscription",
      customer: "Juan Pérez",
      paymentMethod: "Tarjeta de crédito"
    },
    {
      id: "tx-2",
      reference: "CRS-002345",
      amount: 49.99,
      date: "2023-09-14T15:30:00Z",
      status: "completed",
      type: "course",
      customer: "María García",
      paymentMethod: "PayPal"
    },
    {
      id: "tx-3",
      reference: "CRT-003456",
      amount: 19.99,
      date: "2023-09-13T09:15:00Z",
      status: "pending",
      type: "certificate",
      customer: "Carlos Rodríguez",
      paymentMethod: "Transferencia bancaria"
    },
    {
      id: "tx-4",
      reference: "SUB-004567",
      amount: 29.99,
      date: "2023-09-12T11:45:00Z",
      status: "failed",
      type: "subscription",
      customer: "Ana Martínez",
      paymentMethod: "Tarjeta de crédito"
    },
    {
      id: "tx-5",
      reference: "CRS-005678",
      amount: 149.99,
      date: "2023-09-11T14:20:00Z",
      status: "completed",
      type: "course",
      customer: "Pedro Sánchez",
      paymentMethod: "PayPal"
    }
  ]);

  // Datos de ejemplo para facturas
  const [invoices] = useState<Invoice[]>([
    { id: "inv-1", invoiceNumber: "INV-2023-001", customer: "Juan Pérez", date: "2023-09-15T10:00:00Z", amount: 29.99, status: "paid" },
    { id: "inv-2", invoiceNumber: "INV-2023-002", customer: "María García", date: "2023-09-14T12:00:00Z", amount: 49.99, status: "paid" },
    { id: "inv-3", invoiceNumber: "INV-2023-003", customer: "Carlos Rodríguez", date: "2023-09-13T15:00:00Z", amount: 19.99, status: "pending" },
    { id: "inv-4", invoiceNumber: "INV-2023-004", customer: "Ana Martínez", date: "2023-09-10T09:00:00Z", amount: 99.99, status: "overdue" }
  ]);

  // Datos de ejemplo para suscripciones
  const [subscriptions] = useState<Subscription[]>([
    { id: "sub-1", customer: "Juan Pérez", plan: "Plan Premium", startDate: "2023-01-01T00:00:00Z", endDate: "2024-01-01T00:00:00Z", amount: 29.99, status: "active" },
    { id: "sub-2", customer: "María García", plan: "Plan Básico", startDate: "2023-02-15T00:00:00Z", endDate: "2023-12-15T00:00:00Z", amount: 19.99, status: "active" },
    { id: "sub-3", customer: "Carlos Rodríguez", plan: "Plan Estudiante", startDate: "2023-03-10T00:00:00Z", endDate: "2023-10-10T00:00:00Z", amount: 9.99, status: "canceled" },
    { id: "sub-4", customer: "Ana Martínez", plan: "Plan Empresarial", startDate: "2023-08-01T00:00:00Z", endDate: "2024-08-01T00:00:00Z", amount: 49.99, status: "active" }
  ]);

  // Datos de ejemplo para movimientos bancarios
  const [bankMovements] = useState<BankMovement[]>([
    { id: "mov-1", description: "Pago suscripción", date: "2023-09-15T10:00:00Z", amount: 29.99, type: "deposit", status: "completed" },
    { id: "mov-2", description: "Comisión bancaria", date: "2023-09-14T12:00:00Z", amount: 5.00, type: "withdrawal", status: "completed" },
    { id: "mov-3", description: "Transferencia a cuenta principal", date: "2023-09-13T15:00:00Z", amount: 1000.00, type: "transfer", status: "completed" },
    { id: "mov-4", description: "Pago curso", date: "2023-09-10T09:00:00Z", amount: 49.99, type: "deposit", status: "pending" }
  ]);

  // Datos de ejemplo para alertas financieras
  const [alerts] = useState<FinancialAlert[]>([
    { id: "alert-1", title: "Pago tardío", description: "El cliente Ana Martínez tiene una factura pendiente de pago.", date: "2023-09-15T10:00:00Z", priority: "high", isRead: false },
    { id: "alert-2", title: "Suscripción por vencer", description: "5 suscripciones vencerán en los próximos 7 días.", date: "2023-09-14T12:00:00Z", priority: "medium", isRead: false },
    { id: "alert-3", title: "Informe mensual listo", description: "El informe financiero del mes pasado está disponible.", date: "2023-09-10T15:00:00Z", priority: "low", isRead: true }
  ]);

  // Columnas para la tabla de transacciones
  const transactionColumns: ColumnDef<Transaction, any>[] = [
    createColumn<Transaction>({
      accessorKey: "reference",
      header: "Referencia",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("reference")}</span>
        </div>
      ),
    }),
    createColumn<Transaction>({
      accessorKey: "customer",
      header: "Cliente",
    }),
    createColumn<Transaction>({
      accessorKey: "type",
      header: "Tipo",
      cell: ({ getValue }) => {
        const type = getValue() as string;
        switch (type) {
          case "subscription":
            return <Badge variant="default">Suscripción</Badge>;
          case "course":
            return <Badge variant="secondary">Curso</Badge>;
          case "certificate":
            return <Badge variant="outline">Certificado</Badge>;
          default:
            return <Badge variant="outline">Otro</Badge>;
        }
      },
    }),
    createColumn<Transaction>({
      accessorKey: "amount",
      header: "Importe",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return <span className="font-medium">€{amount.toFixed(2)}</span>;
      },
    }),
    createColumn<Transaction>({
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy HH:mm")}</span>;
      },
    }),
    createColumn<Transaction>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        switch (status) {
          case "completed":
            return (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Completado</span>
              </div>
            );
          case "pending":
            return (
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                <span>Pendiente</span>
              </div>
            );
          case "failed":
            return (
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                <span>Fallido</span>
              </div>
            );
          default:
            return <span>{status}</span>;
        }
      },
    }),
    createColumn<Transaction>({
      accessorKey: "paymentMethod",
      header: "Método de pago",
    }),
    createActionsColumn<Transaction>(({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      );
    }),
  ];

  // Columnas para la tabla de facturas
  const invoiceColumns: ColumnDef<Invoice, any>[] = [
    createColumn<Invoice>({
      accessorKey: "invoiceNumber",
      header: "Número de Factura",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("invoiceNumber")}</span>
        </div>
      ),
    }),
    createColumn<Invoice>({
      accessorKey: "customer",
      header: "Cliente",
    }),
    createColumn<Invoice>({
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy")}</span>;
      },
    }),
    createColumn<Invoice>({
      accessorKey: "amount",
      header: "Importe",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return <span className="font-medium">€{amount.toFixed(2)}</span>;
      },
    }),
    createColumn<Invoice>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        switch (status) {
          case "paid":
            return (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                Pagada
              </Badge>
            );
          case "pending":
            return (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                Pendiente
              </Badge>
            );
          case "overdue":
            return (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                Vencida
              </Badge>
            );
          default:
            return <span>{status}</span>;
        }
      },
    }),
    createActionsColumn<Invoice>(({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      );
    }),
  ];

  // Columnas para la tabla de suscripciones
  const subscriptionColumns: ColumnDef<Subscription, any>[] = [
    createColumn<Subscription>({
      accessorKey: "customer",
      header: "Cliente",
    }),
    createColumn<Subscription>({
      accessorKey: "plan",
      header: "Plan",
    }),
    createColumn<Subscription>({
      accessorKey: "startDate",
      header: "Fecha de Inicio",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy")}</span>;
      },
    }),
    createColumn<Subscription>({
      accessorKey: "endDate",
      header: "Fecha de Fin",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy")}</span>;
      },
    }),
    createColumn<Subscription>({
      accessorKey: "amount",
      header: "Importe Mensual",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return <span className="font-medium">€{amount.toFixed(2)}</span>;
      },
    }),
    createColumn<Subscription>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        switch (status) {
          case "active":
            return (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                Activa
              </Badge>
            );
          case "canceled":
            return (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                Cancelada
              </Badge>
            );
          case "pending":
            return (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                Pendiente
              </Badge>
            );
          default:
            return <span>{status}</span>;
        }
      },
    }),
  ];

  // Columnas para la tabla de movimientos bancarios
  const bankMovementColumns: ColumnDef<BankMovement, any>[] = [
    createColumn<BankMovement>({
      accessorKey: "description",
      header: "Descripción",
    }),
    createColumn<BankMovement>({
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy HH:mm")}</span>;
      },
    }),
    createColumn<BankMovement>({
      accessorKey: "amount",
      header: "Importe",
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return <span className="font-medium">€{amount.toFixed(2)}</span>;
      },
    }),
    createColumn<BankMovement>({
      accessorKey: "type",
      header: "Tipo",
      cell: ({ getValue }) => {
        const type = getValue() as string;
        switch (type) {
          case "deposit":
            return <Badge variant="outline" className="bg-green-100 text-green-800">Ingreso</Badge>;
          case "withdrawal":
            return <Badge variant="outline" className="bg-red-100 text-red-800">Retiro</Badge>;
          case "transfer":
            return <Badge variant="outline" className="bg-blue-100 text-blue-800">Transferencia</Badge>;
          default:
            return <span>{type}</span>;
        }
      },
    }),
    createColumn<BankMovement>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        switch (status) {
          case "completed":
            return (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Completado</span>
              </div>
            );
          case "pending":
            return (
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                <span>Pendiente</span>
              </div>
            );
          default:
            return <span>{status}</span>;
        }
      },
    }),
  ];

  // Columnas para la tabla de alertas
  const alertColumns: ColumnDef<FinancialAlert, any>[] = [
    createColumn<FinancialAlert>({
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const isRead = row.original.isRead;
        return (
          <div className="flex items-center gap-2">
            {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            <span className={isRead ? "" : "font-semibold"}>{row.getValue("title")}</span>
          </div>
        );
      },
    }),
    createColumn<FinancialAlert>({
      accessorKey: "description",
      header: "Descripción",
    }),
    createColumn<FinancialAlert>({
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span>{format(new Date(date), "dd/MM/yyyy HH:mm")}</span>;
      },
    }),
    createColumn<FinancialAlert>({
      accessorKey: "priority",
      header: "Prioridad",
      cell: ({ getValue }) => {
        const priority = getValue() as string;
        switch (priority) {
          case "high":
            return <Badge variant="destructive">Alta</Badge>;
          case "medium":
            return <Badge variant="default" className="bg-amber-500">Media</Badge>;
          case "low":
            return <Badge variant="outline">Baja</Badge>;
          default:
            return <span>{priority}</span>;
        }
      },
    }),
  ];

  // Resumen financiero
  const financialSummary = [
    { id: 1, label: "Ingresos mensuales", value: "€2,345.99", icon: <DollarSign className="h-5 w-5" /> },
    { id: 2, label: "Transacciones procesadas", value: "158", icon: <Receipt className="h-5 w-5" /> },
    { id: 3, label: "Pagos pendientes", value: "12", icon: <AlertCircle className="h-5 w-5" /> },
    { id: 4, label: "Suscripciones activas", value: "87", icon: <CreditCard className="h-5 w-5" /> }
  ];

  // Tabs para las diferentes secciones
  const tabs: AdminTabItem[] = [
    {
      value: "overview",
      label: "Resumen",
      icon: <DollarSign className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          {/* Resumen financiero */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialSummary.map(item => (
              <Card key={item.id} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabla de transacciones */}
          <AdminDataTable
            title="Transacciones"
            description="Historial de todas las transacciones realizadas en la plataforma"
            columns={transactionColumns}
            data={transactions}
            searchPlaceholder="Buscar transacción..."
            searchColumn="reference"
            createButtonLabel="Nueva Transacción"
            createButtonIcon={<Plus className="h-4 w-4 mr-2" />}
            onCreateClick={() => {}}
            emptyState={
              <div className="text-center py-10">
                <Receipt className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No se encontraron transacciones</p>
              </div>
            }
            actionButtons={
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filtrar por fecha
              </Button>
            }
          />
        </div>
      )
    },
    {
      value: "invoices",
      label: "Facturas",
      icon: <Receipt className="h-4 w-4" />,
      content: (
        <AdminDataTable
          title="Facturas"
          description="Gestión de facturas emitidas"
          columns={invoiceColumns}
          data={invoices}
          searchPlaceholder="Buscar factura..."
          searchColumn="invoiceNumber"
          createButtonLabel="Nueva Factura"
          createButtonIcon={<Plus className="h-4 w-4 mr-2" />}
          onCreateClick={() => {}}
          emptyState={
            <div className="text-center py-10">
              <Receipt className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron facturas</p>
            </div>
          }
        />
      )
    },
    {
      value: "subscriptions",
      label: "Suscripciones",
      icon: <CreditCard className="h-4 w-4" />,
      content: (
        <AdminDataTable
          title="Suscripciones"
          description="Gestión de suscripciones activas"
          columns={subscriptionColumns}
          data={subscriptions}
          searchPlaceholder="Buscar suscripción..."
          searchColumn="customer"
          createButtonLabel="Nueva Suscripción"
          createButtonIcon={<Plus className="h-4 w-4 mr-2" />}
          onCreateClick={() => {}}
          emptyState={
            <div className="text-center py-10">
              <CreditCard className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron suscripciones</p>
            </div>
          }
        />
      )
    },
    {
      value: "bank",
      label: "Mov. Bancarios",
      icon: <BanknoteIcon className="h-4 w-4" />,
      content: (
        <AdminDataTable
          title="Movimientos Bancarios"
          description="Registro de movimientos bancarios"
          columns={bankMovementColumns}
          data={bankMovements}
          searchPlaceholder="Buscar movimiento..."
          searchColumn="description"
          emptyState={
            <div className="text-center py-10">
              <BanknoteIcon className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron movimientos bancarios</p>
            </div>
          }
          actionButtons={
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Filtrar por fecha
            </Button>
          }
        />
      )
    },
    {
      value: "alerts",
      label: "Alertas",
      icon: <Bell className="h-4 w-4" />,
      content: (
        <AdminDataTable
          title="Alertas Financieras"
          description="Notificaciones y avisos importantes"
          columns={alertColumns}
          data={alerts}
          searchPlaceholder="Buscar alerta..."
          searchColumn="title"
          emptyState={
            <div className="text-center py-10">
              <Bell className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron alertas</p>
            </div>
          }
        />
      )
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Finanzas"
      subtitle="Administra transacciones, facturación y reportes financieros"
      tabs={tabs}
      defaultTabValue={activeTab}
    />
  );
};

export default AdminFinances;
