
import React from 'react';
import { AdminPageLayout } from '@/components/layout/admin/AdminPageLayout';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import DataTableColumnHeader from '@/components/shared/DataTableColumnHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import { 
  Teacher, 
  UsersRound, 
  BarChart3, 
  Award, 
  FileCheck,
  MessageSquare,
  FileText,
  BookOpen
} from 'lucide-react';

// Datos de ejemplo
const instructors = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', courses: 5, students: 120, rating: 4.8 },
  { id: 2, name: 'María Rodríguez', email: 'maria@example.com', courses: 3, students: 85, rating: 4.6 },
  { id: 3, name: 'Carlos Gómez', email: 'carlos@example.com', courses: 7, students: 210, rating: 4.9 },
  { id: 4, name: 'Ana Martínez', email: 'ana@example.com', courses: 2, students: 45, rating: 4.3 },
  { id: 5, name: 'Roberto Sánchez', email: 'roberto@example.com', courses: 4, students: 110, rating: 4.7 },
];

const AdminInstructors = () => {
  const tabs = [
    { value: 'instructors', label: 'Instructores', icon: <Teacher size={18} />, 
      content: <InstructorsTable data={instructors} /> 
    },
    { value: 'applicants', label: 'Solicitudes', icon: <UsersRound size={18} />, 
      content: <div className="h-96 flex items-center justify-center bg-muted/40 rounded-md">Contenido de solicitudes en desarrollo</div> 
    },
    { value: 'analytics', label: 'Analíticas', icon: <BarChart3 size={18} />, 
      content: <div className="h-96 flex items-center justify-center bg-muted/40 rounded-md">Contenido de analíticas en desarrollo</div> 
    },
    { value: 'certifications', label: 'Certificaciones', icon: <Award size={18} />, 
      content: <div className="h-96 flex items-center justify-center bg-muted/40 rounded-md">Contenido de certificaciones en desarrollo</div> 
    },
  ];

  return (
    <AdminPageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Instructores</h1>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Instructor
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <AdminTabs tabs={tabs} defaultValue="instructors" orientation="horizontal" />
    </AdminPageLayout>
  );
};

// Componente tabla de instructores
function InstructorsTable({ data }) {
  const columns = [
    {
      id: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      id: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      id: 'courses',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Cursos" />,
      cell: ({ row }) => (
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.original.courses}
        </div>
      ),
    },
    {
      id: 'students',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Estudiantes" />,
      cell: ({ row }) => (
        <div className="flex items-center">
          <UsersRound className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.original.students}
        </div>
      ),
    },
    {
      id: 'rating',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Valoración" />,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Award className="h-4 w-4 mr-2 text-amber-500" />
          {row.original.rating}
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Acciones</div>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="ghost" title="Ver perfil">
            <FileText className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" title="Enviar mensaje">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" title="Ver cursos">
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}

export default AdminInstructors;
