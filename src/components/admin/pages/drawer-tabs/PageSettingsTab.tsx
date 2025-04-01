
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { PageData } from '../types';
import { CheckboxWithLabel } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PageSettingsTabProps {
  page: PageData;
}

const PageSettingsTab: React.FC<PageSettingsTabProps> = ({ page }) => {
  const [accessType, setAccessType] = useState<string>(page.accessType || 'public');
  
  const handlePermissionChange = (value: string) => {
    setAccessType(value);
    // In a real implementation, you would update the page permissions here
    toast.success(`Permisos de acceso actualizados a: ${value}`);
  };

  return (
    <div className="min-h-[60vh]">
      <div className="space-y-6">
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
          
          <Card>
            <CardContent className="pt-6">
              <RadioGroup value={accessType} onValueChange={handlePermissionChange}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Acceso público</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="authenticated" id="authenticated" />
                    <Label htmlFor="authenticated">Requiere autenticación</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Solo administradores</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-2">Construir con IA</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Genera contenido para esta página usando IA.
          </p>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Generador de Contenido IA</CardTitle>
              <CardDescription>
                Utiliza inteligencia artificial para generar contenido para tu página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">Esta funcionalidad estará disponible próximamente.</p>
                <button 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  onClick={() => toast.info('Funcionalidad en desarrollo')}
                >
                  Generar con IA
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageSettingsTab;
