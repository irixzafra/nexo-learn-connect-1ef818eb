
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Type,
  Image,
  Layout,
  MessageSquare,
  BarChart,
  FormInput,
  Grid3X3,
  Mail,
  Puzzle,
  CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageBlockType } from '@/types/pages';
import { Textarea } from '@/components/ui/textarea';
import { useAIContentGeneration } from '@/hooks/useAIContentGeneration';

interface BlockInsertMenuProps {
  onAddBlock: (type: PageBlockType, content?: string | Record<string, any>) => void;
  position?: 'top' | 'bottom' | number;
  className?: string;
}

interface BlockTemplate {
  id: string;
  type: PageBlockType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string | Record<string, any>;
}

const BLOCK_TEMPLATES: BlockTemplate[] = [
  {
    id: 'text',
    type: 'text',
    title: 'Texto',
    description: 'Párrafo de texto simple',
    icon: Type,
    content: 'Haz clic para editar este texto.'
  },
  {
    id: 'hero',
    type: 'hero',
    title: 'Hero',
    description: 'Sección destacada para la parte superior',
    icon: Image,
    content: 'Título principal de tu página'
  },
  {
    id: 'features',
    type: 'features',
    title: 'Características',
    description: 'Lista de funcionalidades o ventajas',
    icon: Grid3X3,
    content: {
      title: 'Nuestras características',
      items: [
        { title: 'Característica 1', description: 'Descripción de la característica 1' },
        { title: 'Característica 2', description: 'Descripción de la característica 2' },
        { title: 'Característica 3', description: 'Descripción de la característica 3' }
      ]
    }
  },
  {
    id: 'cta',
    type: 'cta',
    title: 'Llamada a la acción',
    description: 'Sección para convertir visitantes',
    icon: MessageSquare,
    content: {
      title: '¿Listo para comenzar?',
      subtitle: 'Únete a miles de usuarios satisfechos',
      buttonText: 'Comenzar ahora',
      buttonUrl: '#'
    }
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    title: 'Testimonios',
    description: 'Comentarios de clientes satisfechos',
    icon: MessageSquare,
    content: {
      title: 'Lo que dicen nuestros clientes',
      items: [
        { name: 'Cliente 1', position: 'CEO', company: 'Empresa 1', comment: 'Comentario positivo aquí.' },
        { name: 'Cliente 2', position: 'Director', company: 'Empresa 2', comment: 'Otro comentario positivo aquí.' }
      ]
    }
  },
  {
    id: 'faq',
    type: 'faq',
    title: 'Preguntas frecuentes',
    description: 'Respuestas a dudas comunes',
    icon: FormInput,
    content: {
      title: 'Preguntas frecuentes',
      items: [
        { question: '¿Pregunta 1?', answer: 'Respuesta a la pregunta 1.' },
        { question: '¿Pregunta 2?', answer: 'Respuesta a la pregunta 2.' }
      ]
    }
  },
  {
    id: 'pricing',
    type: 'pricing',
    title: 'Precios',
    description: 'Planes y tarifas disponibles',
    icon: CreditCard,
    content: {
      title: 'Planes y precios',
      subtitle: 'Encuentra el plan perfecto para ti',
      plans: [
        { name: 'Básico', price: '9.99', currency: '€', period: 'mes', features: ['Característica 1', 'Característica 2'] },
        { name: 'Profesional', price: '19.99', currency: '€', period: 'mes', features: ['Característica 1', 'Característica 2', 'Característica 3'] }
      ]
    }
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Contacto',
    description: 'Formulario para contactar',
    icon: Mail,
    content: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte',
      fields: ['name', 'email', 'message']
    }
  },
  {
    id: 'custom',
    type: 'custom',
    title: 'Personalizado',
    description: 'Bloque personalizado',
    icon: Puzzle,
    content: {
      title: 'Bloque personalizado',
      html: '<div>Este es un bloque personalizado</div>'
    }
  }
];

