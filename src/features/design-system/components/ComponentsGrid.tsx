
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DesignComponent } from '@/pages/design-system/DesignSystemPage';
import { getComponentsData } from '@/features/design-system/data/componentsData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ComponentsGridProps {
  searchTerm: string;
  categoryFilter: string | null;
}

const ComponentsGrid: React.FC<ComponentsGridProps> = ({ searchTerm, categoryFilter }) => {
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

  const handleCardClick = (component: DesignComponent) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredComponents.map((component) => (
        <Card 
          key={component.id} 
          className={cn(
            "transition-all hover:shadow-md", 
            component.path && "cursor-pointer hover:border-primary/50"
          )}
          onClick={() => handleCardClick(component)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <Badge 
                variant="outline" 
                className={cn("font-normal", getStatusColor(component.status))}
              >
                {translateStatus(component.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{component.description}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Uso:</span> {component.usage}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ComponentsGrid;
