
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type PageStatus = 'active' | 'development' | 'not-implemented' | 'duplicate' | 'deprecated';

interface PageNavigationCardProps {
  title: string;
  path: string;
  description?: string;
  status: string;
  category?: string;
  importance?: 'high' | 'medium' | 'low';
}

export const PageNavigationCard: React.FC<PageNavigationCardProps> = ({
  title,
  path,
  description,
  status,
  category,
  importance = 'medium'
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Activo</Badge>;
      case 'development':
        return <Badge variant="secondary" className="bg-amber-500 text-black hover:bg-amber-600">En Desarrollo</Badge>;
      case 'not-implemented':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-200">No Implementado</Badge>;
      case 'duplicate':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">Duplicado</Badge>;
      case 'deprecated':
        return <Badge variant="destructive">Deprecado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getImportanceClass = () => {
    switch (importance) {
      case 'high':
        return 'border-l-4 border-primary';
      case 'medium':
        return 'border-l-2 border-primary/50';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("transition-shadow hover:shadow-md", getImportanceClass())}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {getStatusBadge(status)}
        </div>
        {category && <div className="text-xs text-muted-foreground">Categoría: {category}</div>}
      </CardHeader>
      <CardContent>
        {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono text-muted-foreground overflow-hidden text-ellipsis">{path}</div>
          <Button variant="outline" size="sm" asChild>
            <Link to={path} target="_blank" className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <span>Visitar</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
