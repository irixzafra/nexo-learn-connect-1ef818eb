
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Check, X, Edit, Eye, Loader2, 
  Image as ImageIcon, FileText, Box 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditMode } from '@/contexts/EditModeContext';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface EditableContentProps {
  table: string;
  id: string;
  field: string;
  value: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  tags?: string[];
  contentType?: 'text' | 'image' | 'rich-text' | 'component';
  onTagsChange?: (tags: string[]) => void;
  onUpdate?: (newValue: string) => Promise<boolean>;
  children?: React.ReactNode;
}

const EditableContent: React.FC<EditableContentProps> = ({
  table,
  id,
  field,
  value: initialValue,
  className,
  multiline = false,
  placeholder = 'Haz clic para editar',
  tags = [],
  contentType = 'text',
  onTagsChange,
  onUpdate,
  children
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [originalValue, setOriginalValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const { isEditMode, updateText } = useEditMode();

  useEffect(() => {
    setValue(initialValue);
    setOriginalValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleMouseEnter = () => {
    if (isEditMode) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setValue(originalValue);
    setIsEditing(false);
    setIsPreviewing(false);
  };

  const handlePreview = () => {
    setIsPreviewing(!isPreviewing);
  };

  const handleSave = async () => {
    if (value.trim() === '') {
      toast.error('El contenido no puede estar vacío');
      return;
    }

    setIsLoading(true);
    try {
      // Custom update handler if provided
      if (onUpdate) {
        const success = await onUpdate(value);
        if (!success) throw new Error('Error al actualizar el contenido');
      } else {
        // Default update handler
        await updateText(table, id, field, value);
      }
      
      setOriginalValue(value);
      setIsEditing(false);
      setIsPreviewing(false);
      toast.success('Contenido actualizado');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Error al guardar el contenido');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContentTypeIcon = () => {
    switch (contentType) {
      case 'image':
        return <ImageIcon className="h-3 w-3" />;
      case 'rich-text':
        return <FileText className="h-3 w-3" />;
      case 'component':
        return <Box className="h-3 w-3" />;
      default:
        return <Edit className="h-3 w-3" />;
    }
  };

  // Don't apply special styling if not in edit mode
  if (!isEditMode) {
    if (children) return <>{children}</>;
    
    if (multiline) {
      return (
        <div className={className || ''}>
          {value || placeholder}
        </div>
      );
    }
    
    return (
      <span className={className || ''}>
        {value || placeholder}
      </span>
    );
  }

  // In edit mode with children
  if (children) {
    return (
      <div 
        className={cn(
          "relative group",
          isHovering && "outline outline-2 outline-primary/30 bg-primary/5",
          isEditing && "outline outline-2 outline-primary bg-primary/10"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isEditMode && !isEditing ? handleEdit : undefined}
      >
        {(isHovering || isEditing) && (
          <div className="absolute top-0 right-0 z-50 p-1 bg-primary/10 rounded-bl-md flex gap-1">
            <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 border-primary/30 flex items-center gap-1 bg-background">
              {renderContentTypeIcon()}
              <span>{contentType}</span>
            </Badge>
            {tags?.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {isEditing ? (
          <div className="p-4">
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border rounded"
                rows={5}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border rounded"
              />
            )}
            
            <div className="flex justify-end mt-2 gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handlePreview}
                className="flex items-center gap-1"
              >
                <Eye className="h-3 w-3" />
                {isPreviewing ? 'Editar' : 'Previsualizar'}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleCancel}
                className="flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Cancelar
              </Button>
              <Button 
                size="sm" 
                variant="default" 
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                Guardar
              </Button>
            </div>
            
            {isPreviewing && (
              <div className="mt-4 p-4 border border-dashed rounded bg-background">
                <h3 className="text-sm font-medium mb-2">Vista previa:</h3>
                <div className={className || ''}>
                  {children}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            className={cn(
              "cursor-pointer relative",
              isHovering && "after:absolute after:inset-0 after:bg-primary/5"
            )}
          >
            {children}
            
            {isHovering && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute bottom-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg z-50">
                      <Edit className="h-4 w-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Haz clic para editar este contenido</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    );
  }

  // In edit mode without children (direct text editing)
  if (isEditing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              className
            )}
            rows={5}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              className
            )}
            placeholder={placeholder}
          />
        )}
        
        <div className="flex justify-end mt-2 gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleCancel}
            className="flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Cancelar
          </Button>
          <Button 
            size="sm" 
            variant="default" 
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
            Guardar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "cursor-pointer relative group", 
        isHovering && "outline outline-2 outline-primary/30 bg-primary/5",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleEdit}
      role="button"
      tabIndex={0}
    >
      {value || placeholder}
      
      {isHovering && (
        <>
          <div className="absolute -top-1.5 -left-1.5 bg-primary text-white p-0.5 rounded-full shadow-sm z-10 opacity-80 group-hover:opacity-100">
            <Edit className="h-3 w-3" />
          </div>
        </>
      )}
    </div>
  );
};

export default EditableContent;
