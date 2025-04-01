
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Wand2, Loader2, RefreshCw, Eye, Code, Image } from 'lucide-react';
import { toast } from 'sonner';
import { PageBlock } from '@/types/pages';

interface AIPageCreatorProps {
  formData: {
    title: string;
    pageType: string;
    context: string;
    keepNexoStyles: boolean;
  };
  onContentGenerated: (content: any) => void;
}

const AIPageCreator: React.FC<AIPageCreatorProps> = ({ formData, onContentGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [generatedContent, setGeneratedContent] = useState<{ blocks: PageBlock[], description?: string } | null>(null);
  const [generationAttempts, setGenerationAttempts] = useState(0);

  // Detectar cambios en el formulario para mostrar botón de generación cuando sea apropiado
  useEffect(() => {
    if (generatedContent && (
      formData.title !== '' || 
      formData.context !== '' || 
      formData.pageType !== 'landing'
    )) {
      // Si ya teníamos contenido y cambian los parámetros, mostrar un aviso
      toast.info('Los parámetros han cambiado. Puedes regenerar el contenido.');
    }
  }, [formData.title, formData.context, formData.pageType, formData.keepNexoStyles]);

  const generateContent = async () => {
    if (!formData.title && !formData.context) {
      toast.error('Por favor, proporciona al menos un título o contexto para generar contenido');
      return;
    }

    try {
      setIsGenerating(true);
      setGenerationAttempts(prev => prev + 1);
      
      // Simulación de la generación con IA (en producción, esto sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar contenido según el tipo de página
      const mockGeneratedContent = generateMockContent(formData);
      
      setGeneratedContent(mockGeneratedContent);
      onContentGenerated(mockGeneratedContent);
      
      toast.success('Contenido generado con éxito');
      
      // Cambiar a la pestaña de vista previa
      setActiveTab('preview');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error al generar el contenido');
    } finally {
      setIsGenerating(false);
    }
  };

  // Función para regenerar el contenido
  const handleRegenerate = () => {
    generateContent();
  };

  // Esta función simula la generación de contenido según el tipo de página
  // En producción, se reemplazaría por llamadas reales a API de IA
  const generateMockContent = (data: AIPageCreatorProps['formData']) => {
    const blocks: PageBlock[] = [];
    const now = Date.now();
    
    // Hero section para casi todos los tipos de página
    blocks.push({
      id: `block-${now}-hero`,
      type: 'hero',
      content: {
        title: data.title || 'Título principal',
        subtitle: `Página de tipo ${data.pageType}`,
        cta: data.pageType === 'landing' ? 'Contáctanos' : undefined,
        image: data.pageType === 'landing' ? '/placeholder.svg' : undefined
      }
    });
    
    // Contenido específico según el tipo de página
    if (data.pageType === 'landing') {
      blocks.push(
        {
          id: `block-${now}-1`,
          type: 'features',
          content: {
            title: 'Nuestras características',
            items: [
              { title: 'Característica 1', description: 'Descripción de la característica 1' },
              { title: 'Característica 2', description: 'Descripción de la característica 2' },
              { title: 'Característica 3', description: 'Descripción de la característica 3' }
            ]
          }
        },
        {
          id: `block-${now}-2`,
          type: 'testimonials',
          content: {
            title: 'Lo que dicen nuestros clientes',
            items: [
              { name: 'Cliente 1', comment: 'Comentario del cliente 1', role: 'CEO' },
              { name: 'Cliente 2', comment: 'Comentario del cliente 2', role: 'Director' }
            ]
          }
        },
        {
          id: `block-${now}-3`,
          type: 'cta',
          content: {
            title: '¿Listo para empezar?',
            subtitle: 'Comienza hoy mismo',
            buttonText: 'Contáctanos'
          }
        }
      );
    } else if (data.pageType === 'blog') {
      blocks.push(
        {
          id: `block-${now}-1`,
          type: 'text',
          content: {
            text: 'Contenido del artículo. Este es un párrafo de ejemplo que sería generado por la IA con base en el contexto proporcionado. ' + 
                  (data.context || 'Aquí se generaría contenido relevante sobre el tema del blog.')
          }
        },
        {
          id: `block-${now}-2`,
          type: 'custom',
          content: {
            html: '<blockquote class="p-4 italic border-l-4 border-gray-300 my-6">"Cita importante relacionada con el tema"</blockquote>'
          }
        }
      );
    } else if (data.pageType === 'about') {
      blocks.push(
        {
          id: `block-${now}-1`,
          type: 'text',
          content: {
            text: 'Información sobre nuestra empresa/equipo. ' + 
                  (data.context || 'Descripción de la misión, visión y valores.')
          }
        },
        {
          id: `block-${now}-2`,
          type: 'custom',
          content: {
            html: '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">' +
                  '<div class="text-center p-4"><img src="/placeholder.svg" class="mx-auto rounded-full w-24 h-24 mb-3" /><h3 class="font-bold">Equipo 1</h3><p>Descripción</p></div>' +
                  '<div class="text-center p-4"><img src="/placeholder.svg" class="mx-auto rounded-full w-24 h-24 mb-3" /><h3 class="font-bold">Equipo 2</h3><p>Descripción</p></div>' +
                  '<div class="text-center p-4"><img src="/placeholder.svg" class="mx-auto rounded-full w-24 h-24 mb-3" /><h3 class="font-bold">Equipo 3</h3><p>Descripción</p></div>' +
                  '</div>'
          }
        }
      );
    } else {
      // Para otros tipos de página
      blocks.push({
        id: `block-${now}-1`,
        type: 'text',
        content: {
          text: `Contenido para página de tipo ${data.pageType}. ${data.context || ''}`
        }
      });
    }
    
    // Generar una descripción SEO
    const description = `Página de ${data.pageType}: ${data.title}. ${data.context?.substring(0, 100) || 'Descripción generada automáticamente.'}`;
    
    return { blocks, description };
  };

  // Helper function to get values from complex content objects
  const getContentValue = (content: any, key: string, defaultValue: string = '') => {
    if (!content) return defaultValue;
    if (typeof content === 'string') return content;
    return content[key] || defaultValue;
  };

  // Renderizar la vista previa del contenido generado
  const renderContentPreview = () => {
    if (!generatedContent) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/40 rounded-md min-h-[300px]">
          <Image className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Vista previa no disponible</h3>
          <p className="text-muted-foreground max-w-md">
            Proporciona información sobre tu página y haz clic en "Generar con IA" para ver la vista previa
          </p>
        </div>
      );
    }

    return (
      <div className="border rounded-md p-6 min-h-[300px] overflow-auto bg-card">
        <div className="space-y-6">
          {generatedContent.blocks.map(block => {
            if (block.type === 'hero') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="text-center py-12 px-4 space-y-4 border-b">
                  <h1 className="text-3xl font-bold">{getContentValue(content, 'title')}</h1>
                  <p className="text-xl text-muted-foreground">{getContentValue(content, 'subtitle')}</p>
                  {content.cta && (
                    <Button className="mt-4">{getContentValue(content, 'cta')}</Button>
                  )}
                </div>
              );
            } else if (block.type === 'features') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="py-8 px-4">
                  <h2 className="text-2xl font-bold text-center mb-6">{getContentValue(content, 'title')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {content.items && Array.isArray(content.items) && content.items.map((item: any, i: number) => (
                      <div key={i} className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else if (block.type === 'testimonials') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="py-8 px-4 bg-secondary/20">
                  <h2 className="text-2xl font-bold text-center mb-6">{getContentValue(content, 'title')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.items && Array.isArray(content.items) && content.items.map((item: any, i: number) => (
                      <div key={i} className="p-6 border rounded-md bg-background">
                        <p className="text-muted-foreground mb-4">"{item.comment}"</p>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else if (block.type === 'cta') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="text-center py-12 px-4 space-y-4 bg-primary/5 rounded-lg">
                  <h2 className="text-2xl font-bold">{getContentValue(content, 'title')}</h2>
                  <p className="text-muted-foreground">{getContentValue(content, 'subtitle')}</p>
                  <Button className="mt-4">{getContentValue(content, 'buttonText')}</Button>
                </div>
              );
            } else if (block.type === 'text') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="py-4">
                  <p>{getContentValue(content, 'text')}</p>
                </div>
              );
            } else if (block.type === 'custom') {
              const content = block.content as Record<string, any>;
              return (
                <div key={block.id} className="py-4" dangerouslySetInnerHTML={{ __html: getContentValue(content, 'html') }} />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  // Renderizar el código JSON del contenido generado
  const renderContentCode = () => {
    if (!generatedContent) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/40 rounded-md min-h-[300px]">
          <Code className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Código no disponible</h3>
          <p className="text-muted-foreground max-w-md">
            Primero debes generar contenido para ver su estructura
          </p>
        </div>
      );
    }

    return (
      <div className="border rounded-md p-4 min-h-[300px] overflow-auto bg-muted font-mono text-xs">
        <pre>{JSON.stringify(generatedContent, null, 2)}</pre>
      </div>
    );
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Asistente IA para Creación de Páginas
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!generatedContent ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/40 rounded-md">
            <Wand2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">Generación de contenido con IA</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Nuestro asistente de IA creará el contenido de la página según tus especificaciones
            </p>
            <Button
              onClick={generateContent}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generar con IA
                </>
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Vista Previa
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Estructura
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-4">
              {renderContentPreview()}
            </TabsContent>
            
            <TabsContent value="code" className="mt-4">
              {renderContentCode()}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      {generatedContent && (
        <CardFooter>
          <Button
            onClick={handleRegenerate}
            disabled={isGenerating}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Regenerando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Regenerar contenido
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AIPageCreator;