const BlockInsertMenu: React.FC<BlockInsertMenuProps> = ({
  onAddBlock,
  position,
  className
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<BlockTemplate | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [customType, setCustomType] = useState<PageBlockType>('text');
  const { generateContent, isGenerating } = useAIContentGeneration();
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAddTemplate = (template: BlockTemplate) => {
    onAddBlock(template.type, template.content);
    toast.success(`Bloque de tipo ${template.title} añadido`);
  };

  const openCustomBlockModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateCustomBlock = () => {
    if (activeTab === 'custom') {
      if (!customContent.trim()) {
        toast.error('El contenido no puede estar vacío');
        return;
      }
      
      try {
        // Check if content is JSON
        const isJson = customContent.trim().startsWith('{') || customContent.trim().startsWith('[');
        const content = isJson ? JSON.parse(customContent) : customContent;
        
        onAddBlock(customType, content);
        toast.success('Bloque personalizado añadido');
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        toast.error('Error en el formato JSON del contenido');
      }
    } else if (activeTab === 'templates' && selectedTemplate) {
      handleAddTemplate(selectedTemplate);
      setIsModalOpen(false);
      resetForm();
    } else if (activeTab === 'ai') {
      handleGenerateWithAI();
    }
  };

  const resetForm = () => {
    setCustomTitle('');
    setCustomContent('');
    setCustomType('text');
    setSelectedTemplate(null);
    setAiPrompt('');
    setActiveTab('templates');
  };

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Por favor, introduce una descripción para la IA');
      return;
    }
    
    try {
      const generatedContent = await generateContent(aiPrompt, customType);
      
      if (generatedContent) {
        onAddBlock(customType, generatedContent);
        toast.success('Contenido generado y añadido');
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error generando contenido:', error);
      toast.error('Error al generar contenido con IA');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={className}
          >
            <Plus className="h-4 w-4 mr-2" />
            Añadir bloque
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60">
          <DropdownMenuLabel>Insertar bloque</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            {BLOCK_TEMPLATES.slice(0, 3).map((template) => (
              <DropdownMenuItem 
                key={template.id}
                onClick={() => handleAddTemplate(template)}
              >
                <template.icon className="h-4 w-4 mr-2" />
                <span>{template.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={openCustomBlockModal}>
            <Layout className="h-4 w-4 mr-2" />
            <span>Más opciones...</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={openCustomBlockModal}>
            <Puzzle className="h-4 w-4 mr-2" />
            <span>Bloque personalizado</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Añadir nuevo bloque</DialogTitle>
            <DialogDescription>
              Selecciona un tipo de bloque predefinido o crea uno personalizado.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="w-full">
              <TabsTrigger value="templates">Plantillas</TabsTrigger>
              <TabsTrigger value="custom">Personalizado</TabsTrigger>
              <TabsTrigger value="ai">Generar con IA</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="flex-1 flex flex-col mt-0">
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-2 gap-4 py-4">
                  {BLOCK_TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-md p-4 cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5 ${
                        selectedTemplate?.id === template.id
                          ? 'border-primary bg-primary/10'
                          : ''
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <template.icon className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">{template.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="custom" className="flex-1 flex flex-col space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-type">Tipo de bloque</Label>
                  <select
                    id="custom-type"
                    className="w-full p-2 border rounded-md"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as PageBlockType)}
                  >
                    {BLOCK_TEMPLATES.map((template) => (
                      <option key={template.id} value={template.type}>
                        {template.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-title">Título (opcional)</Label>
                  <Input
                    id="custom-title"
                    placeholder="Título para referencia"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2 flex-1">
                <Label htmlFor="custom-content">Contenido</Label>
                <Textarea
                  id="custom-content"
                  placeholder="Contenido del bloque (texto plano o JSON)"
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  className="min-h-[200px] flex-1"
                />
                <p className="text-xs text-muted-foreground">
                  Puedes usar texto plano o formato JSON para bloques más complejos.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="flex-1 flex flex-col space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-type">Tipo de bloque</Label>
                  <select
                    id="ai-type"
                    className="w-full p-2 border rounded-md"
                    value={customType}
                    onChange={(e) => setCustomType(e.target.value as PageBlockType)}
                  >
                    {BLOCK_TEMPLATES.map((template) => (
                      <option key={template.id} value={template.type}>
                        {template.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2 flex-1">
                <Label htmlFor="ai-prompt">Descripción para la IA</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Describe el contenido que deseas generar..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[200px] flex-1"
                />
                <p className="text-xs text-muted-foreground">
                  Describe en detalle qué contenido necesitas para tu bloque y la IA lo generará por ti.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateCustomBlock}
              disabled={
                (activeTab === 'templates' && !selectedTemplate) ||
                (activeTab === 'custom' && !customContent.trim()) ||
                (activeTab === 'ai' && (!aiPrompt.trim() || isGenerating))
              }
            >
              {activeTab === 'ai' && isGenerating ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  Generando...
                </>
              ) : (
                'Añadir bloque'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlockInsertMenu;
