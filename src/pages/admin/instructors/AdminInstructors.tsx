
import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Search, School } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/shared/DataTable';
import { DataTableColumnHeader } from '@/components/shared/DataTableColumnHeader';

const AdminInstructors: React.FC = () => {
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Nombre" />,
      cell: ({ row }: any) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }: any) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "courses",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Cursos" />,
      cell: ({ row }: any) => <div>{row.original.courses}</div>,
    },
    {
      accessorKey: "students",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Estudiantes" />,
      cell: ({ row }: any) => <div>{row.original.students}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Estado" />,
      cell: ({ row }: any) => (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block 
          ${row.original.status === 'Activo' ? 'bg-green-100 text-green-800' : 
            row.original.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}`}
        >
          {row.original.status}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <School className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Users className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const data = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", courses: 5, students: 143, status: "Activo" },
    { id: 2, name: "María García", email: "maria@example.com", courses: 3, students: 87, status: "Activo" },
    { id: 3, name: "Carlos López", email: "carlos@example.com", courses: 1, students: 32, status: "Pendiente" },
    { id: 4, name: "Ana Rodríguez", email: "ana@example.com", courses: 0, students: 0, status: "Inactivo" },
    { id: 5, name: "Roberto Martínez", email: "roberto@example.com", courses: 7, students: 219, status: "Activo" },
  ];

  return (
    <SectionPageLayout
      title="Instructores"
      subtitle="Gestiona los instructores de la plataforma"
      actions={[
        <Button key="add-instructor">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Instructor
        </Button>
      ]}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar instructores..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex-1" />
          <Button variant="outline">
            Filtros
          </Button>
          <Button variant="outline">
            Exportar
          </Button>
        </div>

        <div className="rounded-md border">
          <DataTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </SectionPageLayout>
  );
};

export default AdminInstructors;
