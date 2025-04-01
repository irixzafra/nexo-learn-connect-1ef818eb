import React from 'react';
import { SitePage, PageBlock, contentToString, getContentValue } from '@/types/pages';

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
  const renderBlockContent = (block: PageBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose max-w-none my-6">
            {contentToString(block.content).split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        );
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg text-center my-6">
            <h2 className="text-3xl font-bold text-primary mb-4">{contentToString(block.content)}</h2>
          </div>
        );
      case 'cta':
        return (
          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center my-6">
            <h3 className="text-2xl font-bold mb-4">¡Actúa ahora!</h3>
            <p className="mb-6">{contentToString(block.content)}</p>
            <button className="bg-white text-primary hover:bg-primary-foreground px-6 py-2 rounded-md font-medium transition-colors">
              Empezar
            </button>
          </div>
        );
      case 'features':
        return (
          <div className="grid md:grid-cols-3 gap-6 my-8">
            {['Característica 1', 'Característica 2', 'Característica 3'].map((feature, i) => (
              <div key={i} className="border rounded-lg p-6 text-center hover:shadow-md transition-all">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-bold mb-2">{feature}</h3>
                <p className="text-muted-foreground text-sm">{contentToString(block.content)}</p>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="p-4 bg-muted rounded-md">
            <pre className="text-xs overflow-auto">
              {JSON.stringify(block, null, 2)}
            </pre>
          </div>
        );
    }
  };

  const renderPageByLayout = () => {
    switch (page.layout) {
      case 'landing':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">{page.title}</h1>
              {page.meta_description && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {page.meta_description}
                </p>
              )}
            </div>
            
            <div className="space-y-12">
              {page.content?.blocks && page.content.blocks.length > 0 ? (
                page.content.blocks.map((block, index) => (
                  <div key={block.id || index} className="block-preview">
                    {renderBlockContent(block)}
                  </div>
                ))
              ) : (
                <div className="p-8 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>Esta página no tiene bloques de contenido.</p>
                  <p className="text-sm mt-2">Utiliza el editor de contenido para añadir bloques.</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'sidebar':
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="sticky top-6">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-3">En esta página</h3>
                    <ul className="space-y-2 text-sm">
                      {page.content?.blocks && page.content.blocks.map((block, index) => (
                        <li key={index}>
                          <a href={`#block-${index}`} className="text-primary hover:underline">
                            {block.type === 'hero' ? 'Introducción' : 
                             block.type === 'features' ? 'Características' : 
                             block.type === 'cta' ? 'Llamada a la acción' : 
                             `Sección ${index + 1}`}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
                {page.meta_description && (
                  <p className="text-muted-foreground border-l-4 border-primary/20 pl-4 py-1 mb-8">
                    {page.meta_description}
                  </p>
                )}
                
                <div className="space-y-8">
                  {page.content?.blocks && page.content.blocks.length > 0 ? (
                    page.content.blocks.map((block, index) => (
                      <div id={`block-${index}`} key={block.id || index} className="block-preview">
                        {renderBlockContent(block)}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 border border-dashed rounded-md text-center text-muted-foreground">
                      <p>Esta página no tiene bloques de contenido.</p>
                      <p className="text-sm mt-2">Utiliza el editor de contenido para añadir bloques.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'full-width':
        return (
          <div className="w-full">
            <div className="bg-gradient-to-r from-primary to-primary-foreground text-white py-16 mb-8">
              <div className="max-w-5xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">{page.title}</h1>
                {page.meta_description && (
                  <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                    {page.meta_description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto px-4">
              <div className="space-y-12">
                {page.content?.blocks && page.content.blocks.length > 0 ? (
                  page.content.blocks.map((block, index) => (
                    <div key={block.id || index} className="block-preview">
                      {renderBlockContent(block)}
                    </div>
                  ))
                ) : (
                  <div className="p-8 border border-dashed rounded-md text-center text-muted-foreground">
                    <p>Esta página no tiene bloques de contenido.</p>
                    <p className="text-sm mt-2">Utiliza el editor de contenido para añadir bloques.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
            
            {page.meta_description && (
              <p className="text-muted-foreground text-lg mb-8">
                {page.meta_description}
              </p>
            )}
            
            <div className="space-y-8">
              {page.content?.blocks && page.content.blocks.length > 0 ? (
                page.content.blocks.map((block, index) => (
                  <div key={block.id || index} className="block-preview">
                    {renderBlockContent(block)}
                  </div>
                ))
              ) : (
                <div className="p-8 border border-dashed rounded-md text-center text-muted-foreground">
                  <p>Esta página no tiene bloques de contenido.</p>
                  <p className="text-sm mt-2">Utiliza el editor de contenido para añadir bloques.</p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/30 rounded-md mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          Vista previa del diseño: <strong className="text-foreground">{page.layout}</strong>
        </div>
      </div>
      
      <div className="border rounded-md p-0 overflow-hidden">
        <div className="p-6 max-h-[600px] overflow-auto">
          <div className="preview-container">
            {renderPageByLayout()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
