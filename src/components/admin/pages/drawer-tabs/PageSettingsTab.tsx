
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { PageData } from '../types';

interface PageSettingsTabProps {
  page: PageData;
}

const PageSettingsTab: React.FC<PageSettingsTabProps> = ({ page }) => {
  return (
    <div className="min-h-[60vh]">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Configuraciones de SEO</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Metadatos para motores de búsqueda.
          </p>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Título SEO</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md mt-1" 
                value={page.title} 
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Meta descripción</label>
              <textarea 
                className="w-full p-2 border rounded-md mt-1" 
                value={page.description} 
                readOnly
                rows={3}
              />
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Permisos y accesos</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Quién puede ver o editar esta página.
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="public" checked disabled />
              <label htmlFor="public" className="ml-2">Acceso público</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="auth" checked={false} disabled />
              <label htmlFor="auth" className="ml-2">Requiere autenticación</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="admin" checked={false} disabled />
              <label htmlFor="admin" className="ml-2">Solo administradores</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSettingsTab;
