import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { AdminTableHead } from '@/components/layout/admin/AdminPageLayout';

interface Certificate {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

const data: Certificate[] = [
  {
    id: '1',
    name: 'Certificado de Fundamentos de React',
    description: 'Este certificado valida tus conocimientos básicos de React.',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'Certificado de Desarrollo Avanzado en Node.js',
    description:
      'Este certificado valida tus habilidades avanzadas en el desarrollo de aplicaciones con Node.js.',
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    name: 'Certificado de Diseño de Interfaces de Usuario (UI)',
    description:
      'Este certificado valida tu capacidad para diseñar interfaces de usuario atractivas y funcionales.',
    createdAt: new Date('2023-03-10'),
  },
];

const CertificatesTab: React.FC = () => {
  const columns: ColumnDef<Certificate>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <AdminTableHead>{column.columnDef.header}</AdminTableHead>
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <AdminTableHead>{column.columnDef.header}</AdminTableHead>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <AdminTableHead>{column.columnDef.header}</AdminTableHead>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt') as Date);
        return date.toLocaleDateString();
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Crear Certificado
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de certificados disponibles.</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CertificatesTab;
