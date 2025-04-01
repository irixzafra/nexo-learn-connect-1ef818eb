
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateDesignSuggestion } from '../../utils/aiDesignAssistant';

const AIDesignAssistantTab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Por favor ingresa una descripción para generar sugerencias');
      return;
    }

    try {
      setIsGenerating(true);
      setSuggestion('');
      
      const response = await generateDesignSuggestion(prompt);
      setSuggestion(response);
      
      if (response) {
        toast.success('Sugerencia de diseño generada con éxito');
      }
    } catch (error) {
      console.error('Error generating design suggestion:', error);
      toast.error('Error al generar la sugerencia de diseño');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Asistente de Diseño IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Describe lo que buscas y nuestro asistente IA te dará recomendaciones de diseño.
              </p>
              <Textarea
                placeholder="Ej: Necesito un diseño moderno para una página de servicios de consultoría en tecnología..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setPrompt('')}
            disabled={isGenerating || !prompt}
          >
            Limpiar
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generar sugerencias
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {suggestion && (
        <Card>
          <CardHeader>
            <CardTitle>Sugerencia de Diseño</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
              {suggestion}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIDesignAssistantTab;
