
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageBlock } from '@/types/pages';

interface PageAIContentGeneratorProps {
  form: UseFormReturn<any>;
}

const PAGE_TEMPLATES = [
  { value: 'landing', label: 'Landing Page' },
  { value: 'about', label: 'Página Acerca De' },
  { value: 'service', label: 'Página de Servicio' },
  { value: 'contact', label: 'Página de Contacto' },
  { value: 'blog', label: 'Entrada de Blog' },
  { value: 'faq', label: 'Preguntas Frecuentes' },
  { value: 'product', label: 'Página de Producto' },
  { value: 'custom', label: 'Personalizado' },
];

// Función que simula la generación de contenido con IA
// En una implementación real, esta sería una llamada a una API de IA
const generateContentWithAI = async (prompt: string, template: string): Promise<PageBlock[]> => {
  // Simulamos un tiempo de espera para la respuesta de la IA
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generamos bloques diferentes según la plantilla seleccionada
  let blocks: PageBlock[] = [];
  
  if (template === 'landing') {
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: '¡Bienvenido a nuestra plataforma innovadora!'
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: 'Descubre todas las posibilidades que tenemos para ofrecerte con nuestra solución única y adaptada a tus necesidades.'
      },
      {
        id: `block-${Date.now()}-3`,
        type: 'cta',
        content: 'Empieza ahora'
      }
    ];
  } else if (template === 'about') {
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: 'Conoce nuestro equipo y misión'
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: 'Somos una empresa comprometida con la excelencia y la innovación, trabajando día a día para ofrecer las mejores soluciones a nuestros clientes.'
      }
    ];
  } else {
    // Para el resto de plantillas o personalizado, usamos el prompt para generar contenido
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: `${prompt.split(' ').slice(0, 7).join(' ')}...`
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: prompt
      }
    ];
  }
  
  return blocks;
};

const PageAIContentGenerator: React.FC<PageAIContentGeneratorProps> = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<string>('landing');
  const [prompt, setPrompt] = useState<string>('');
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    setShowCustomPrompt(value === 'custom');
  };

  const handleGenerateContent = async () => {
    if (template === 'custom' && !prompt) {
      toast.error('Por favor, introduce un prompt para generar contenido personalizado');
      return;
    }

    try {
      setLoading(true);
      const promptToUse = template === 'custom' ? prompt : `Genera contenido para una página tipo ${template}`;
      const generatedBlocks = await generateContentWithAI(promptToUse, template);
      
      // Actualizamos el formulario con el nuevo contenido generado
      const currentContent = form.getValues('content') || { blocks: [] };
      form.setValue('content', {
        ...currentContent,
        blocks: [...generatedBlocks]
      });
      
      toast.success('Contenido generado con éxito');
    } catch (error) {
      console.error('Error generando contenido:', error);
      toast.error('Error al generar contenido con IA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Generador de Contenido IA</CardTitle>
        <CardDescription>
          Utiliza inteligencia artificial para generar contenido para tu página
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel>Plantilla de página</FormLabel>
              <Select value={template} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de página" />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_TEMPLATES.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Selecciona el tipo de página que quieres crear
              </p>
            </div>
            
            {showCustomPrompt && (
              <div>
                <FormLabel>Prompt personalizado</FormLabel>
                <Textarea 
                  placeholder="Describe el contenido que quieres generar..."
                  className="min-h-24 resize-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Describe en detalle el contenido que deseas generar
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateContent} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generar contenido
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PageAIContentGenerator;
