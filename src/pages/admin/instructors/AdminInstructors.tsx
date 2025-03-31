
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Download, Filter, PlusCircle, RefreshCw, Search } from 'lucide-react';

const AdminInstructors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Mock instructors data
  const instructors = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', status: 'active', courses: 5, students: 120, rating: 4.8 },
    { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', status: 'active', courses: 3, students: 85, rating: 4.5 },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', status: 'inactive', courses: 2, students: 45, rating: 4.2 },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', status: 'active', courses: 7, students: 210, rating: 4.9 },
    { id: 5, name: 'Luis Sánchez', email: 'luis.sanchez@example.com', status: 'pending', courses: 0, students: 0, rating: 0 },
  ];
  
  const filteredInstructors = instructors.filter(
    instructor => 
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Instructores",
        description: "Administra los instructores de la plataforma"
      }}
      actions={[
        <Button key="new-instructor" variant="default" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Instructor
        </Button>,
        <Button key="refresh" variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>,
        <Button key="export" variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      ]}
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="inactive">Inactivos</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar instructor..."
                className="pl-8 w-full sm:w-auto min-w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="name">
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="courses">Cursos</SelectItem>
                <SelectItem value="students">Estudiantes</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="m-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
            
            {filteredInstructors.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-10 bg-card rounded-lg border">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">No se encontraron instructores</p>
                  <Button variant="outline" size="sm">
                    Limpiar filtros
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="m-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors
              .filter(instructor => instructor.status === 'active')
              .map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="m-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors
              .filter(instructor => instructor.status === 'pending')
              .map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="m-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredInstructors
              .filter(instructor => instructor.status === 'inactive')
              .map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

interface InstructorCardProps {
  instructor: {
    id: number;
    name: string;
    email: string;
    status: string;
    courses: number;
    students: number;
    rating: number;
  };
}

const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${instructor.id}`} />
              <AvatarFallback>{instructor.name[0]}{instructor.name.split(' ')[1]?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{instructor.name}</CardTitle>
              <CardDescription className="text-xs">{instructor.email}</CardDescription>
            </div>
          </div>
          <StatusBadge status={instructor.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-1 mb-4">
          <div className="text-center">
            <p className="text-xl font-bold">{instructor.courses}</p>
            <p className="text-xs text-muted-foreground">Cursos</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{instructor.students}</p>
            <p className="text-xs text-muted-foreground">Estudiantes</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{instructor.rating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm">Perfil</Button>
          <Button variant="outline" size="sm">Cursos</Button>
          <Button size="sm">Editar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'active':
      return <Badge variant="default">Activo</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300">Pendiente</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactivo</Badge>;
    default:
      return null;
  }
};

export default AdminInstructors;
