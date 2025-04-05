
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { PageData } from '@/components/admin/pages/types';
import { mockPagesData } from '@/components/admin/pages/data/mockPages';

// Simple column definition to replace the imported one
const createPageColumns = () => [
  {
    accessorKey: 'title',
    header: 'Título'
  },
  {
    accessorKey: 'path',
    header: 'Ruta'
  },
  {
    accessorKey: 'status',
    header: 'Estado'
  },
  {
    accessorKey: 'updated',
    header: 'Actualizado'
  }
];

const PagesManagement: React.FC = () => {
  const columns = createPageColumns();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Gestión de Páginas</CardTitle>
              <CardDescription>
                Administra las páginas y la navegación del sistema
              </CardDescription>
            </div>
            <Button asChild>
              <Link to="/admin/settings/pages/create">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Página
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AdvancedDataTable 
            columns={columns} 
            data={mockPagesData}
            searchPlaceholder="Buscar página..."
            exportFilename="paginas-sistema"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesManagement;
