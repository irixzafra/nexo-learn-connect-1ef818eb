
import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Pencil, Check, X, Wand2 } from 'lucide-react';
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
}) => {
  const { isEditMode, updateText, applyAIEdit } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isApplyingAI, setIsApplyingAI] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  if (!isEditMode) {
    return <div className={className}>{value}</div>;
  }

  const handleClick = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setEditValue(newValue);
  };

  const handleSave = async () => {
    if (editValue !== value) {
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleAIAssist = () => {
    setIsAIDialogOpen(true);
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
              onBlur={handleSave}
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
              onBlur={handleSave}
              autoFocus
            />
          )}
          
          <div className="absolute top-2 right-2 flex gap-1">
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

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "relative group cursor-pointer border border-transparent hover:border-primary/30 hover:bg-primary/5 rounded px-1 -mx-1 transition-colors",
                "focus:outline-none focus:border-primary/30 focus:bg-primary/5",
                className
              )}
              onClick={handleClick}
              tabIndex={0}
              role="button"
              aria-label={`Editar ${field}`}
              onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            >
              <div className="break-words">
                {value || placeholder}
              </div>
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary text-primary-foreground rounded-full p-1">
                  <Pencil className="h-3 w-3" />
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Haz clic para editar este contenido</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {renderContent()}
      
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
    </>
  );
};

export default InlineEdit;
