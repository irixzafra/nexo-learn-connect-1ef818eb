
import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { 
  Pencil, Check, X, Save, Edit, EyeOff, 
  Tag as TagIcon, Wand2, PanelLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

interface UniversalEditableElementProps {
  id: string;
  elementType?: string;
  className?: string;
  children: React.ReactNode;
  editableContent?: string;
  onSave?: (content: string) => Promise<boolean>;
  tags?: string[];
  additionalControls?: React.ReactNode;
  disableAI?: boolean;
  editable?: boolean;
  selector?: string;
}

const UniversalEditableElement: React.FC<UniversalEditableElementProps> = ({
  id,
  elementType = 'div',
  className = '',
  children,
  editableContent,
  onSave,
  tags = [],
  additionalControls,
  disableAI = false,
  editable = true,
  selector
}) => {
  const { isEditMode, updateText, applyAIEdit, selectedElementId, setSelectedElementId } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [editValue, setEditValue] = useState(editableContent || '');
  const [originalValue, setOriginalValue] = useState(editableContent || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAIPopover, setShowAIPopover] = useState(false);
  const [elementContent, setElementContent] = useState('');

  const elementRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isSelected = selectedElementId === id;

  useEffect(() => {
    setEditValue(editableContent || '');
    setOriginalValue(editableContent || '');
  }, [editableContent]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (elementRef.current && !editableContent) {
      // Extract text content from the element
      const textContent = elementRef.current.textContent || '';
      setElementContent(textContent);
      setEditValue(textContent);
      setOriginalValue(textContent);
    }
  }, [elementRef, editableContent]);

  if (!isEditMode) {
    return <>{children}</>;
  }

  // If not editable, just render the children
  if (!editable) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (selectedElementId !== id) {
      setSelectedElementId(id);
    }
    
    setShowControls(true);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    
    // If no explicit editableContent, grab the current text from the element
    if (!editableContent && elementRef.current) {
      const content = elementRef.current.textContent || '';
      setEditValue(content);
      setOriginalValue(content);
    }
  };

  const handleCancelEdit = () => {
    setEditValue(originalValue);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      let success = false;
      if (onSave) {
        success = await onSave(editValue);
      } else {
        // Default update logic
        const targetElement = selector ? document.querySelector(selector) : null;
        if (targetElement) {
          targetElement.textContent = editValue;
          success = true;
        } else {
          success = await updateText('page_elements', id, 'content', editValue);
        }
      }
      if (success) {
        setOriginalValue(editValue);
        setIsEditing(false);
        toast.success('Contenido actualizado correctamente');
      } else {
        throw new Error('Error updating content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error al guardar el contenido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Por favor, ingresa una instrucción para la IA');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await applyAIEdit(editValue || originalValue, aiPrompt);
      setEditValue(result);
      setShowAIPopover(false);
      setAiPrompt('');
      toast.success('IA aplicada con éxito');
    } catch (error) {
      console.error('Error applying AI:', error);
      toast.error('Error al aplicar la IA');
    } finally {
      setIsLoading(false);
    }
  };

  // Rendering in edit mode
  if (isEditing) {
    return (
      <div className="relative border-2 border-primary rounded-md p-4 my-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs px-2">
            {elementType}
          </Badge>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleCancelEdit}
              className="h-7 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Cancelar
            </Button>
            <Button 
              size="sm" 
              variant="default" 
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="h-7 px-2 text-xs"
            >
              <Save className="h-3 w-3 mr-1" />
              Guardar
            </Button>
          </div>
        </div>
        
        <Textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="min-h-[100px] resize-y"
          placeholder="Editar contenido..."
        />
        
        {!disableAI && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Instrucción para la IA (ej: 'Mejora el texto', 'Hazlo más formal')"
                className="text-xs"
              />
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={handleApplyAI}
                disabled={isLoading || !aiPrompt.trim()}
                className="whitespace-nowrap h-8 px-2 text-xs"
              >
                <Wand2 className="h-3 w-3 mr-1" />
                Aplicar IA
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Normal display with hover controls
  return (
    <div
      ref={elementRef}
      className={cn(
        "relative group",
        isHovering && "outline outline-1 outline-primary/30",
        isSelected && "outline outline-2 outline-primary/60",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      
      {(isHovering || isSelected) && (
        <>
          <div className="absolute -top-2 -right-2 z-50">
            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
              <Edit className="h-3 w-3" />
            </div>
          </div>
          
          {isSelected && (
            <div className="absolute top-1 right-1 z-40 flex gap-1">
              <Button 
                size="icon"
                variant="outline"
                onClick={handleStartEdit}
                className="h-6 w-6 rounded-full bg-background"
              >
                <Pencil className="h-3 w-3" />
              </Button>
              
              {!disableAI && (
                <Popover open={showAIPopover} onOpenChange={setShowAIPopover}>
                  <PopoverTrigger asChild>
                    <Button 
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 rounded-full bg-background"
                    >
                      <Wand2 className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Mejora con IA</h4>
                      <Input
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Instrucción para la IA"
                        className="text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setShowAIPopover(false)}
                          className="h-7 px-2 text-xs"
                        >
                          Cancelar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          onClick={handleApplyAI}
                          disabled={isLoading || !aiPrompt.trim()}
                          className="h-7 px-2 text-xs"
                        >
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              
              {additionalControls}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UniversalEditableElement;
