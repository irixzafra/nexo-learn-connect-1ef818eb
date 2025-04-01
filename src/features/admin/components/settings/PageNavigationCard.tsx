
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PageStatus = 'active' | 'development' | 'not-implemented' | 'duplicate' | 'deprecated';

export interface PageNavigationCardProps {
  title: string;
  path: string;
  description?: string;
  status: PageStatus;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  image?: string;
}

const getStatusStyle = (status: PageStatus) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'development':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'not-implemented':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'duplicate':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'deprecated':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const getStatusLabel = (status: PageStatus) => {
  switch (status) {
    case 'active':
      return '✅ Activa';
    case 'development':
      return '🚧 En desarrollo';
    case 'not-implemented':
      return '❌ No implementada';
    case 'duplicate':
      return '🔄 Duplicada';
    case 'deprecated':
      return '⚠️ Deprecada';
    default:
      return status;
  }
};

const getImportanceStyle = (importance?: 'high' | 'medium' | 'low') => {
  switch (importance) {
    case 'high':
      return 'border-l-4 border-l-primary';
    case 'medium':
      return 'border-l-4 border-l-orange-400';
    case 'low':
      return 'border-l-4 border-l-muted';
    default:
      return '';
  }
};

export const PageNavigationCard: React.FC<PageNavigationCardProps> = ({
  title,
  path,
  description,
  status,
  category,
  importance,
  image
}) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", getImportanceStyle(importance))}>
      {image && (
        <div className="relative h-32 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
            <Badge variant="outline" className={cn("text-white border-white/20 bg-black/40")}>
              {category}
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className={!image ? "pb-2" : "pb-2 pt-3"}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="outline" className={cn(getStatusStyle(status))}>
            {getStatusLabel(status)}
          </Badge>
        </div>
        {!image && (
          <Badge variant="outline" className="w-fit">
            {category}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        {description && (
          <CardDescription className="text-xs">{description}</CardDescription>
        )}
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-3">
        <Button variant="ghost" size="sm" className="ml-auto gap-1" asChild>
          <Link to={path}>
            Visitar <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
