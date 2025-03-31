
import React from 'react';
import { SitePage, PageBlock } from '@/types/pages';

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
    // Rendering based on block type would go here
    // For now, we'll just show the JSON
    return (
      <div className="p-4 bg-muted rounded-md">
        <pre className="text-xs overflow-auto">
          {JSON.stringify(block, null, 2)}
        </pre>
      </div>
    );
  };

  const renderPageByLayout = () => {
    // Different layouts would be rendered differently
    // For now, we'll just render a simple preview
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        
        {page.meta_description && (
          <p className="text-muted-foreground text-sm border-l-4 border-primary/20 pl-3 py-1">
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
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/30 rounded-md mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          Vista previa del diseño: <strong className="text-foreground">{page.layout}</strong>
        </div>
      </div>
      
      <div className="border rounded-md p-6 overflow-auto max-h-[500px]">
        {renderPageByLayout()}
      </div>
    </div>
  );
};

export default PagePreview;
