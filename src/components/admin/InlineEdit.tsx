
import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}) => {
  const { isEditMode, updateText } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
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
      setText(value);
      setIsEditing(false);
      return;
    }

    const success = await updateText(table, id, field, text);
    if (!success) {
      setText(value);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(value);
    setIsEditing(false);
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
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px]"
            maxLength={maxLength}
            placeholder={placeholder}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-2 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCancel}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" /> Cancelar
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleSave}
            className="h-8 px-2"
          >
            <Save className="h-4 w-4 mr-1" /> Guardar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Component
      className={`${className} group relative cursor-pointer hover:bg-muted/30 rounded p-1 -m-1 transition-colors`}
      onClick={handleClick}
    >
      <span>{text || placeholder}</span>
      <Pencil className="invisible group-hover:visible absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </Component>
  );
};

export default InlineEdit;
