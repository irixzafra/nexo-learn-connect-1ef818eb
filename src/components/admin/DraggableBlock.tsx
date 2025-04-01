
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageBlock, PageBlockType } from '@/types/pages';
import { cn } from '@/lib/utils';
import {
  GripVertical,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Settings,
  Eye,
  Save,
  Maximize2,
  Minimize2,
  Layout,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DraggableBlockProps {
  block: PageBlock;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onResize?: (block: PageBlock, size: { width?: string; height?: string }) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  onEdit?: (id: string) => void;
  onLayoutChange?: (id: string, layout: 'column' | 'row' | 'grid-2' | 'grid-3' | 'grid-4') => void;
  children: React.ReactNode;
  className?: string;
}

const BlockTypeLabels: Record<PageBlockType, string> = {
  'text': 'Texto',
  'hero': 'Hero',
  'cta': 'Llamada a acción',
  'features': 'Características',
  'testimonials': 'Testimonios',
  'faq': 'Preguntas frecuentes',
  'pricing': 'Precios',
  'contact': 'Contacto',
  'custom': 'Personalizado'
};

const LayoutOptions = [
  { id: 'column', label: 'Columna', icon: Layout },
  { id: 'row', label: 'Fila', icon: Layout },
  { id: 'grid-2', label: 'Grid 2 columnas', icon: Layout },
  { id: 'grid-3', label: 'Grid 3 columnas', icon: Layout },
  { id: 'grid-4', label: 'Grid 4 columnas', icon: Layout },
];

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  block,
  onRemove,
  onDuplicate,
  onResize,
  onMoveUp,
  onMoveDown,
  onEdit,
  onLayoutChange,
  children,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    width: block.width || '100%',
    height: block.height,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleResize = (dimension: 'width' | 'height', value: string) => {
    if (onResize) {
      const newSize = dimension === 'width' 
        ? { width: value }
        : { height: value };
      onResize(block, newSize);
    }
  };

  const handleChangeLayout = (layout: 'column' | 'row' | 'grid-2' | 'grid-3' | 'grid-4') => {
    if (onLayoutChange) {
      onLayoutChange(block.id, layout);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "transition-all duration-200 ease-in-out mb-4", 
        isDragging ? "z-50" : "",
        className
      )}
    >
      <Card className={cn(
        "border",
        isDragging ? "border-primary" : "border-border",
        isPreviewMode ? "border-transparent shadow-none pt-0" : ""
      )}>
        {!isPreviewMode && (
          <CardHeader className="px-3 py-2 flex flex-row items-center justify-between bg-muted/50 border-b">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="cursor-grab p-1 h-auto"
                {...attributes} 
                {...listeners}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
              
              <Badge variant="outline" className="font-normal">
                {BlockTypeLabels[block.type] || block.type}
              </Badge>
              
              {block.tags && block.tags.length > 0 && (
                <div className="flex gap-1">
                  {block.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={handleTogglePreview}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Vista previa</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={handleToggleExpand}
                    >
                      {isExpanded ? (
                        <Minimize2 className="h-3.5 w-3.5" />
                      ) : (
                        <Maximize2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isExpanded ? 'Contraer' : 'Expandir'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(block.id)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={() => onDuplicate(block.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicar</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onMoveUp?.(block.id)}>
                    <MoveUp className="mr-2 h-4 w-4" />
                    <span>Mover arriba</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => onMoveDown?.(block.id)}>
                    <MoveDown className="mr-2 h-4 w-4" />
                    <span>Mover abajo</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onRemove(block.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Eliminar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
        )}
        
        {isExpanded && (
          <CardContent className={cn(
            "px-3 py-3",
            isPreviewMode ? "px-0 py-0" : ""
          )}>
            {children}
          </CardContent>
        )}
        
        {!isPreviewMode && isExpanded && block.isContainer && (
          <CardFooter className="px-3 py-2 flex justify-between border-t bg-muted/30">
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">Layout:</span>
              <div className="flex gap-1">
                {LayoutOptions.map(option => (
                  <Button
                    key={option.id}
                    variant={block.layout === option.id ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleChangeLayout(option.id as any)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted-foreground">Ancho:</span>
              <div className="flex gap-1">
                <Button
                  variant={block.width === '25%' ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleResize('width', '25%')}
                >
                  25%
                </Button>
                <Button
                  variant={block.width === '50%' ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleResize('width', '50%')}
                >
                  50%
                </Button>
                <Button
                  variant={block.width === '75%' ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleResize('width', '75%')}
                >
                  75%
                </Button>
                <Button
                  variant={!block.width || block.width === '100%' ? "secondary" : "ghost"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleResize('width', '100%')}
                >
                  100%
                </Button>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default DraggableBlock;
