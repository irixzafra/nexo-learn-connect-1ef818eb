
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2, MessageSquareText, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface AIElementEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  elementId: string;
  elementType: string;
  currentContent: string;
  onContentUpdate: (newContent: string) => Promise<boolean>;
}

const AI_TEMPLATES = [
  { 
    id: 'improve', 
    name: 'Mejorar estilo', 
    prompt: 'Mejora el estilo y redacción de este texto, manteniendo la misma información:' 
  },
  { 
    id: 'expand', 
    name: 'Ampliar contenido', 
    prompt: 'Desarrolla este contenido con más detalles e información relevante:' 
  },
  { 
    id: 'summarize', 
    name: 'Resumir', 
    prompt: 'Resume este contenido de forma clara y concisa:' 
  },
  { 
    id: 'professional', 
    name: 'Tono profesional', 
    prompt: 'Reescribe esto con un tono más profesional y formal:' 
  },
  { 
    id: 'friendly', 
    name: 'Tono amigable', 
    prompt: 'Reescribe esto con un tono más amigable y cercano:' 
  },
  { 
    id: 'convert-to-html', 
    name: 'Convertir a HTML', 
    prompt: 'Convierte este texto a formato HTML con etiquetas apropiadas:' 
  },
];

const AIElementEditor: React.FC<AIElementEditorProps> = ({
  isOpen,
  onOpenChange,
  elementId,
  elementType,
  currentContent,
  onContentUpdate
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [originalContent, setOriginalContent] = useState(currentContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Reset states when dialog opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setOriginalContent(currentContent);
      setGeneratedContent('');
      setCustomPrompt('');
      setSelectedTemplate(null);
    }
  }, [isOpen, currentContent]);

  const handleApplyTemplate = (templateId: string) => {
    const template = AI_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      generateContent(`${template.prompt} ${originalContent}`);
    }
  };

  const handleGenerateWithCustomPrompt = () => {
    if (!customPrompt.trim()) {
      toast.error('Por favor, escribe una instrucción para la IA');
      return;
    }
    generateContent(`${customPrompt} \n\nTexto original: ${originalContent}`);
  };

  const generateContent = async (prompt: string) => {
    setIsGenerating(true);
    try {
      // In a real implementation, this would call an AI service
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response = '';
      if (prompt.includes('Mejora el estilo')) {
        response = originalContent.split(' ').map(word => 
          word.length > 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word
        ).join(' ');
      } else if (prompt.includes('Desarrolla este contenido')) {
        response = `${originalContent}\n\nAdicionalmente, es importante destacar que este contenido ha sido ampliado con información relevante que ayuda a comprender mejor el contexto y proporciona más detalles sobre el tema tratado.`;
      } else if (prompt.includes('Resume este contenido')) {
        response = originalContent.split(' ').slice(0, originalContent.split(' ').length / 2).join(' ') + '...';
      } else if (prompt.includes('tono más profesional')) {
        response = `Con relación a la información proporcionada, cabe señalar que ${originalContent.toLowerCase()}`;
      } else if (prompt.includes('tono más amigable')) {
        response = `¡Hola! 👋 Esto es lo que debes saber: ${originalContent}`;
      } else if (prompt.includes('Convierte este texto a formato HTML')) {
        response = `<div><h3>Contenido principal</h3><p>${originalContent}</p></div>`;
      } else {
        // Custom prompt - just add some AI magic words
        response = `${originalContent} [Contenido mejorado por IA según tus instrucciones]`;
      }
      
      setGeneratedContent(response);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error al generar contenido con IA');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveContent = async () => {
    if (!generatedContent.trim()) {
      toast.error('No hay contenido generado para guardar');
      return;
    }
    
    const success = await onContentUpdate(generatedContent);
    if (success) {
      toast.success('Contenido actualizado con IA');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Editar con IA
          </DialogTitle>
          <DialogDescription>
            Usa la inteligencia artificial para mejorar o transformar este elemento.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Contenido original:</h4>
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              {originalContent || <span className="text-muted-foreground italic">Sin contenido</span>}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Plantillas de edición:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AI_TEMPLATES.map(template => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleApplyTemplate(template.id)}
                  disabled={isGenerating}
                  className="justify-start text-xs"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">O personaliza la instrucción:</h4>
            <div className="flex gap-2">
              <Input
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ej: Hazlo más persuasivo, más corto, usa viñetas..."
                className="flex-1"
                disabled={isGenerating}
              />
              <Button
                onClick={handleGenerateWithCustomPrompt}
                disabled={isGenerating || !customPrompt.trim()}
                size="sm"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generar"}
              </Button>
            </div>
          </div>
          
          {generatedContent && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <MessageSquareText className="h-4 w-4 text-primary" />
                Contenido generado:
              </h4>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[120px]"
                placeholder="El contenido generado aparecerá aquí"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveContent}
            disabled={isGenerating || !generatedContent}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generando...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Aplicar cambios
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIElementEditor;
