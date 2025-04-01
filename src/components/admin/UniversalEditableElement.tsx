
import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { 
  Edit, Save, X, Check, Wand2, ArrowUpDown, 
  Tag as TagIcon, CornerUpLeft, CornerUpRight,
  Bold, Italic, Underline, Link, Type, Image, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ChevronUp, ChevronDown, Undo, Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';

interface UniversalEditableElementProps {
  id: string;
  elementType?: string;
  className?: string;
  children: React.ReactNode;
  editable?: boolean;
  table?: string;
  field?: string;
  initialValue?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  multiline?: boolean;
  disableAI?: boolean;
  onSave?: (content: string) => Promise<boolean>;
}

const UniversalEditableElement: React.FC<UniversalEditableElementProps> = ({
  id,
  elementType = 'div',
  className = '',
  children,
  editable = true,
  table = 'site_content',
  field = 'content',
  initialValue,
  tags = [],
  onTagsChange,
  multiline = false,
  disableAI = false,
  onSave
}) => {
  const { 
    isEditMode, 
    updateText, 
    applyAIEdit, 
    selectedElementId, 
    setSelectedElementId,
    undoChange,
    redoChange,
    hasUndoHistory,
    hasRedoHistory
  } = useEditMode();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [elementContent, setElementContent] = useState('');
  const [showAIPopover, setShowAIPopover] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [elementTags, setElementTags] = useState(tags);
  const [showTagsPopover, setShowTagsPopover] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left'
  });

  const elementRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isSelected = selectedElementId === id;

  // Extract content from children if initialValue not provided
  useEffect(() => {
    if (initialValue !== undefined) {
      setEditValue(initialValue);
      setOriginalValue(initialValue);
    } else if (elementRef.current) {
      const content = elementRef.current.textContent || '';
      setElementContent(content);
      setEditValue(content);
      setOriginalValue(content);
    }
  }, [initialValue, elementRef]);

  // Auto-focus when editing begins
  useEffect(() => {
    if (isEditing) {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
      } else if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isEditing, multiline]);

  useEffect(() => {
    setElementTags(tags);
  }, [tags]);

  // If not in edit mode, just render children
  if (!isEditMode) {
    return (
      <div 
        className={className} 
        ref={elementRef}
        data-editable-id={id}
        data-editable-table={table}
        data-editable-field={field}
      >
        {children}
      </div>
    );
  }

  // If element not editable, just render with minimal styling
  if (!editable) {
    return <div className={className}>{children}</div>;
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
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditing && isEditMode) {
      setIsEditing(true);
    }
  };

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    
    // If no explicit value, grab the current text from the element
    if (elementRef.current && (!initialValue && !elementContent)) {
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
    if (editValue.trim() === '') {
      toast.error('El contenido no puede estar vacío');
      return;
    }
    
    setIsLoading(true);
    try {
      let success = false;
      
      if (onSave) {
        success = await onSave(editValue);
      } else {
        success = await updateText(table, id, field, editValue);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Save on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } 
    // Cancel on Escape
    else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
    // Undo on Ctrl/Cmd + Z
    else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undoChange();
    }
    // Redo on Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
    else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || 
             ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
      e.preventDefault();
      redoChange();
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

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    const updatedTags = [...elementTags, newTag.trim()];
    setElementTags(updatedTags);
    setNewTag('');
    
    if (onTagsChange) {
      onTagsChange(updatedTags);
    }
    
    toast.success(`Etiqueta "${newTag.trim()}" añadida`);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = elementTags.filter(tag => tag !== tagToRemove);
    setElementTags(updatedTags);
    
    if (onTagsChange) {
      onTagsChange(updatedTags);
    }
    
    toast.success(`Etiqueta "${tagToRemove}" eliminada`);
  };

  const formatText = (formatType: keyof typeof textFormat | 'alignment', value?: string) => {
    if (formatType === 'alignment' && value) {
      setTextFormat({
        ...textFormat,
        alignment: value as 'left' | 'center' | 'right' | 'justify'
      });
    } else {
      setTextFormat({
        ...textFormat,
        [formatType]: !textFormat[formatType as 'bold' | 'italic' | 'underline']
      });
    }
    
    // In a real implementation, we would apply the formatting to the text here
    // For now, we'll just show a toast to demonstrate the feature
    toast.info(`Formato ${formatType} ${formatType === 'alignment' ? value : (textFormat[formatType as 'bold' | 'italic' | 'underline'] ? 'desactivado' : 'activado')}`);
  };

  // Rendering in edit mode
  if (isEditing) {
    return (
      <div className="relative border-2 border-primary rounded-md p-4 my-2 bg-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs px-2 py-1">
              {elementType}
            </Badge>
            
            {elementTags.length > 0 && (
              <div className="flex flex-wrap gap-1 text-xs">
                {elementTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleCancelEdit}
              className="h-7 px-2 text-xs"
              disabled={isLoading}
            >
              <X className="h-3 w-3 mr-1" />
              Cancelar
            </Button>
            
            <Button 
              size="sm" 
              variant="default" 
              onClick={handleSaveEdit}
              disabled={isLoading || editValue.trim() === ''}
              className="h-7 px-2 text-xs"
            >
              <Save className="h-3 w-3 mr-1" />
              Guardar
            </Button>
          </div>
        </div>
        
        <div className="mb-2 border-b pb-1">
          <div className="flex flex-wrap gap-1">
            <Toggle
              pressed={textFormat.bold}
              onPressedChange={() => formatText('bold')}
              size="sm"
              aria-label="Toggle bold"
              className="h-7 w-7 p-0"
            >
              <Bold className="h-3.5 w-3.5" />
            </Toggle>
            
            <Toggle
              pressed={textFormat.italic}
              onPressedChange={() => formatText('italic')}
              size="sm"
              aria-label="Toggle italic"
              className="h-7 w-7 p-0"
            >
              <Italic className="h-3.5 w-3.5" />
            </Toggle>
            
            <Toggle
              pressed={textFormat.underline}
              onPressedChange={() => formatText('underline')}
              size="sm"
              aria-label="Toggle underline"
              className="h-7 w-7 p-0"
            >
              <Underline className="h-3.5 w-3.5" />
            </Toggle>
            
            <div className="h-7 w-[1px] bg-gray-200 mx-1"></div>
            
            <Toggle
              pressed={textFormat.alignment === 'left'}
              onPressedChange={() => formatText('alignment', 'left')}
              size="sm"
              aria-label="Align left"
              className="h-7 w-7 p-0"
            >
              <AlignLeft className="h-3.5 w-3.5" />
            </Toggle>
            
            <Toggle
              pressed={textFormat.alignment === 'center'}
              onPressedChange={() => formatText('alignment', 'center')}
              size="sm"
              aria-label="Align center"
              className="h-7 w-7 p-0"
            >
              <AlignCenter className="h-3.5 w-3.5" />
            </Toggle>
            
            <Toggle
              pressed={textFormat.alignment === 'right'}
              onPressedChange={() => formatText('alignment', 'right')}
              size="sm"
              aria-label="Align right"
              className="h-7 w-7 p-0"
            >
              <AlignRight className="h-3.5 w-3.5" />
            </Toggle>
            
            <div className="h-7 w-[1px] bg-gray-200 mx-1"></div>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 w-7 p-0" 
              onClick={() => setShowTagsPopover(true)}
              disabled={isLoading}
            >
              <TagIcon className="h-3.5 w-3.5" />
            </Button>
            
            {!disableAI && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 w-7 p-0" 
                onClick={() => setShowAIPopover(true)}
                disabled={isLoading}
              >
                <Wand2 className="h-3.5 w-3.5" />
              </Button>
            )}
            
            <div className="h-7 w-[1px] bg-gray-200 mx-1"></div>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 w-7 p-0" 
              onClick={undoChange}
              disabled={!hasUndoHistory || isLoading}
            >
              <Undo className="h-3.5 w-3.5" />
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 w-7 p-0" 
              onClick={redoChange}
              disabled={!hasRedoHistory || isLoading}
            >
              <Redo className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        {multiline ? (
          <Textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[100px] resize-y"
            placeholder="Editar contenido..."
            disabled={isLoading}
          />
        ) : (
          <Input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full"
            placeholder="Editar contenido..."
            disabled={isLoading}
          />
        )}
        
        <div className="text-xs text-muted-foreground mt-2">
          <kbd className="px-1 py-0.5 text-xs border rounded">Ctrl</kbd> + <kbd className="px-1 py-0.5 text-xs border rounded">Enter</kbd> para guardar, 
          <kbd className="px-1 py-0.5 text-xs border rounded ml-1">Esc</kbd> para cancelar
        </div>
        
        {/* AI Popover */}
        <Popover open={showAIPopover} onOpenChange={setShowAIPopover}>
          <PopoverContent className="w-80 p-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Mejora con IA</h4>
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ej: Mejora el texto, hazlo más formal..."
                className="text-xs"
              />
              <div className="text-xs text-muted-foreground">
                La IA analizará tu texto y aplicará las mejoras según tus instrucciones.
              </div>
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
        
        {/* Tags Popover */}
        <Popover open={showTagsPopover} onOpenChange={setShowTagsPopover}>
          <PopoverContent className="w-80 p-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Etiquetas</h4>
              
              {elementTags.length > 0 ? (
                <div className="flex flex-wrap gap-1 mb-2">
                  {elementTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1 text-xs flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground mb-2">
                  No hay etiquetas. Añade alguna para organizar tu contenido.
                </div>
              )}
              
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Nueva etiqueta"
                  className="text-xs"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  className="h-8 px-2 text-xs whitespace-nowrap"
                >
                  Añadir
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Las etiquetas te ayudan a organizar y categorizar tu contenido.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Render when not editing but in edit mode (selectable/hoverable)
  return (
    <div
      ref={elementRef}
      data-editable-id={id}
      data-editable-table={table}
      data-editable-field={field}
      className={cn(
        "relative group cursor-pointer transition-colors duration-200",
        isHovering && !isSelected && "outline outline-1 outline-primary/30",
        isSelected && "outline outline-2 outline-primary/60",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {children}
      
      {(isHovering || isSelected) && (
        <div className="absolute -top-2 -right-2 z-50">
          <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-sm">
            <Edit className="h-3 w-3" />
          </div>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute top-1 right-1 z-40 flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={handleStartEdit}
                  className="h-6 w-6 rounded-full bg-background"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Editar contenido</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {!disableAI && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon"
                    variant="outline"
                    onClick={() => setShowAIPopover(true)}
                    className="h-6 w-6 rounded-full bg-background"
                  >
                    <Wand2 className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p className="text-xs">Mejorar con IA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="outline"
                  onClick={() => setShowTagsPopover(true)}
                  className="h-6 w-6 rounded-full bg-background"
                >
                  <TagIcon className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Gestionar etiquetas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default UniversalEditableElement;
