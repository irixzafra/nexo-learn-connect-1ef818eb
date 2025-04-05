
import React, { useState } from 'react';
import { AdvancedDataTable } from '@/components/shared/AdvancedDataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createColumn } from '@/components/shared/DataTableUtils';
import { PageHeader } from '@/components/ui/page-header';
import { ExternalLink, Check, AlertTriangle, FileCog, FileCode, Trash2, Box } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Tipos para elementos en revisión
type ElementStatus = 'obsolete' | 'deprecated' | 'review' | 'current';
type ElementType = 'component' | 'page' | 'route' | 'hook' | 'util';

interface ReviewElement {
  id: string;
  name: string;
  type: ElementType;
  status: ElementStatus;
  path: string;
  replacedBy?: string;
  lastUpdated: string;
  usageCount: number;
  description?: string;
}

// Componente para filtrar elementos
const ElementsFilter: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  statusFilter: ElementStatus | 'all';
  setStatusFilter: (value: ElementStatus | 'all') => void;
  typeFilter: ElementType | 'all';
  setTypeFilter: (value: ElementType | 'all') => void;
}> = ({ search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4">
      <div className="flex-1">
        <Input
          placeholder="Buscar por nombre o ruta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('all')}
        >
          Todos
        </Badge>
        <Badge 
          variant={statusFilter === 'obsolete' ? 'destructive' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('obsolete')}
        >
          Obsoletos
        </Badge>
        <Badge 
          variant={statusFilter === 'deprecated' ? 'secondary' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('deprecated')}
        >
          Deprecados
        </Badge>
        <Badge 
          variant={statusFilter === 'review' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('review')}
        >
          En revisión
        </Badge>
        <Badge 
          variant={statusFilter === 'current' ? 'outline' : 'outline'}
          className="cursor-pointer"
          onClick={() => setStatusFilter('current')}
        >
          Actuales
        </Badge>
      </div>
    </div>
  );
};

const ReviewElementsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ElementStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ElementType | 'all'>('all');
  const [selectedElement, setSelectedElement] = useState<ReviewElement | null>(null);
  
  // Realizar la consulta a la base de datos
  const { data: elementsData, isLoading, error, refetch } = useQuery({
    queryKey: ['review-elements'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('ui_components')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Transformamos los datos al formato que necesitamos
        return data.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: (item.type || 'component') as ElementType,
          status: (item.status === 'active' ? 'current' : 'review') as ElementStatus,
          path: item.path || '',
          lastUpdated: item.updated_at || item.created_at,
          usageCount: 0, // Podríamos calcular esto desde otra consulta
          description: item.description || ''
        })) as ReviewElement[];
      } catch (error) {
        console.error("Error fetching elements data:", error);
        return [];
      }
    }
  });
  
  // Si hay error en la carga de datos
  if (error) {
    toast.error("Error al cargar los elementos", {
      description: "No se pudieron obtener los elementos de la base de datos"
    });
  }
  
  // Filtrado de elementos
  const filteredElements = elementsData ? elementsData.filter(el => {
    const matchesSearch = search.trim() === '' || 
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      el.path.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || el.status === statusFilter;
    const matchesType = typeFilter === 'all' || el.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  }) : [];
  
  // Helper para mostrar badge según status
  const getStatusBadge = (status: ElementStatus) => {
    switch (status) {
      case 'obsolete':
        return <Badge variant="destructive">Obsoleto</Badge>;
      case 'deprecated':
        return <Badge variant="secondary">Deprecado</Badge>;
      case 'review':
        return <Badge variant="default">En revisión</Badge>;
      case 'current':
        return <Badge variant="outline">Actual</Badge>;
    }
  };
  
  // Helper para mostrar badge según tipo
  const getTypeBadge = (type: ElementType) => {
    switch (type) {
      case 'component':
        return <Badge variant="outline">Componente</Badge>;
      case 'page':
        return <Badge variant="outline">Página</Badge>;
      case 'route':
        return <Badge variant="outline">Ruta</Badge>;
      case 'hook':
        return <Badge variant="outline">Hook</Badge>;
      case 'util':
        return <Badge variant="outline">Utilidad</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  // Definición de columnas para la tabla
  const columns = [
    createColumn<ReviewElement>({
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
            {row.original.path}
          </div>
        </div>
      ),
    }),
    createColumn<ReviewElement>({
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => getTypeBadge(row.original.type),
    }),
    createColumn<ReviewElement>({
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),
    createColumn<ReviewElement>({
      accessorKey: "usageCount",
      header: "Usos",
      cell: ({ row }) => row.original.usageCount.toString(),
    }),
    createColumn<ReviewElement>({
      accessorKey: "lastUpdated",
      header: "Última Actualización",
      cell: ({ row }) => {
        const date = new Date(row.original.lastUpdated);
        return date.toLocaleDateString();
      },
    }),
    createColumn<ReviewElement>({
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedElement(row.original)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast.info(`Marcando como actual: ${row.original.name}`)}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast.info(`Eliminando: ${row.original.name}`)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Revisión de Elementos"
        description="Lista de componentes, páginas, rutas, hooks y utilidades que requieren atención"
      />
      
      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="pages">Páginas</TabsTrigger>
            <TabsTrigger value="routes">Rutas</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="utils">Utilidades</TabsTrigger>
          </TabsList>
          
          <ElementsFilter 
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          
          <AdvancedDataTable
            columns={columns}
            data={filteredElements}
            searchPlaceholder="Buscar por nombre o ruta..."
            emptyState={
              isLoading ? (
                <div className="text-center py-8">
                  <div className="spinner mb-2"></div>
                  <p className="text-muted-foreground">Cargando elementos...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Box className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No se encontraron elementos para los filtros seleccionados
                  </p>
                </div>
              )
            }
          />

          {selectedElement && (
            <div className="mt-8 border p-4 rounded-lg">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {selectedElement.name}
                {getStatusBadge(selectedElement.status)}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedElement.path}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium">Tipo</p>
                  <div>{getTypeBadge(selectedElement.type)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium">Número de Usos</p>
                  <div>{selectedElement.usageCount}</div>
                </div>
                <div>
                  <p className="text-sm font-medium">Última Actualización</p>
                  <div>{new Date(selectedElement.lastUpdated).toLocaleDateString()}</div>
                </div>
                {selectedElement.replacedBy && (
                  <div>
                    <p className="text-sm font-medium">Reemplazado por</p>
                    <div className="font-mono text-sm">{selectedElement.replacedBy}</div>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">Descripción</p>
                <p className="mt-1 text-sm">
                  {selectedElement.description || 'Sin descripción disponible'}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedElement(null)}
                >
                  Cerrar
                </Button>
                {selectedElement.status !== 'current' && (
                  <Button onClick={() => {
                    toast.info(`Marcando ${selectedElement.name} como Actual`);
                    setSelectedElement(null);
                  }}>
                    Marcar como Actual
                  </Button>
                )}
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ReviewElementsPage;
