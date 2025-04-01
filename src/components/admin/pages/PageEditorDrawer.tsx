
import React, { useState } from 'react';
import { 
  Drawer, 
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Code,
  Eye,
  FileText,
  Settings,
  ExternalLink,
  Save,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PageData {
  title: string;
  path: string;
  description: string;
  status: string;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  updated?: string;
  component?: string;
}

interface PageEditorDrawerProps {
  page: PageData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PageEditorDrawer: React.FC<PageEditorDrawerProps> = ({
  page,
  open,
  onOpenChange
}) => {
  const [activeTab, setActiveTab] = useState('preview');

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

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-2xl font-semibold">
                  {page.title}
                </DrawerTitle>
                <DrawerDescription className="flex items-center gap-2 mt-1">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    {page.path}
                  </code>
                  {getStatusBadge(page.status)}
                </DrawerDescription>
              </div>
              <Button variant="outline" size="icon" asChild>
                <a href={page.path} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Abrir en nueva pestaña</span>
                </a>
              </Button>
            </div>
            
            <Tabs 
              defaultValue="preview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="grid grid-cols-4 w-full mb-4">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Vista previa</span>
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Editar</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span>Código</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="p-4 border rounded-md min-h-[60vh]">
                <div className="flex flex-col items-center justify-center h-full">
                  <iframe 
                    src={page.path} 
                    className="w-full h-[60vh] border rounded" 
                    title={`Vista previa de ${page.title}`}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="edit" className="space-y-4 min-h-[60vh]">
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
              </TabsContent>
              
              <TabsContent value="code" className="min-h-[60vh]">
                <div className="bg-muted rounded-md p-4 overflow-auto h-[60vh]">
                  <pre className="text-xs">
                    <code>
{`// Componente: ${page.component}
// Ruta: ${page.path}

import React from 'react';

const ${page.component} = () => {
  return (
    <div>
      <h1>${page.title}</h1>
      <p>${page.description}</p>
    </div>
  );
};

export default ${page.component};`}
                    </code>
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="min-h-[60vh]">
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
              </TabsContent>
            </Tabs>
          </DrawerHeader>
          
          <DrawerFooter className="flex flex-row justify-between pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PageEditorDrawer;
