
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Home, ChevronRight, Plus, Settings2 } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import InlineEdit from '@/components/admin/InlineEdit';
import DraggableContent from '@/components/admin/DraggableContent';
import ResizableBlockContainer from '@/components/admin/ResizableBlockContainer';
import { PageBlock } from '@/types/pages';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isEditMode } = useEditMode();

  // Mock page data 
  const pageData = {
    title: `Página ${slug || 'dinámica'}`,
    description: 'Esta es una página dinámica con contenido personalizable',
    isPublished: true,
    content: [
      {
        id: 'block-1',
        type: 'header',
        content: 'Bienvenido a nuestra plataforma',
        tags: ['principal', 'intro']
      },
      {
        id: 'block-2',
        type: 'text',
        content: 'Ofrecemos soluciones innovadoras para el desarrollo profesional y académico.',
        tags: ['descripción']
      }
    ]
  };

  // Mock page blocks for draggable content
  const contentBlocks = [
    {
      id: 'draggable-1',
      order: 1,
      width: '100%',
      text: 'Bloque arrastrable 1',
      content: (
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Cursos destacados</h3>
          <p className="text-muted-foreground">Explora nuestros cursos más populares.</p>
        </div>
      )
    },
    {
      id: 'draggable-2',
      order: 2,
      width: '100%',
      text: 'Bloque arrastrable 2',
      content: (
        <div className="p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Recursos gratuitos</h3>
          <p className="text-muted-foreground">Accede a materiales educativos sin costo.</p>
        </div>
      )
    }
  ];

  // Mock functions for InlineEdit
  const handleContentChange = (value: string) => {
    console.log('Content changed to:', value);
  };

  // Mock functions for block management
  const handleAddBlock = (content: any, position: any) => {
    console.log('Adding block:', content, 'at position:', position);
  };

  const handleReorderBlocks = (items: any[]) => {
    console.log('Reordering blocks:', items);
  };

  const handleResizeBlock = (block: any, newSize: any) => {
    console.log('Resizing block:', block, 'to size:', newSize);
  };

  const handleLayoutChange = (block: any, newLayout: any) => {
    console.log('Changing layout of block:', block, 'to:', newLayout);
  };

  const handleMoveBlock = (block: any, direction: any) => {
    console.log('Moving block:', block, 'direction:', direction);
  };

  const handleTagsChange = (tags: string[]) => {
    console.log('Tags changed to:', tags);
  };

  // Render a single block
  const renderBlock = (block: PageBlock) => {
    return (
      <ResizableBlockContainer
        key={block.id}
        className="mb-6 p-4 border rounded-lg"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{block.type}</Badge>
            {isEditMode && (
              <Button variant="ghost" size="icon">
                <Settings2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="prose max-w-none">
            <InlineEdit
              value={block.content.toString()}
              onChange={handleContentChange}
              multiline={true}
              className="block"
            />
          </div>
          {isEditMode && (
            <div className="flex flex-wrap gap-2 pt-2">
              {block.tags?.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-5 text-xs">
                <Plus className="h-3 w-3 mr-1" /> Añadir etiqueta
              </Button>
            </div>
          )}
        </div>
      </ResizableBlockContainer>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6">
          <Button variant="link" className="p-0 h-auto" asChild>
            <a href="/">
              <Home className="h-4 w-4 mr-1" />
              Inicio
            </a>
          </Button>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-foreground">{pageData.title}</span>
          {isEditMode && (
            <>
              <div className="ml-auto flex items-center gap-2">
                <Badge variant={pageData.isPublished ? "default" : "outline"}>
                  {pageData.isPublished ? 'Publicado' : 'Borrador'}
                </Badge>
                <Button size="sm" variant="outline">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </>
          )}
        </nav>

        {/* Page header */}
        <header className="mb-8 pb-8 border-b">
          <h1 className="text-3xl font-bold mb-4">
            <InlineEdit
              value={pageData.title}
              onChange={handleContentChange}
              className="text-3xl font-bold"
            />
          </h1>
          <p className="text-lg text-muted-foreground">
            <InlineEdit
              value={pageData.description}
              onChange={handleContentChange}
              className="text-lg text-muted-foreground"
            />
          </p>
        </header>

        {/* Page content */}
        <div className="page-content">
          {/* Content blocks that can be edited inline */}
          <div className="blocks-container space-y-6">
            {pageData.content.map((block) => renderBlock(block as PageBlock))}
          </div>

          {/* Draggable content section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Secciones personalizables</h2>
            
            {/* Content that can be reordered in edit mode */}
            <DraggableContent
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {contentBlocks.map(block => (
                <div key={block.id} className="h-full">{block.content}</div>
              ))}
            </DraggableContent>
          </section>

          {/* Call to action section */}
          <div className="mt-16 text-center bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              <InlineEdit
                value="¿Listo para empezar?"
                onChange={handleContentChange}
                className="text-2xl font-bold"
              />
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              <InlineEdit
                value="Únete a nuestra comunidad y comienza tu viaje de aprendizaje hoy mismo."
                onChange={handleContentChange}
                className="text-muted-foreground"
              />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Registrarse</Button>
              <Button size="lg" variant="outline">Más información</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DynamicPage;
