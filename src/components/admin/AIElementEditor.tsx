
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MessageSquare, CheckSquare, Sparkles, Save } from 'lucide-react';
import { toast } from 'sonner';

interface AIElementEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  elementId: string;
  elementType: string;
  currentContent: string;
  onContentUpdate: (content: string) => Promise<boolean>;
}

const AIElementEditor: React.FC<AIElementEditorProps> = ({
  isOpen,
  onOpenChange,
  elementId,
  elementType,
  currentContent,
  onContentUpdate
}) => {
  const [prompt, setPrompt] = useState('');
  const [promptType, setPromptType] = useState('improve');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [saving, setSaving] = useState(false);

  // Reset states when dialog opens
  React.useEffect(() => {
    if (isOpen) {
      setResult('');
      setPrompt('');
    }
  }, [isOpen]);

  const generatePromptFromType = (type: string, customPrompt: string = '') => {
    const content = currentContent.trim();
    
    switch (type) {
      case 'improve':
        return `Mejora el siguiente texto manteniendo su significado original: "${content}"`;
      case 'expand':
        return `Expande con más detalles el siguiente texto: "${content}"`;
      case 'shorten':
        return `Resume el siguiente texto manteniendo los puntos clave: "${content}"`;
      case 'change-tone-professional':
        return `Reescribe el siguiente texto en un tono más profesional: "${content}"`;
      case 'change-tone-friendly':
        return `Reescribe el siguiente texto en un tono más amigable y cercano: "${content}"`;
      case 'custom':
        return customPrompt.trim() ? `${customPrompt}: "${content}"` : `Modifica el siguiente texto: "${content}"`;
      default:
        return `Mejora el siguiente texto: "${content}"`;
    }
  };

  const handleGenerate = async () => {
    const finalPrompt = promptType === 'custom' 
      ? prompt 
      : generatePromptFromType(promptType);
    
    if (!finalPrompt) {
      toast.error('Por favor, selecciona un tipo de mejora');
      return;
    }

    setGenerating(true);

    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simple response based on the prompt type
      let generatedContent = '';
      
      switch (promptType) {
        case 'improve':
          generatedContent = `${currentContent} (version mejorada)`;
          break;
        case 'expand':
          generatedContent = `${currentContent}\n\nAdemás, es importante destacar que este contenido se ha expandido con información adicional relevante que complementa el texto original.`;
          break;
        case 'shorten':
          generatedContent = currentContent.split(' ').slice(0, currentContent.split(' ').length / 2).join(' ') + '...';
          break;
        case 'change-tone-professional':
          generatedContent = `Se considera pertinente señalar que ${currentContent.toLowerCase()}`;
          break;
        case 'change-tone-friendly':
          generatedContent = `¡Hola! ${currentContent} ¿No te parece genial?`;
          break;
        case 'custom':
          generatedContent = `${currentContent} (personalizado según: ${prompt})`;
          break;
        default:
          generatedContent = currentContent;
      }
      
      setResult(generatedContent);
      toast.success('Contenido generado con éxito');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Error al generar contenido');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!result.trim()) {
      toast.error('No hay contenido para guardar');
      return;
    }

    setSaving(true);
    try {
      const success = await onContentUpdate(result);
      if (success) {
        toast.success('Contenido actualizado con éxito');
        onOpenChange(false);
      } else {
        toast.error('Error al actualizar el contenido');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error al guardar el contenido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Editar con IA
          </DialogTitle>
          <DialogDescription>
            Mejora o modifica el contenido existente con ayuda de la IA.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Contenido actual
            </label>
            <div className="p-3 rounded-md bg-muted/50 text-sm max-h-32 overflow-y-auto">
              {currentContent || <span className="text-muted-foreground italic">Sin contenido</span>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              ¿Qué quieres hacer con este contenido?
            </label>
            <Select 
              value={promptType} 
              onValueChange={setPromptType}
              disabled={generating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una acción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="improve">Mejorar redacción</SelectItem>
                <SelectItem value="expand">Expandir con más detalles</SelectItem>
                <SelectItem value="shorten">Acortar manteniendo lo importante</SelectItem>
                <SelectItem value="change-tone-professional">Cambiar a tono profesional</SelectItem>
                <SelectItem value="change-tone-friendly">Cambiar a tono amigable</SelectItem>
                <SelectItem value="custom">Instrucción personalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {promptType === 'custom' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Instrucción personalizada
              </label>
              <Input
                placeholder="Ej: Reescribe esto para un público infantil"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={generating}
              />
            </div>
          )}
          
          <Button 
            onClick={handleGenerate} 
            disabled={generating || (promptType === 'custom' && !prompt.trim())}
            className="w-full gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generar nuevo contenido
              </>
            )}
          </Button>
          
          {result && (
            <div className="space-y-2 mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  Resultado generado
                </label>
              </div>
              <Textarea 
                value={result} 
                onChange={(e) => setResult(e.target.value)}
                rows={5}
                className="w-full"
                disabled={saving}
              />
              
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="w-full gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIElementEditor;
