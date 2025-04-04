
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, AlertTriangle, Check, X, AlertCircle, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { toast } from 'sonner';

// Tipos para elementos en revisión
type ElementStatus = 'obsolete' | 'deprecated' | 'review' | 'current';

interface ReviewElement {
  id: string;
  name: string;
  type: 'component' | 'page' | 'route' | 'hook' | 'util';
  status: ElementStatus;
  path: string;
  replacedBy?: string;
  lastUpdated: string;
  usageCount: number;
  description?: string;
}

// Datos de ejemplo - En producción estos vendrían de una API o base de datos
const MOCK_ELEMENTS: ReviewElement[] = [
  {
    id: '1',
    name: 'AppRouter',
    type: 'route',
    status: 'deprecated',
    path: 'src/routes/AppRouter.tsx',
    replacedBy: 'AppRoutes',
    lastUpdated: '2023-10-15',
    usageCount: 2,
    description: 'Router antiguo que está siendo reemplazado por AppRoutes'
  },
  {
    id: '2',
    name: 'LegacyButton',
    type: 'component',
    status: 'obsolete',
    path: 'src/components/LegacyButton.tsx',
    replacedBy: '@/components/ui/button',
    lastUpdated: '2023-08-22',
    usageCount: 5,
    description: 'Botón antiguo que debe ser reemplazado por el componente Button de UI'
  },
  {
    id: '3',
    name: 'OldUserProfile',
    type: 'page',
    status: 'deprecated',
    path: 'src/pages/OldUserProfile.tsx',
    replacedBy: 'ProfilePage',
    lastUpdated: '2023-09-30',
    usageCount: 1,
    description: 'Página de perfil antigua que debe ser reemplazada'
  },
  {
    id: '4',
    name: 'useLocalStorage',
    type: 'hook',
    status: 'review',
    path: 'src/hooks/useLocalStorage.ts',
    lastUpdated: '2023-11-05',
    usageCount: 8,
    description: 'Hook para localStorage que necesita revisión para mejorar tipado'
  },
  {
    id: '5',
    name: 'formatDate',
    type: 'util',
    status: 'review',
    path: 'src/utils/formatDate.ts',
    lastUpdated: '2023-11-10',
    usageCount: 12,
    description: 'Función de formato de fecha que puede necesitar actualización'
  }
];

// Componente para filtrar elementos
const ElementsFilter: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  statusFilter: ElementStatus | 'all';
  setStatusFilter: (value: ElementStatus | 'all') => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
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

// Componente principal
const ReviewElementsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ElementStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedElement, setSelectedElement] = useState<ReviewElement | null>(null);
  
  // En una implementación real, esto vendría de una API
  const { data: elements = MOCK_ELEMENTS, isLoading, refetch } = useQuery({
    queryKey: ['review-elements'],
    queryFn: async () => {
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_ELEMENTS;
    }
  });
  
  // Filtrado de elementos
  const filteredElements = elements.filter(el => {
    const matchesSearch = search.trim() === '' || 
      el.name.toLowerCase().includes(search.toLowerCase()) ||
      el.path.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || el.status === statusFilter;
    const matchesType = typeFilter === 'all' || el.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Helper para mostrar badge según status
  const getStatusBadge = (status: ElementStatus) => {
    switch (status) {
      case 'obsolete':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <X className="h-3 w-3" />
          Obsoleto
        </Badge>;
      case 'deprecated':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Deprecado
        </Badge>;
      case 'review':
        return <Badge variant="default" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          En revisión
        </Badge>;
      case 'current':
        return <Badge variant="outline" className="flex items-center gap-1">
          <Check className="h-3 w-3" />
          Actual
        </Badge>;
    }
  };
  
  // Helper para mostrar badge según tipo
  const getTypeBadge = (type: string) => {
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
  
  const handleMarkAsCurrent = (id: string) => {
    // En implementación real, llamaríamos a una API
    toast.success(`Elemento marcado como actual`);
    // Aquí actualizaríamos el estado y recargaríamos
    // refetch();
  };
  
  const handleDelete = (id: string) => {
    // En implementación real, llamaríamos a una API
    toast.success(`Elemento eliminado correctamente`);
    // Aquí actualizaríamos el estado y recargaríamos
    // refetch();
  };
  
  return (
    <AdminPageLayout
      title="Revisión de Elementos"
      subtitle="Administra y revisa elementos obsoletos, deprecados o que necesitan revisión"
    >
      <Card>
        <CardHeader>
          <CardTitle>Elementos para Revisión</CardTitle>
          <CardDescription>
            Lista de componentes, páginas, rutas, hooks y utilidades que requieren atención
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ElementsFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Cargando elementos...
                    </TableCell>
                  </TableRow>
                ) : filteredElements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No se encontraron elementos para los filtros seleccionados
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredElements.map((element) => (
                    <TableRow key={element.id}>
                      <TableCell>
                        <div className="font-medium">{element.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {element.path}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(element.type)}</TableCell>
                      <TableCell>{getStatusBadge(element.status)}</TableCell>
                      <TableCell>{element.usageCount}</TableCell>
                      <TableCell>{element.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedElement(element)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {element.status !== 'current' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkAsCurrent(element.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(element.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredElements.length} de {elements.length} elementos
          </div>
        </CardFooter>
      </Card>
      
      {selectedElement && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedElement.name}
              {getStatusBadge(selectedElement.status)}
            </CardTitle>
            <CardDescription>
              {selectedElement.path}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Tipo</Label>
                <div>{getTypeBadge(selectedElement.type)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Número de Usos</Label>
                <div>{selectedElement.usageCount}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Última Actualización</Label>
                <div>{selectedElement.lastUpdated}</div>
              </div>
              {selectedElement.replacedBy && (
                <div>
                  <Label className="text-sm font-medium">Reemplazado por</Label>
                  <div className="font-mono text-sm">{selectedElement.replacedBy}</div>
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium">Descripción</Label>
              <div className="mt-1 text-sm">{selectedElement.description}</div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Acciones Recomendadas</Label>
              <div className="space-y-2">
                {selectedElement.status === 'obsolete' && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm">
                    <strong>Eliminar:</strong> Este elemento es obsoleto y debe ser eliminado del código.
                  </div>
                )}
                {selectedElement.status === 'deprecated' && selectedElement.replacedBy && (
                  <div className="p-3 bg-amber-100 border border-amber-200 rounded-md text-sm dark:bg-amber-900/20 dark:border-amber-800/30">
                    <strong>Reemplazar:</strong> Este elemento está depreciado y debe ser reemplazado por <code className="font-mono">{selectedElement.replacedBy}</code>.
                  </div>
                )}
                {selectedElement.status === 'review' && (
                  <div className="p-3 bg-blue-100 border border-blue-200 rounded-md text-sm dark:bg-blue-900/20 dark:border-blue-800/30">
                    <strong>Revisar:</strong> Este elemento necesita ser revisado para determinar si debe actualizarse o reemplazarse.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSelectedElement(null)}
            >
              Cerrar
            </Button>
            {selectedElement.status !== 'current' && (
              <Button onClick={() => {
                handleMarkAsCurrent(selectedElement.id);
                setSelectedElement(null);
              }}>
                Marcar como Actual
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </AdminPageLayout>
  );
};

export default ReviewElementsPage;
