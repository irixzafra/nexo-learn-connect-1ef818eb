
import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Filter, List, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// Replacing the import with existing components
// import { DatePicker } from '@/components/ui/date-picker';

const AuditLog: React.FC = () => {
  const navigationActions = React.useMemo(() => [
    <Button key="filter" variant="outline" size="sm" className="gap-1">
      <Filter className="h-4 w-4" /> Filtrar
    </Button>,
    <Button key="view" variant="outline" size="sm" className="gap-1">
      <List className="h-4 w-4" /> Ver
    </Button>,
    <Button key="export" variant="outline" size="sm" className="gap-1">
      <Download className="h-4 w-4" /> Exportar
    </Button>
  ], []);

  return (
    <SectionPageLayout
      header={{ 
        title: "Registro de Auditoría",
        description: "Monitorea todos los cambios y acciones en el sistema" 
      }}
      actions={navigationActions}
    >
      <div className="p-6 bg-card rounded-lg shadow-sm border">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tipo de Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="content">Contenido</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
                  <SelectItem value="instructor">Instructores</SelectItem>
                  <SelectItem value="student">Estudiantes</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="pl-8 w-[200px]"
                />
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">Página 1 de 10</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium text-xs">FECHA</th>
                  <th className="py-3 px-4 text-left font-medium text-xs">USUARIO</th>
                  <th className="py-3 px-4 text-left font-medium text-xs">ACCIÓN</th>
                  <th className="py-3 px-4 text-left font-medium text-xs">DETALLES</th>
                  <th className="py-3 px-4 text-left font-medium text-xs">IP</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 px-4 text-sm">2023-06-{10 + i}</td>
                    <td className="py-3 px-4 text-sm">admin@ejemplo.com</td>
                    <td className="py-3 px-4 text-sm">Actualización de usuario</td>
                    <td className="py-3 px-4 text-sm">Cambió rol de usuario ID #1234</td>
                    <td className="py-3 px-4 text-sm">192.168.1.{100 + i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionPageLayout>
  );
};

export default AuditLog;
