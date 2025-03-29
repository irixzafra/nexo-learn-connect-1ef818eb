
import React, { useState } from "react";
import { 
  Search, 
  UserPlus, 
  Mail, 
  MoreHorizontal, 
  ChevronDown, 
  CheckCircle2, 
  XCircle,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para la demostración
const mockStudents = [
  {
    id: "1",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@ejemplo.com",
    enrolledCourses: 3,
    lastActive: "Hoy",
    progress: 68,
    status: "active"
  },
  {
    id: "2",
    name: "Sofía Rodríguez",
    email: "sofia.rodriguez@ejemplo.com",
    enrolledCourses: 2,
    lastActive: "Ayer",
    progress: 91,
    status: "active"
  },
  {
    id: "3",
    name: "Miguel Ángel Torres",
    email: "miguel.torres@ejemplo.com",
    enrolledCourses: 1,
    lastActive: "Hace 3 días",
    progress: 24,
    status: "at_risk"
  },
  {
    id: "4",
    name: "Elena Vargas",
    email: "elena.vargas@ejemplo.com",
    enrolledCourses: 4,
    lastActive: "Hace 1 semana",
    progress: 52,
    status: "inactive"
  },
  {
    id: "5",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    enrolledCourses: 2,
    lastActive: "Hace 2 días",
    progress: 78,
    status: "active"
  },
];

// Componente para mostrar el estado del estudiante
const StudentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
          Activo
        </Badge>
      );
    case "at_risk":
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <ChevronDown className="h-3.5 w-3.5 mr-1" />
          En riesgo
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3.5 w-3.5 mr-1" />
          Inactivo
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconocido</Badge>;
  }
};

// Componente para la barra de progreso
const ProgressBar = ({ value }: { value: number }) => {
  const getProgressColor = (val: number) => {
    if (val < 30) return "bg-red-500";
    if (val < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div 
        className={`h-2.5 rounded-full ${getProgressColor(value)}`} 
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

const InstructorStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [activeFilter, setActiveFilter] = useState("all");

  // Función para filtrar estudiantes
  const filterStudents = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredStudents(
        mockStudents.filter(student => 
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(
        mockStudents.filter(student => 
          (student.status === filter) && 
          (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          student.email.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  };

  // Manejar la búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterStudents(activeFilter);
  };

  // Estadísticas de estudiantes
  const stats = {
    total: mockStudents.length,
    active: mockStudents.filter(s => s.status === "active").length,
    atRisk: mockStudents.filter(s => s.status === "at_risk").length,
    inactive: mockStudents.filter(s => s.status === "inactive").length,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Estudiantes</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes en Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.atRisk}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes Inactivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={filterStudents}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="at_risk">En Riesgo</TabsTrigger>
            <TabsTrigger value="inactive">Inactivos</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar estudiantes..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Mensaje
            </Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invitar
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="m-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Cursos</TableHead>
                    <TableHead>Última actividad</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                          {student.enrolledCourses}
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{student.progress}%</span>
                          <ProgressBar value={student.progress} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <StudentStatusBadge status={student.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                            <DropdownMenuItem>Gestionar cursos</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="m-0">
          {/* El mismo contenido se filtra automáticamente con la función filterStudents */}
        </TabsContent>
        
        <TabsContent value="at_risk" className="m-0">
          {/* El mismo contenido se filtra automáticamente con la función filterStudents */}
        </TabsContent>
        
        <TabsContent value="inactive" className="m-0">
          {/* El mismo contenido se filtra automáticamente con la función filterStudents */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorStudents;
