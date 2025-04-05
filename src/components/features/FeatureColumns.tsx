
import React from 'react';
import { TableColumn } from '@/components/global-table/types';
import { Feature } from '@/data/features';
import { Badge } from '@/components/ui/badge';
import { getCategoryIcon, getStatusBadge, getCategoryLabel } from './FeatureUtils';

export const createFeatureColumns = (): TableColumn<Feature>[] => {
  return [
    {
      id: "name",
      header: "Nombre",
      accessorKey: "name",
      type: 'text',
      required: true,
      editable: true,
      cell: ({ getValue }) => (
        <div className="font-medium">{getValue() as string}</div>
      )
    },
    {
      id: "category",
      header: "Categoría",
      accessorKey: "category",
      type: 'select',
      editable: true,
      options: [
        { label: 'Plataforma', value: 'platform' },
        { label: 'Contenido', value: 'content' },
        { label: 'Usuarios', value: 'users' },
        { label: 'Apariencia', value: 'appearance' },
        { label: 'Notificaciones', value: 'notification' },
        { label: 'Seguridad', value: 'security' },
        { label: 'Sistema', value: 'system' },
        { label: 'Integración', value: 'integration' },
      ],
      cell: ({ getValue }) => {
        const category = getValue() as string;
        
        return (
          <div className="flex items-center gap-2">
            {getCategoryIcon(category)}
            <span>{getCategoryLabel(category)}</span>
          </div>
        );
      }
    },
    {
      id: "status",
      header: "Estado",
      accessorKey: "status",
      type: 'select',
      editable: true,
      options: [
        { label: 'Activa', value: 'active' },
        { label: 'Inactiva', value: 'inactive' },
        { label: 'Experimental', value: 'experimental' },
        { label: 'Obsoleta', value: 'deprecated' },
      ],
      cell: ({ getValue }) => getStatusBadge(getValue() as string)
    },
    {
      id: "isCore",
      header: "Núcleo",
      accessorKey: "isCore",
      type: 'boolean',
      editable: true,
      cell: ({ getValue }) => (
        <div className="text-center">
          {getValue() ? (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              Esencial
            </Badge>
          ) : null}
        </div>
      )
    },
    {
      id: "requiresPermission",
      header: "Permisos",
      accessorKey: "requiresPermission",
      type: 'boolean',
      editable: true,
      cell: ({ getValue }) => (
        <div className="text-center">
          {getValue() ? (
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              Restringida
            </Badge>
          ) : null}
        </div>
      )
    },
    {
      id: "updatedAt",
      header: "Actualizado",
      accessorKey: "updatedAt",
      type: 'date',
      editable: false,
    },
  ];
};
