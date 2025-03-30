
import React, { useState } from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { School, PlusCircle, Search, Check, X, Award, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRoleType } from '@/types/auth';

const AdminInstructors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para instructores
  const instructors = [
    { id: 1, name: "Carlos Rodríguez", email: "carlos@nexo.com", courses: 7, students: 345, rating: 4.8, status: "active" },
    { id: 2, name: "Maria Gómez", email: "maria@nexo.com", courses: 3, students: 127, rating: 4.5, status: "active" },
    { id: 3, name: "Juan Pérez", email: "juan@nexo.com", courses: 5, students: 210, rating: 4.6, status: "inactive" },
    { id: 4, name: "Laura Sánchez", email: "laura@nexo.com", courses: 2, students: 98, rating: 4.2, status: "pending" },
  ];

  const filteredInstructors = searchTerm.trim() === "" 
    ? instructors 
    : instructors.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Instructores",
        description: "Administra los instructores y sus cursos en la plataforma",
        actions: [
          {
            label: "Añadir Instructor",
            icon: <PlusCircle className="h-4 w-4" />,
            onClick: () => console.log("Añadir instructor clicked"),
          }
        ],
        breadcrumbs: [
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Instructores" }
        ]
      }}
      stats={{
        stats: [
          {
            label: "Instructores Activos",
            value: "24",
            icon: <School className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Cursos Impartidos",
            value: "87",
            icon: <BookOpen className="h-5 w-5" />,
            color: "success"
          },
          {
            label: "Calificación Promedio",
            value: "4.6",
            icon: <Award className="h-5 w-5" />,
            color: "warning"
          }
        ]
      }}
    >
      <Tabs defaultValue="all-instructors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-instructors">Todos los Instructores</TabsTrigger>
          <TabsTrigger value="pending">Solicitudes Pendientes</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-instructors" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Lista de Instructores</CardTitle>
                  <CardDescription>
                    Gestiona los instructores de la plataforma
                  </CardDescription>
                </div>
                <div className="relative mt-4 md:mt-0 w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar instructores..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Instructor</TableHead>
                      <TableHead>Cursos</TableHead>
                      <TableHead>Estudiantes</TableHead>
                      <TableHead>Calificación</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstructors.length > 0 ? (
                      filteredInstructors.map((instructor) => (
                        <TableRow key={instructor.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div>{instructor.name}</div>
                              <div className="text-sm text-muted-foreground">{instructor.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{instructor.courses}</TableCell>
                          <TableCell>{instructor.students}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-1">{instructor.rating}</span>
                              <Award className="h-4 w-4 text-yellow-500" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={instructor.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">Perfil</Button>
                              <Button variant="ghost" size="sm">Cursos</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          {searchTerm.trim() !== "" 
                            ? "No se encontraron instructores que coincidan con la búsqueda." 
                            : "No hay instructores para mostrar."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Instructor</CardTitle>
              <CardDescription>
                Revisa y aprueba solicitudes de nuevos instructores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Fecha de Solicitud</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div>Pedro Alvarez</div>
                        <div className="text-sm text-muted-foreground">pedro@gmail.com</div>
                      </div>
                    </TableCell>
                    <TableCell>Desarrollo Web</TableCell>
                    <TableCell>10/06/2023</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Aprobar
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <X className="h-3.5 w-3.5" />
                          Rechazar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <div>Ana Martínez</div>
                        <div className="text-sm text-muted-foreground">ana@gmail.com</div>
                      </div>
                    </TableCell>
                    <TableCell>Diseño Gráfico</TableCell>
                    <TableCell>08/06/2023</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Aprobar
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <X className="h-3.5 w-3.5" />
                          Rechazar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informes de Instructores</CardTitle>
              <CardDescription>
                Estadísticas y reportes sobre el desempeño de los instructores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                Sección en desarrollo. Los informes estarán disponibles próximamente.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

// Componente auxiliar para mostrar las badges de estado
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Activo</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactivo</Badge>;
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pendiente</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default AdminInstructors;
