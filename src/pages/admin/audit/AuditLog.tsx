
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Download, Filter, RefreshCw, Search } from 'lucide-react';

const AuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Mock audit log data
  const auditLogs = [
    { id: 1, action: 'Login', user: 'admin@example.com', timestamp: '2023-05-10 10:30:45', ipAddress: '192.168.1.1', details: 'Successful login' },
    { id: 2, action: 'Create User', user: 'admin@example.com', timestamp: '2023-05-10 11:15:22', ipAddress: '192.168.1.1', details: 'Created user: student@example.com' },
    { id: 3, action: 'Update Course', user: 'instructor@example.com', timestamp: '2023-05-11 09:45:13', ipAddress: '192.168.1.2', details: 'Updated course: React Fundamentals' },
    { id: 4, action: 'Delete Content', user: 'admin@example.com', timestamp: '2023-05-12 14:22:36', ipAddress: '192.168.1.1', details: 'Deleted lesson: Introduction to JavaScript' },
    { id: 5, action: 'Reset Password', user: 'admin@example.com', timestamp: '2023-05-13 16:30:19', ipAddress: '192.168.1.1', details: 'Reset password for: student@example.com' },
  ];
  
  const filteredLogs = auditLogs.filter(
    log => log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const actionButtons = (
    <>
      <Button key="refresh" variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualizar
      </Button>
      <Button key="export" variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Exportar Datos
      </Button>
    </>
  );
  
  return (
    <SectionPageLayout
      header={{
        title: "Registro de Auditoría",
        description: "Registro detallado de todas las acciones realizadas en el sistema"
      }}
    >
      <div className="bg-card rounded-lg border p-4 mb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium mb-2">Buscar</p>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar en registros..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Tipo de Acción</p>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las acciones</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="create">Creación</SelectItem>
                <SelectItem value="update">Actualización</SelectItem>
                <SelectItem value="delete">Eliminación</SelectItem>
                <SelectItem value="reset">Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Fecha Desde</p>
            <DatePicker date={startDate} onDateChange={setStartDate} />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Fecha Hasta</p>
            <DatePicker date={endDate} onDateChange={setEndDate} />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" className="mr-2">
            Limpiar Filtros
          </Button>
          <Button size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Aplicar Filtros
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Acción</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Usuario</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">IP</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">{log.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{log.action}</td>
                  <td className="px-4 py-3 text-sm">{log.user}</td>
                  <td className="px-4 py-3 text-sm">{log.timestamp}</td>
                  <td className="px-4 py-3 text-sm">{log.ipAddress}</td>
                  <td className="px-4 py-3 text-sm">{log.details}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    No se encontraron registros que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-card border-t px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredLogs.length} de {auditLogs.length} registros
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm">Siguiente</Button>
          </div>
        </div>
      </div>
    </SectionPageLayout>
  );
};

export default AuditLog;
