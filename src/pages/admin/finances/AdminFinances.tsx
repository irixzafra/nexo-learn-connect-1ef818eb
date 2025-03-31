
import React, { useState } from "react";
import { 
  Receipt, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus
} from "lucide-react";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AdminDataTable } from "@/components/shared/AdminDataTable";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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

const AdminFinances: React.FC = () => {
  // Datos de ejemplo para transacciones
  const [transactions, setTransactions] = useState<Transaction[]>([
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

  // Columnas para la tabla de transacciones
  const columns: ColumnDef<Transaction, any>[] = [
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

  // Resumen financiero
  const financialSummary = [
    { id: 1, label: "Ingresos mensuales", value: "€2,345.99", icon: <DollarSign className="h-5 w-5" /> },
    { id: 2, label: "Transacciones procesadas", value: "158", icon: <Receipt className="h-5 w-5" /> },
    { id: 3, label: "Pagos pendientes", value: "12", icon: <AlertCircle className="h-5 w-5" /> },
    { id: 4, label: "Suscripciones activas", value: "87", icon: <CreditCard className="h-5 w-5" /> }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Finanzas"
      subtitle="Administra transacciones, facturación y reportes financieros"
    >
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
          columns={columns}
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
    </AdminPageLayout>
  );
};

export default AdminFinances;
