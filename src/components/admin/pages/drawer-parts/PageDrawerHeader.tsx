
import React from 'react';
import { 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { PageData } from '../types';

interface PageDrawerHeaderProps {
  page: PageData;
  getStatusBadge: (status: string) => React.ReactNode;
}

const PageDrawerHeader: React.FC<PageDrawerHeaderProps> = ({ 
  page, 
  getStatusBadge 
}) => {
  return (
    <SheetHeader>
      <div className="flex items-center justify-between">
        <div>
          <SheetTitle className="text-2xl font-semibold">
            {page.title}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-2 mt-1">
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              {page.path}
            </code>
            {getStatusBadge(page.status)}
          </SheetDescription>
        </div>
        <Button variant="outline" size="icon" asChild>
          <a href={page.path} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Abrir en nueva pestaña</span>
          </a>
        </Button>
      </div>
    </SheetHeader>
  );
};

export default PageDrawerHeader;
