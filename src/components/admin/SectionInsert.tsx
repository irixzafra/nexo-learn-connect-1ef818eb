
import React, { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Plus, X, Brain, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SectionInsertProps {
  onAddSection?: (content: string) => void;
}

const SectionInsert: React.FC<SectionInsertProps> = ({ onAddSection }) => {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isEditMode) {
    return null;
  }

  const handleAddSection = () => {
    setIsActive(false);
    setIsAIDialogOpen(true);
  };

  const handleAIGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, ingresa un prompt");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Here we would call an AI API, for now simulating response
      setTimeout(() => {
        setAiResult(`Contenido generado basado en: ${prompt}`);
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error("Error al generar contenido con IA");
      setIsGenerating(false);
    }
  };

  const handleInsertContent = () => {
    if (onAddSection && aiResult) {
      onAddSection(aiResult);
      setAiResult('');
      setPrompt('');
      setIsAIDialogOpen(false);
      
      toast.success("Nueva sección añadida correctamente");
    }
  };

  return (
    <>
      <div 
        className={`relative w-full py-2 my-2 transition-all ${isActive || isHovered ? 'opacity-100' : 'opacity-0'} group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full border-t-2 border-dashed border-primary/30"></div>
        </div>
        <div className="relative flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-background border-primary/50 text-primary hover:bg-primary/10"
            onClick={handleAddSection}
          >
            <Plus className="h-4 w-4 mr-1" />
            Añadir sección
          </Button>
        </div>
      </div>

      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Generar nueva sección con IA</DialogTitle>
            <DialogDescription>
              Describe lo que quieres añadir y la IA te ayudará a generar el contenido.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-md">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Asistente de IA</h3>
                <p className="text-xs text-muted-foreground">Genera contenido para tu nueva sección</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="ai-prompt" className="text-sm font-medium">
                ¿Qué tipo de sección quieres crear?
              </label>
              <Textarea
                id="ai-prompt"
                placeholder="Ej: Una sección que explique las ventajas de nuestro servicio"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              onClick={handleAIGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="w-full"
            >
              {isGenerating ? 'Generando...' : 'Generar contenido con IA'}
            </Button>
            
            {aiResult && (
              <div className="border rounded-md p-4 bg-muted/50 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Contenido generado:</span>
                </div>
                <Textarea 
                  value={aiResult} 
                  onChange={(e) => setAiResult(e.target.value)}
                  rows={6}
                  className="w-full mt-2"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleInsertContent} disabled={!aiResult}>Insertar sección</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionInsert;
