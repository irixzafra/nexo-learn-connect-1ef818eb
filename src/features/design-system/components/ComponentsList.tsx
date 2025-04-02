
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DesignComponent } from '@/pages/design-system/DesignSystemPage';
import { getComponentsData } from '@/features/design-system/data/componentsData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ComponentsListProps {
  searchTerm: string;
  categoryFilter: string | null;
}

const ComponentsList: React.FC<ComponentsListProps> = ({ searchTerm, categoryFilter }) => {
  const navigate = useNavigate();
  const components = getComponentsData();
  
  const filteredComponents = components.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || component.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: DesignComponent['status']) => {
    switch (status) {
      case 'stable':
        return 'bg-green-500/10 text-green-700 border-green-600/20';
      case 'beta':
        return 'bg-blue-500/10 text-blue-700 border-blue-600/20';
      case 'experimental':
        return 'bg-amber-500/10 text-amber-700 border-amber-600/20';
      case 'deprecated':
        return 'bg-red-500/10 text-red-700 border-red-600/20';
      default:
        return '';
    }
  };

  // Función para traducir el status
  const translateStatus = (status: DesignComponent['status']) => {
    switch (status) {
      case 'stable':
        return 'Estable';
      case 'beta':
        return 'Beta';
      case 'experimental':
        return 'Experimental';
      case 'deprecated':
        return 'Deprecado';
      default:
        return status;
    }
  };

  const handleRowClick = (component: DesignComponent) => {
    if (component.path) {
      navigate(component.path);
    }
  };

  if (filteredComponents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground text-center">
          No se encontraron componentes que coincidan con los criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Uso</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredComponents.map((component) => (
            <TableRow 
              key={component.id}
              className={cn(component.path && "cursor-pointer hover:bg-muted/50")}
              onClick={() => handleRowClick(component)}
            >
              <TableCell className="font-medium">{component.name}</TableCell>
              <TableCell>{component.description}</TableCell>
              <TableCell>{component.category}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn("font-normal", getStatusColor(component.status))}
                >
                  {translateStatus(component.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{component.usage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComponentsList;
