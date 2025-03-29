
import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Pencil, Save } from 'lucide-react';

interface InlineEditProps {
  table: string;
  id: string;
  field: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  children?: React.ReactNode;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  table,
  id,
  field,
  value: initialValue,
  as = 'p',
  className = '',
  children,
}) => {
  const { isEditMode, updateText } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (value !== initialValue) {
      const success = await updateText(table, id, field, value);
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  const Tag = as;

  if (!isEditMode) {
    return <Tag className={className}>{children || value}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative group">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`w-full p-2 border-2 border-primary rounded bg-background ${className}`}
          rows={Math.max(2, value.split('\n').length)}
        />
        <button
          onClick={handleSave}
          className="absolute top-2 right-2 p-1 bg-primary text-primary-foreground rounded hover:bg-primary/80"
        >
          <Save className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Tag
      className={`relative group cursor-pointer ${className} ${
        isEditMode ? 'hover:bg-muted/50 hover:outline-dashed hover:outline-1 hover:outline-primary p-1' : ''
      }`}
      onClick={handleEdit}
    >
      {children || value}
      {isEditMode && (
        <Pencil className="absolute top-1 right-1 h-4 w-4 text-primary opacity-0 group-hover:opacity-100" />
      )}
    </Tag>
  );
};

export default InlineEdit;
