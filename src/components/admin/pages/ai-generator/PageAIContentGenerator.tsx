
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TemplateSelector from './TemplateSelector';
import CustomPromptInput from './CustomPromptInput';
import GenerateButton from './GenerateButton';
import { generateContentWithAI } from './aiContentGeneratorUtils';

interface PageAIContentGeneratorProps {
  form: UseFormReturn<any>;
}

const PageAIContentGenerator: React.FC<PageAIContentGeneratorProps> = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<string>('landing');
  const [prompt, setPrompt] = useState<string>('');
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    setShowCustomPrompt(value === 'custom');
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
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
            <TemplateSelector
              template={template}
              onTemplateChange={handleTemplateChange}
            />
            
            {showCustomPrompt && (
              <CustomPromptInput
                prompt={prompt}
                onPromptChange={handlePromptChange}
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <GenerateButton
          loading={loading}
          onClick={handleGenerateContent}
        />
      </CardFooter>
    </Card>
  );
};

export default PageAIContentGenerator;
