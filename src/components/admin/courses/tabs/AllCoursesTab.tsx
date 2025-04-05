
import React, { useState } from 'react';
import { GlobalDataTable } from '@/components/global-table';
import { TableColumn } from '@/components/global-table/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Tag, 
  Plus
} from 'lucide-react';

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

  // Define las columnas para la tabla de cursos usando nuestro sistema GlobalDataTable
  const columns: TableColumn<Course>[] = [
    {
      id: "title",
      header: "Título",
      accessorKey: "title",
      type: 'text',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{getValue() as string}</span>
        </div>
      ),
    },
    {
      id: "instructor",
      header: "Instructor",
      accessorKey: "instructor",
      type: 'text',
    },
    {
      id: "category",
      header: "Categoría",
      accessorKey: "category",
      type: 'text',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span>{getValue() as string}</span>
        </div>
      ),
    },
    {
      id: "status",
      header: "Estado",
      accessorKey: "status",
      type: 'select',
      options: [
        { label: 'Publicado', value: 'published' },
        { label: 'Borrador', value: 'draft' },
        { label: 'Archivado', value: 'archived' },
      ],
      cell: ({ getValue }) => getStatusBadge(getValue() as string),
    },
    {
      id: "enrolledStudents",
      header: "Estudiantes",
      accessorKey: "enrolledStudents",
      type: 'number',
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{getValue() as number}</span>
        </div>
      ),
    },
    {
      id: "updatedAt",
      header: "Actualizado",
      accessorKey: "updatedAt",
      type: 'date',
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(date), "dd/MM/yyyy")}</span>
          </div>
        );
      },
    }
  ];

  const handleCreateCourse = () => {
    console.log('Create course');
  };

  const handleEditCourse = (course: Course) => {
    console.log('Edit course', course);
  };

  const handleDeleteCourse = async (id: string) => {
    console.log('Delete course', id);
    setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
    return Promise.resolve();
  };

  return (
    <GlobalDataTable
      title="Cursos"
      description="Gestiona todos los cursos de la plataforma"
      columns={columns}
      data={courses}
      searchPlaceholder="Buscar curso..."
      searchColumn="title"
      onCreate={handleCreateCourse}
      onEdit={handleEditCourse}
      onDelete={handleDeleteCourse}
      createButtonLabel="Crear Curso"
      emptyState={
        <div className="text-center py-10">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No se encontraron cursos</p>
        </div>
      }
    />
  );
};

export default AllCoursesTab;
