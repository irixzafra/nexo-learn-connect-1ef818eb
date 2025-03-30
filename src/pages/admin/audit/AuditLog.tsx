
import React, { useState } from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { History, Search, CalendarRange, Download, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para el registro de auditoría
  const auditLogs = [
    { id: 1, action: "user.login", user: "admin@nexo.com", details: "Inicio de sesión exitoso", resource: "auth", timestamp: "2023-10-15 14:22:15" },
    { id: 2, action: "course.published", user: "instructor@nexo.com", details: "Curso publicado: Desarrollo Web con React", resource: "courses", timestamp: "2023-10-15 13:45:02" },
    { id: 3, action: "user.created", user: "admin@nexo.com", details: "Usuario creado: estudiante1@gmail.com", resource: "users", timestamp: "2023-10-14 18:12:45" },
    { id: 4, action: "payment.processed", user: "sistema", details: "Pago procesado #1234 por €49.99", resource: "payments", timestamp: "2023-10-14 10:30:18" },
    { id: 5, action: "role.changed", user: "admin@nexo.com", details: "Rol cambiado: user@test.com de 'student' a 'instructor'", resource: "roles", timestamp: "2023-10-13 16:55:40" },
  ];

  const filteredLogs = searchTerm.trim() === "" 
    ? auditLogs 
    : auditLogs.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <SectionPageLayout
      header={{
        title: "Registro de Auditoría",
        description: "Monitoriza todas las actividades y cambios en la plataforma",
        actions: [
          {
            label: "Exportar",
            icon: <Download className="h-4 w-4" />,
            onClick: () => console.log("Exportar logs clicked"),
          }
        ],
        breadcrumbs: [
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Auditoría" }
        ]
      }}
    >
      <Tabs defaultValue="all-logs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-logs">Todas las actividades</TabsTrigger>
          <TabsTrigger value="user-logs">Usuarios</TabsTrigger>
          <TabsTrigger value="course-logs">Cursos</TabsTrigger>
          <TabsTrigger value="system-logs">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-logs" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Registro de Actividades</CardTitle>
                  <CardDescription>
                    Historial de todas las acciones realizadas en la plataforma
                  </CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar actividades..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-1">
                    <CalendarRange className="h-4 w-4" />
                    Rango de fechas
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filtrar
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Usuarios
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Cursos
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Pagos
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Sistema
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button variant="outline" size="sm" className="w-full">Aplicar</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="hidden md:table-cell">Recurso</TableHead>
                      <TableHead className="w-[300px]">Detalles</TableHead>
                      <TableHead>Ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                          <TableCell>
                            <ActionBadge action={log.action} />
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="hidden md:table-cell">{log.resource}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalles</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          {searchTerm.trim() !== "" 
                            ? "No se encontraron actividades que coincidan con la búsqueda." 
                            : "No hay actividades para mostrar."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pestañas adicionales con contenido similar */}
        <TabsContent value="user-logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividades de Usuarios</CardTitle>
              <CardDescription>Acciones relacionadas con creación, modificación y acceso de usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="w-[300px]">Detalles</TableHead>
                      <TableHead>Ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs
                      .filter(log => log.action.startsWith("user.") || log.action.startsWith("role."))
                      .map(log => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                          <TableCell>
                            <ActionBadge action={log.action} />
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalles</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="course-logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividades de Cursos</CardTitle>
              <CardDescription>Acciones relacionadas con cursos y contenido educativo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="w-[300px]">Detalles</TableHead>
                      <TableHead>Ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs
                      .filter(log => log.action.startsWith("course."))
                      .map(log => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                          <TableCell>
                            <ActionBadge action={log.action} />
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalles</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system-logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actividades del Sistema</CardTitle>
              <CardDescription>Acciones del sistema y operaciones de mantenimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="w-[300px]">Detalles</TableHead>
                      <TableHead>Ver</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs
                      .filter(log => log.action.startsWith("payment.") || log.user === "sistema")
                      .map(log => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                          <TableCell>
                            <ActionBadge action={log.action} />
                          </TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalles</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

// Componente auxiliar para mostrar las badges de acción
const ActionBadge = ({ action }: { action: string }) => {
  if (action.startsWith("user.")) {
    return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Usuario</Badge>;
  } else if (action.startsWith("course.")) {
    return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Curso</Badge>;
  } else if (action.startsWith("payment.")) {
    return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Pago</Badge>;
  } else if (action.startsWith("role.")) {
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Rol</Badge>;
  } else {
    return <Badge variant="outline">{action.split('.')[0]}</Badge>;
  }
};

export default AuditLog;
