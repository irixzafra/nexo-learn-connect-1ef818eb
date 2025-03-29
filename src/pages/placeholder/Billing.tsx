
import React, { useState } from "react";
import { 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  CreditCard,
  DollarSign,
  BarChart3,
  ArrowUp,
  ArrowDown,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para la página de facturación
const mockTransactions = [
  {
    id: "INV-001",
    date: "2023-07-15",
    customer: "María López",
    email: "maria.lopez@ejemplo.com",
    amount: 129.99,
    status: "paid",
    paymentMethod: "credit_card"
  },
  {
    id: "INV-002",
    date: "2023-07-16",
    customer: "Juan Perez",
    email: "juan.perez@ejemplo.com",
    amount: 249.99,
    status: "paid",
    paymentMethod: "paypal"
  },
  {
    id: "INV-003",
    date: "2023-07-18",
    customer: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    amount: 99.99,
    status: "pending",
    paymentMethod: "credit_card"
  },
  {
    id: "INV-004",
    date: "2023-07-20",
    customer: "Roberto Sánchez",
    email: "roberto.sanchez@ejemplo.com",
    amount: 149.99,
    status: "failed",
    paymentMethod: "bank_transfer"
  },
  {
    id: "INV-005",
    date: "2023-07-22",
    customer: "Elena Gómez",
    email: "elena.gomez@ejemplo.com",
    amount: 199.99,
    status: "paid",
    paymentMethod: "credit_card"
  },
  {
    id: "INV-006",
    date: "2023-07-23",
    customer: "Carlos Ruiz",
    email: "carlos.ruiz@ejemplo.com",
    amount: 179.99,
    status: "refunded",
    paymentMethod: "paypal"
  },
  {
    id: "INV-007",
    date: "2023-07-25",
    customer: "Laura Torres",
    email: "laura.torres@ejemplo.com",
    amount: 299.99,
    status: "paid",
    paymentMethod: "credit_card"
  },
  {
    id: "INV-008",
    date: "2023-07-26",
    customer: "Miguel Hernández",
    email: "miguel.hernandez@ejemplo.com",
    amount: 79.99,
    status: "pending",
    paymentMethod: "bank_transfer"
  }
];

// Componente para mostrar el estado del pago
const PaymentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "paid":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <ArrowUp className="h-3.5 w-3.5 mr-1 text-green-700" />
          Pagado
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="h-3.5 w-3.5 mr-1 text-amber-700" />
          Pendiente
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3.5 w-3.5 mr-1 text-red-700" />
          Fallido
        </Badge>
      );
    case "refunded":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <ArrowDown className="h-3.5 w-3.5 mr-1 text-blue-700" />
          Reembolsado
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconocido</Badge>;
  }
};

// Componente para mostrar el método de pago
const PaymentMethodIcon = ({ method }: { method: string }) => {
  switch (method) {
    case "credit_card":
      return <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />;
    case "paypal":
      return <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />;
    case "bank_transfer":
      return <Building className="h-4 w-4 mr-2 text-muted-foreground" />;
    default:
      return <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />;
  }
};

// Importamos los iconos faltantes
import { Clock, XCircle, Building } from "lucide-react";

const Billing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Función para formatear el precio
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calcular estadísticas
  const stats = {
    totalRevenue: mockTransactions
      .filter(t => t.status === "paid")
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    pendingRevenue: mockTransactions
      .filter(t => t.status === "pending")
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    refundedAmount: mockTransactions
      .filter(t => t.status === "refunded")
      .reduce((sum, transaction) => sum + transaction.amount, 0),
    failedTransactions: mockTransactions.filter(t => t.status === "failed").length
  };

  // Manejar la búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    filterTransactions(term, dateFilter, statusFilter);
  };

  // Función para filtrar transacciones
  const filterTransactions = (term: string, date: string, status: string) => {
    let filtered = mockTransactions.filter(transaction => 
      transaction.customer.toLowerCase().includes(term.toLowerCase()) || 
      transaction.id.toLowerCase().includes(term.toLowerCase()) ||
      transaction.email.toLowerCase().includes(term.toLowerCase())
    );
    
    // Filtro por fecha (simulado - en una aplicación real se usaría una librería de fechas)
    if (date !== "all") {
      // Aquí sería dónde filtrarías por la fecha real
      // Por simplicidad, mantendremos todos los resultados
    }
    
    // Filtro por estado
    if (status !== "all") {
      filtered = filtered.filter(t => t.status === status);
    }
    
    setFilteredTransactions(filtered);
  };

  // Manejar cambio de filtro de estado
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    filterTransactions(searchTerm, dateFilter, value);
  };

  // Manejar cambio de filtro de fecha
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    filterTransactions(searchTerm, value, statusFilter);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Facturación</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendiente de Cobro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              <div className="text-2xl font-bold">{formatPrice(stats.pendingRevenue)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reembolsos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowDown className="h-5 w-5 mr-2 text-blue-500" />
              <div className="text-2xl font-bold">{formatPrice(stats.refundedAmount)}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transacciones Fallidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 mr-2 text-red-500" />
              <div className="text-2xl font-bold">{stats.failedTransactions}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico y filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Ingresos</CardTitle>
          <CardDescription>Vista general de las transacciones financieras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border-b mb-4">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-2" />
              <p>El gráfico de ingresos estará disponible próximamente</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar facturas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <Select onValueChange={handleDateFilterChange} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Periodo" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los periodos</SelectItem>
                  <SelectItem value="this_month">Este mes</SelectItem>
                  <SelectItem value="last_month">Mes pasado</SelectItem>
                  <SelectItem value="this_year">Este año</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={handleStatusFilterChange} defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="paid">Pagado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="failed">Fallido</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
          
          {/* Tabla de transacciones */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Importe</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    <div>{transaction.customer}</div>
                    <div className="text-sm text-muted-foreground">{transaction.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <PaymentMethodIcon method={transaction.paymentMethod} />
                      <span className="capitalize">
                        {transaction.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatPrice(transaction.amount)}</TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
