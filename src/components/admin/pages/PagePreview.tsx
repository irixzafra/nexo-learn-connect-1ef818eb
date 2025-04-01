
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PagePreviewProps {
  page: {
    title: string;
    content?: any;
    meta_description?: string;
    layout?: string;
  };
}

const PagePreview: React.FC<PagePreviewProps> = ({ page }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="border rounded-md p-6">
            <h1 className="text-2xl font-bold mb-4">{page.title || 'Sin título'}</h1>
            
            <div className="prose max-w-none">
              {typeof page.content === 'string' ? (
                <p>{page.content}</p>
              ) : page.content?.blocks?.length > 0 ? (
                <div>
                  {page.content.blocks.map((block: any, index: number) => (
                    <div key={index} className="mb-4 p-2 border rounded">
                      <strong>Bloque de tipo: {block.type}</strong>
                      <div>
                        {typeof block.content === 'string' ? (
                          <p>{block.content}</p>
                        ) : (
                          <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(block.content, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay contenido para mostrar</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Información SEO</h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Meta descripción:</span>
              <p className="text-muted-foreground text-sm">
                {page.meta_description || 'No hay meta descripción definida'}
              </p>
            </div>
            <div>
              <span className="font-medium">Layout:</span>
              <p className="text-muted-foreground text-sm">
                {page.layout || 'default'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-primary/10 border border-primary/20 rounded-md p-4 text-sm">
        <p>Esta es una vista previa simplificada. La apariencia final puede variar dependiendo del diseño y estilos de la página.</p>
      </div>
    </div>
  );
};

export default PagePreview;
