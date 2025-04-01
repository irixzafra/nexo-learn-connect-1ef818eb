
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { PageData } from '../types';

interface PageEditTabProps {
  page: PageData;
}

const PageEditTab: React.FC<PageEditTabProps> = ({ page }) => {
  return (
    <div className="space-y-4 min-h-[60vh]">
      <div className="grid gap-4">
        <div>
          <h3 className="font-medium mb-2">Descripción</h3>
          <p className="text-sm text-muted-foreground">{page.description}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Detalles</h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Categoría</dt>
              <dd>{page.category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Componente</dt>
              <dd>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {page.component}
                </code>
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Última actualización</dt>
              <dd>{page.updated}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Importancia</dt>
              <dd>{page.importance || 'Normal'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PageEditTab;
