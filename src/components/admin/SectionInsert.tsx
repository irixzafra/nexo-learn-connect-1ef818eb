
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Plus, Text, Newspaper, Image } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface SectionInsertProps {
  onAddSection: (content: string, type?: string) => void;
  onCancel?: () => void;
  className?: string;
}

const SectionInsert: React.FC<SectionInsertProps> = ({ 
  onAddSection, 
  onCancel,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'component'>('text');
  const [textContent, setTextContent] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  const handleAddText = () => {
    if (!textContent.trim()) return;
    onAddSection(textContent.trim(), 'text');
    setTextContent('');
  };
  
  const handleAddComponent = () => {
    if (!selectedComponent) return;
    onAddSection('Nuevo componente', selectedComponent);
    setSelectedComponent(null);
  };
  
  const handleCancel = () => {
    setTextContent('');
    setSelectedComponent(null);
    if (onCancel) onCancel();
  };
  
  return (
    <Card className={cn("w-full max-w-md mx-auto border border-dashed border-primary/40", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={activeTab === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('text')}
              className="gap-1"
            >
              <Text className="h-3.5 w-3.5" />
              <span className="text-xs">Texto</span>
            </Button>
            <Button
              type="button"
              variant={activeTab === 'component' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('component')}
              className="gap-1"
            >
              <Newspaper className="h-3.5 w-3.5" />
              <span className="text-xs">Componente</span>
            </Button>
          </div>
          
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {activeTab === 'text' && (
          <div className="space-y-3">
            <Textarea
              placeholder="Ingresa el texto del nuevo elemento..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="h-24 w-full"
            />
            
            <div className="flex justify-end">
              <Button
                type="button"
                size="sm"
                onClick={handleAddText}
                disabled={!textContent.trim()}
                className="gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Agregar Texto
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'component' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={selectedComponent === 'hero' ? 'default' : 'outline'}
                className="h-auto flex flex-col p-2 justify-center items-center"
                onClick={() => setSelectedComponent('hero')}
              >
                <Newspaper className="h-5 w-5 mb-1" />
                <span className="text-xs">Hero</span>
              </Button>
              
              <Button
                variant={selectedComponent === 'image' ? 'default' : 'outline'}
                className="h-auto flex flex-col p-2 justify-center items-center"
                onClick={() => setSelectedComponent('image')}
              >
                <Image className="h-5 w-5 mb-1" />
                <span className="text-xs">Imagen</span>
              </Button>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                size="sm"
                onClick={handleAddComponent}
                disabled={!selectedComponent}
                className="gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Agregar Componente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionInsert;
