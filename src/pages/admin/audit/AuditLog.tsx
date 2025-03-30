import React, { useState } from 'react';
import { AdminPageLayout } from '@/components/layout/admin/AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Download, 
  Filter, 
  User, 
  Calendar, 
  Search, 
  RefreshCcw
} from 'lucide-react';

// Datos de ejemplo para la tabla de auditoría
const auditLogData = [
  { 
    id: 1, 
    action: 'Inicio de sesión', 
    user: 'admin@ejemplo.com', 
    timestamp: '2023-07-20 14:32:45', 
    ipAddress: '192.168.1.1', 
    details: 'Acceso correcto desde navegador Chrome'
  },
  { 
    id: 2, 
    action: 'Creación de curso', 
    user: 'instructor@ejemplo.com', 
    timestamp: '2023-07-20 10:15:22', 
    ipAddress: '192.168.1.5', 
    details: 'Curso "Introducción a React" creado'
  },
  { 
    id: 3, 
    action: 'Actualización de usuario', 
    user: 'admin@ejemplo.com', 
    timestamp: '2023-07-19 16:44:11', 
    ipAddress: '192.168.1.1', 
    details: 'Cambio de rol para usuario student@ejemplo.com'
  },
  // Más ejemplos...
];

const AuditLog: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  
  return (
    <AdminPageLayout>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Log de Auditoría</CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Buscar en logs..."
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action-type">Tipo de acción</Label>
              <Select>
                <SelectTrigger id="action-type">
                  <SelectValue placeholder="Todas las acciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las acciones</SelectItem>
                  <SelectItem value="login">Inicio de sesión</SelectItem>
                  <SelectItem value="logout">Cierre de sesión</SelectItem>
                  <SelectItem value="create">Creación</SelectItem>
                  <SelectItem value="update">Actualización</SelectItem>
                  <SelectItem value="delete">Eliminación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="from-date">Desde</Label>
              <DatePicker
                id="from-date"
                date={fromDate}
                setDate={setFromDate}
                placeholder="Seleccionar fecha"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="to-date">Hasta</Label>
              <DatePicker
                id="to-date"
                date={toDate}
                setDate={setToDate}
                placeholder="Seleccionar fecha"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Dirección IP</TableHead>
                  <TableHead>Detalles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogData.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {log.user}
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell className="max-w-xs truncate" title={log.details}>
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default AuditLog;
