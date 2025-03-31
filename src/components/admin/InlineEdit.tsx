
import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InlineEditProps {
  table: string;
  id: string;
  field: string;
  value: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoSave?: boolean;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  table,
  id,
  field,
  value,
  as: Component = 'div',
  className = '',
  multiline = false,
  maxLength,
  placeholder = 'Editar texto...',
  autoSave = true,
}) => {
  const { isEditMode, updateText } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [text, setText] = useState(value);
  const [originalText, setOriginalText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setText(value);
    setOriginalText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (text.trim() === '') {
      setText(originalText);
      setIsEditing(false);
      return;
    }

    // Si el texto no ha cambiado, no hacemos nada
    if (text === originalText) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    const success = await updateText(table, id, field, text);
    setIsSaving(false);
    
    if (!success) {
      setText(originalText);
    } else {
      setOriginalText(text);
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(originalText);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    if (autoSave) {
      // Implementar auto-save con debounce
      clearTimeout(inputRef.current?.dataset.timer as any);
      const timer = setTimeout(() => {
        if (e.target.value !== originalText && e.target.value.trim() !== '') {
          handleSave();
        }
      }, 1000); // Guardar automáticamente después de 1 segundo de inactividad
      
      if (inputRef.current) {
        inputRef.current.dataset.timer = timer as any;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditMode) {
    return (
      <Component className={className}>
        {value || placeholder}
      </Component>
    );
  }

  if (isEditing) {
    return (
      <div className="inline-flex flex-col gap-2">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] border-primary focus-visible:ring-1 focus-visible:ring-primary"
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={isSaving}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            placeholder={placeholder}
            className="border-primary focus-visible:ring-1 focus-visible:ring-primary"
            disabled={isSaving}
          />
        )}
        
        {!autoSave && (
          <div className="flex gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCancel}
              className="h-8 px-2"
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-1" /> Cancelar
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSave}
              className="h-8 px-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>Guardando...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" /> Guardar
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Component
      className={`${className} group relative cursor-pointer border border-dashed border-transparent hover:border-primary/50 rounded p-1 -m-1 transition-colors`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className={isHovering ? "text-primary" : ""}>{text || placeholder}</span>
      <Pencil className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
    </Component>
  );
};

export default InlineEdit;
