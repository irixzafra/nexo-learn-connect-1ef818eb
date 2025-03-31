
import React, { useState } from 'react';
import { AdminDataTable } from '@/components/shared/AdminDataTable';
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { 
  BookOpen, 
  MoreHorizontal, 
  Users, 
  ArrowUpRight, 
  Calendar, 
  Tag, 
  Plus, 
  FileEdit,
  Trash,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Definición de tipos para cursos
interface Course {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  category: string;
  enrolledStudents: number;
  createdAt: string;
  updatedAt: string;
  instructor: string;
}

const AllCoursesTab: React.FC = () => {
  // Datos de ejemplo para cursos
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "course-1",
      title: "Introducción a React",
      slug: "introduccion-react",
      status: "published",
      category: "Programación",
      enrolledStudents: 124,
      createdAt: "2023-08-12T10:00:00Z",
      updatedAt: "2023-09-05T14:30:00Z",
      instructor: "Ana Martínez"
    },
    {
      id: "course-2",
      title: "Desarrollo Frontend Avanzado",
      slug: "frontend-avanzado",
      status: "draft",
      category: "Desarrollo Web",
      enrolledStudents: 0,
      createdAt: "2023-09-01T08:15:00Z",
      updatedAt: "2023-09-10T16:45:00Z",
      instructor: "Carlos García"
    },
    {
      id: "course-3",
      title: "Node.js para Principiantes",
      slug: "nodejs-principiantes",
      status: "published",
      category: "Programación",
      enrolledStudents: 87,
      createdAt: "2023-07-20T11:30:00Z",
      updatedAt: "2023-08-28T09:20:00Z",
      instructor: "Laura Fernández"
    },
    {
      id: "course-4",
      title: "Bases de Datos SQL y NoSQL",
      slug: "bases-datos-sql-nosql",
      status: "published",
      category: "Bases de Datos",
      enrolledStudents: 65,
      createdAt: "2023-06-15T14:00:00Z",
      updatedAt: "2023-07-10T13:15:00Z",
      instructor: "Miguel Torres"
    },
    {
      id: "course-5",
      title: "Diseño UI/UX Moderno",
      slug: "diseno-ui-ux-moderno",
      status: "archived",
      category: "Diseño",
      enrolledStudents: 45,
      createdAt: "2023-05-10T09:45:00Z",
      updatedAt: "2023-06-05T10:30:00Z",
      instructor: "Patricia López"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Publicado</Badge>;
      case "draft":
        return <Badge variant="secondary">Borrador</Badge>;
      case "archived":
        return <Badge variant="outline">Archivado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Columnas para la tabla de cursos
  const columns: ColumnDef<Course, any>[] = [
    createColumn<Course>({
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("title")}</span>
        </div>
      ),
    }),
    createColumn<Course>({
      accessorKey: "instructor",
      header: "Instructor",
    }),
    createColumn<Course>({
      accessorKey: "category",
      header: "Categoría",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span>{getValue() as string}</span>
        </div>
      ),
    }),
    createColumn<Course>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ getValue }) => getStatusBadge(getValue() as string),
    }),
    createColumn<Course>({
      accessorKey: "enrolledStudents",
      header: "Estudiantes",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{getValue() as number}</span>
        </div>
      ),
    }),
    createColumn<Course>({
      accessorKey: "updatedAt",
      header: "Actualizado",
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(date), "dd/MM/yyyy")}</span>
          </div>
        );
      },
    }),
    createActionsColumn<Course>(({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Trash className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      );
    }),
  ];

  return (
    <AdminDataTable
      title="Cursos"
      description="Gestiona todos los cursos de la plataforma"
      columns={columns}
      data={courses}
      searchPlaceholder="Buscar curso..."
      searchColumn="title"
      createButtonLabel="Crear Curso"
      createButtonIcon={<Plus className="h-4 w-4 mr-2" />}
      onCreateClick={() => {}}
      emptyState={
        <div className="text-center py-10">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No se encontraron cursos</p>
        </div>
      }
      actionButtons={
        <Button variant="outline" size="sm">
          <Tag className="h-4 w-4 mr-2" />
          Filtrar por categoría
        </Button>
      }
    />
  );
};

export default AllCoursesTab;
