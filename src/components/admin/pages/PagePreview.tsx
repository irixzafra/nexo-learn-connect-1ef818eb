
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageBlock } from '@/types/pages';

interface PagePreviewProps {
  page: {
    title: string;
    content?: {
      blocks: PageBlock[];
    };
    meta_description?: string;
    layout: string;
  };
}

const PagePreview: React.FC<PagePreviewProps> = ({ page }) => {
  const hasContent = page.content?.blocks && page.content.blocks.length > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-md border overflow-hidden">
        <div className="bg-muted px-4 py-2 text-xs border-b flex justify-between items-center">
          <span>Vista previa ({page.layout})</span>
          <span className="text-muted-foreground">Los estilos pueden variar en producción</span>
        </div>
        
        <div className={`bg-white p-6 ${page.layout === 'full-width' ? 'max-w-none' : 'max-w-4xl mx-auto'}`}>
          {/* Header */}
          <header className="mb-8 pb-4 border-b">
            <h1 className="text-3xl font-bold mb-2">{page.title || 'Título de la página'}</h1>
            {page.meta_description && (
              <p className="text-muted-foreground">{page.meta_description}</p>
            )}
          </header>
          
          {/* Content blocks */}
          {hasContent ? (
            <div className="space-y-8">
              {page.content!.blocks.map((block, idx) => (
                <div key={block.id || idx} className="pb-4">
                  {block.type === 'text' && (
                    <div className="prose max-w-none">
                      <p>{typeof block.content === 'string' ? block.content : 'Contenido de texto'}</p>
                    </div>
                  )}
                  
                  {block.type === 'hero' && (
                    <div className="bg-primary/10 p-12 rounded-lg text-center">
                      <h2 className="text-3xl font-bold mb-4">
                        {typeof block.content === 'string' ? block.content : 'Título del Hero'}
                      </h2>
                      <p className="text-muted-foreground">
                        Este es un bloque hero. En la versión final, tendría botones y posiblemente imágenes.
                      </p>
                    </div>
                  )}
                  
                  {block.type === 'cta' && (
                    <div className="bg-secondary/20 p-8 rounded-lg text-center">
                      <h3 className="text-2xl font-semibold mb-4">
                        {typeof block.content === 'string' ? block.content : 'Llamada a la acción'}
                      </h3>
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Botón de acción
                      </button>
                    </div>
                  )}
                  
                  {block.type === 'features' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/30 p-6 rounded-lg">
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-primary">1</span>
                        </div>
                        <h3 className="font-medium mb-2">Característica 1</h3>
                        <p className="text-sm text-muted-foreground">Descripción de la característica</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-primary">2</span>
                        </div>
                        <h3 className="font-medium mb-2">Característica 2</h3>
                        <p className="text-sm text-muted-foreground">Descripción de la característica</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-primary">3</span>
                        </div>
                        <h3 className="font-medium mb-2">Característica 3</h3>
                        <p className="text-sm text-muted-foreground">Descripción de la característica</p>
                      </div>
                    </div>
                  )}
                  
                  {!['text', 'hero', 'cta', 'features'].includes(block.type) && (
                    <div className="border border-dashed border-muted p-8 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        Bloque tipo "{block.type}" - Este tipo de bloque no tiene visualización de previsualización
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
              <p>Esta página aún no tiene contenido</p>
            </div>
          )}
        </div>
      </div>
      
      {!hasContent && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Página sin contenido</AlertTitle>
          <AlertDescription>
            Ve a la pestaña "Contenido" para añadir bloques a esta página.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PagePreview;
