
import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Pencil, Check, X, Wand2, TagIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import ElementTagger from './ElementTagger';

interface InlineEditProps {
  table: string;
  id: string;
  field: string;
  value: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  onSave?: (value: string) => void;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  table,
  id,
  field,
  value,
  className = '',
  multiline = false,
  placeholder = 'Editar texto...',
  maxLength,
  onSave,
  tags = [],
  onTagsChange,
}) => {
  const { isEditMode, updateText, applyAIEdit, selectedElementId, setSelectedElementId } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isApplyingAI, setIsApplyingAI] = useState(false);
  const [isTaggingOpen, setIsTaggingOpen] = useState(false);
  const [elementTags, setElementTags] = useState<string[]>(tags);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const isSelected = selectedElementId === id;

  // Update local state when props change
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    setElementTags(tags);
  }, [tags]);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  // If not in edit mode, just render the text
  if (!isEditMode) {
    return <div className={className}>{value || placeholder}</div>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (selectedElementId !== id) {
      setSelectedElementId(id);
    }
    
    if (!editing) {
      setEditing(true);
      console.log(`Started editing ${field} in ${table} with ID ${id}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setEditValue(newValue);
  };

  const handleSave = async () => {
    if (editValue !== value) {
      console.log(`Saving changes to ${field} in ${table} with ID ${id}`);
      const success = await updateText(table, id, field, editValue);
      if (success && onSave) {
        onSave(editValue);
      }
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setEditing(false);
    console.log(`Cancelled editing ${field} in ${table} with ID ${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleAIAssist = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsAIDialogOpen(true);
  };

  const handleTagsChange = (newTags: string[]) => {
    setElementTags(newTags);
    if (onTagsChange) {
      onTagsChange(newTags);
    }
  };

  const handleApplyAI = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsApplyingAI(true);
    try {
      const result = await applyAIEdit(editValue, aiPrompt);
      setEditValue(result);
      setIsAIDialogOpen(false);
      setAiPrompt('');
      // We don't automatically save here, user can review and save manually
    } catch (error) {
      console.error("Error applying AI assist:", error);
    } finally {
      setIsApplyingAI(false);
    }
  };

  // Render the appropriate content based on editing state
  const renderContent = () => {
    if (editing) {
      return (
        <div className="relative group">
          {multiline ? (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn("min-h-[100px] p-2 border-2 border-primary focus:border-primary", className)}
              autoFocus
            />
          ) : (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={editValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn("border-2 border-primary", className)}
              autoFocus
            />
          )}
          
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20"
              onClick={() => setIsTaggingOpen(true)}
            >
              <TagIcon className="h-3 w-3 text-primary" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20"
              onClick={handleAIAssist}
            >
              <Wand2 className="h-3 w-3 text-primary" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full bg-destructive/10 hover:bg-destructive/20"
              onClick={handleCancel}
            >
              <X className="h-3 w-3 text-destructive" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full bg-primary/10 hover:bg-primary/20"
              onClick={handleSave}
            >
              <Check className="h-3 w-3 text-primary" />
            </Button>
          </div>
        </div>
      );
    }

    // Display the value with edit UI when not editing
    return (
      <div
        ref={elementRef}
        className={cn(
          "relative group cursor-pointer transition-all duration-200",
          "border border-transparent hover:border-primary/50 hover:bg-primary/5 rounded px-1 -mx-1",
          "focus:outline-none focus:border-primary/50 focus:bg-primary/5",
          isSelected ? "ring-2 ring-primary/60 ring-offset-1 bg-primary/5" : "",
          className
        )}
        onClick={handleClick}
        tabIndex={0}
        role="button"
        aria-label={`Editar ${field}`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
      >
        <div className="break-words">
          {value || placeholder}
        </div>
        {elementTags && elementTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {elementTags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
              >
                <TagIcon className="h-2.5 w-2.5 mr-0.5" />
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={cn(
          "absolute -top-2 -right-2 transition-all duration-200",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <Pencil className="h-3 w-3" />
          </div>
        </div>
        {isSelected && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={(e) => handleAIAssist(e)}
          >
            <Wand2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      
      {/* AI Dialog */}
      <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Asistente de Edición con IA
            </DialogTitle>
            <DialogDescription>
              Indica cómo quieres mejorar o modificar el texto actual.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted/30 rounded border">
              <div className="text-sm font-medium mb-1">Texto actual:</div>
              <div className="text-sm text-muted-foreground">{editValue || "(vacío)"}</div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Instrucción para la IA:</label>
              <Textarea
                placeholder="Ej: 'Haz que el texto sea más conciso', 'Revisa la gramática', 'Usa un tono más formal'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Describe claramente qué cambios quieres aplicar al texto
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAIDialogOpen(false)} disabled={isApplyingAI}>
              Cancelar
            </Button>
            <Button onClick={handleApplyAI} disabled={isApplyingAI || !aiPrompt.trim()}>
              {isApplyingAI ? 'Aplicando...' : 'Aplicar IA'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tagging Dialog */}
      <Dialog open={isTaggingOpen} onOpenChange={setIsTaggingOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-primary" />
              Etiquetar elemento
            </DialogTitle>
            <DialogDescription>
              Añade etiquetas a este elemento para organizar y categorizar el contenido.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <ElementTagger 
              tags={elementTags} 
              onChange={handleTagsChange} 
              className="flex-col items-start"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaggingOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InlineEdit;
