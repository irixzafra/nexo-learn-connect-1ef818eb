
import React from 'react';
import { FileText, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createColumn, createActionsColumn } from '@/components/shared/DataTableUtils';
import { getStatusBadge } from '../utils/statusBadge';
import { PageData } from '../types';

export const createPageColumns = (handleRowClick: (page: PageData) => void) => [
  createColumn<PageData>({
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue('title')}</span>
      </div>
    )
  }),
  createColumn<PageData>({
    accessorKey: 'path',
    header: 'Ruta',
    cell: ({ getValue }) => (
      <code className="text-xs bg-muted px-1 py-0.5 rounded">
        {getValue() as string}
      </code>
    )
  }),
  createColumn<PageData>({
    accessorKey: 'category',
    header: 'Categoría',
  }),
  createColumn<PageData>({
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ getValue }) => getStatusBadge(getValue() as string)
  }),
  createColumn<PageData>({
    accessorKey: 'component',
    header: 'Componente',
    cell: ({ getValue }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {getValue() as string}
      </span>
    )
  }),
  createColumn<PageData>({
    accessorKey: 'updated',
    header: 'Actualización',
  }),
  createActionsColumn<PageData>(({ row }) => (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={(e) => {
        e.stopPropagation();
        handleRowClick(row.original);
      }}>
        <Edit className="h-4 w-4 mr-1" />
        Editar
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link to={row.getValue('path') as string} target="_blank" onClick={(e) => e.stopPropagation()}>
          <Eye className="h-4 w-4 mr-1" />
          Ver
        </Link>
      </Button>
    </div>
  ))
];
