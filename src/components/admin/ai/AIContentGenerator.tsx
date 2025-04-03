
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Brain, Bot, FileText, BookOpen, MessageSquare, LayoutPanelLeft } from 'lucide-react';
import { toast } from 'sonner';

interface AIContentGeneratorProps {
  onContentGenerated?: (content: string) => void;
  contentType?: 'page' | 'course' | 'lesson' | 'email' | 'social';
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ 
  onContentGenerated,
  contentType = 'page'
}) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [contentStyle, setContentStyle] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [activeTab, setActiveTab] = useState('prompt');
  
  const contentTypeOptions = {
    page: {
      title: 'Página',
      description: 'Genera contenido completo para páginas web',
      icon: <LayoutPanelLeft className="h-4 w-4" />,
      promptPrefix: 'Crea contenido para una página web sobre:'
    },
    course: {
      title: 'Curso',
      description: 'Genera estructura y descripción para cursos',
      icon: <BookOpen className="h-4 w-4" />,
      promptPrefix: 'Crea la estructura y descripción para un curso sobre:'
    },
    lesson: {
      title: 'Lección',
      description: 'Genera contenido detallado para lecciones',
      icon: <FileText className="h-4 w-4" />,
      promptPrefix: 'Crea el contenido para una lección sobre:'
    },
    email: {
      title: 'Email',
      description: 'Genera plantillas de correo electrónico',
      icon: <MessageSquare className="h-4 w-4" />,
      promptPrefix: 'Escribe un correo electrónico para:'
    },
    social: {
      title: 'Social Media',
      description: 'Genera publicaciones para redes sociales',
      icon: <MessageSquare className="h-4 w-4" />,
      promptPrefix: 'Crea una publicación para redes sociales sobre:'
    }
  };
  
  const styleOptions = [
    { value: 'professional', label: 'Profesional' },
    { value: 'casual', label: 'Casual' },
    { value: 'academic', label: 'Académico' },
    { value: 'creative', label: 'Creativo' },
    { value: 'technical', label: 'Técnico' }
  ];
  
  const modelOptions = [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Rápido)' },
    { value: 'gpt-4o', label: 'GPT-4o (Avanzado)' }
  ];
  
  const currentType = contentTypeOptions[contentType];

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor, introduce un prompt para generar contenido');
      return;
    }
    
    try {
      setLoading(true);
      setActiveTab('preview');
      
      // Simulamos la generación de contenido con IA
      // En una implementación real, aquí harías una llamada a una API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const content = `# Contenido generado con IA

## ${prompt}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, 
nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Nullam euismod, nisl eget aliquam ultricies,
nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.

### Sección 1
- Punto importante 1
- Punto importante 2
- Punto importante 3

### Sección 2
Este es un párrafo de muestra que demuestra cómo se vería el contenido generado por IA.
Este contenido ha sido generado utilizando el modelo ${model} con estilo ${contentStyle}.

> Nota: Este es un contenido de ejemplo. En una implementación real, este texto sería generado
> por un modelo de IA basado en el prompt proporcionado.`;
      
      setGeneratedContent(content);
      if (onContentGenerated) {
        onContentGenerated(content);
      }
      
      toast.success('Contenido generado con éxito');
    } catch (error) {
      console.error('Error generando contenido:', error);
      toast.error('Error al generar contenido con IA');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUseContent = () => {
    if (onContentGenerated && generatedContent) {
      onContentGenerated(generatedContent);
      toast.success('Contenido aplicado');
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>Generador de Contenido IA</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2">{currentType.title}</Badge>
        </div>
        <CardDescription>
          {currentType.description} utilizando tecnología de inteligencia artificial
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mx-6">
          <TabsTrigger value="prompt" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Prompt
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Vista Previa
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Modelo de IA</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Estilo de contenido</label>
                <Select value={contentStyle} onValueChange={setContentStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Prompt para la IA</label>
              <Textarea 
                value={prompt} 
                onChange={handlePromptChange} 
                placeholder={`${currentType.promptPrefix}...`}
                className="min-h-[150px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Escribe instrucciones detalladas para obtener mejores resultados.
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !prompt.trim()} 
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generar Contenido
                </>
              )}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="preview">
          <CardContent>
            <div className="border rounded-md p-4 min-h-[200px] mb-4 overflow-auto max-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Generando contenido con IA...</p>
                </div>
              ) : generatedContent ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10">
                  <Bot className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">El contenido generado aparecerá aquí</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('prompt')} 
                className="flex-1"
              >
                Volver a Editar
              </Button>
              
              <Button 
                onClick={handleUseContent} 
                disabled={!generatedContent || loading}
                className="flex-1"
              >
                Usar Contenido
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              El contenido generado por IA puede requerir revisión y edición manual.
            </p>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIContentGenerator;
