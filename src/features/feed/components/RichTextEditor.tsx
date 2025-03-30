
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  List, 
  ListOrdered, 
  Quote, 
  Video, 
  Code, 
  Type, 
  Send,
  FilePenLine,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { quillModules, quillFormats, handleImageUpload, createVideoModule } from '../utils/quillModules';
import { Alert, AlertTitle } from '@/components/ui/alert';

interface RichTextEditorProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  minHeight?: string;
  showToolbar?: boolean;
  submitting?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = 'Escribe algo...',
  value,
  onChange,
  onSubmit,
  className,
  minHeight = '200px',
  showToolbar = true,
  submitting = false,
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [error, setError] = useState<string | null>(null);
  const [modules, setModules] = useState(quillModules);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  
  useEffect(() => {
    if (quillRef.current && showToolbar) {
      const quill = quillRef.current.getEditor();
      
      // Personalizar los manejadores de la barra de herramientas
      const updatedModules = { ...quillModules };
      updatedModules.toolbar.handlers = {
        ...updatedModules.toolbar.handlers,
        image: () => handleImageUpload(quill),
        video: () => createVideoModule(quill)(),
      };
      
      setModules(updatedModules);
    }
  }, [quillRef, showToolbar]);
  
  // Manejar errores de carga
  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };
  
  // Mostrar/ocultar la barra de herramientas en dispositivos móviles
  const toggleToolbar = () => {
    setToolbarVisible(!toolbarVisible);
  };
  
  return (
    <div className={cn("border rounded-md overflow-hidden bg-white dark:bg-gray-950", className)}>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      
      {/* Botón para mostrar/ocultar la barra de herramientas en móviles */}
      {showToolbar && (
        <div className="md:hidden border-b p-2 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleToolbar}
            className="flex items-center gap-1"
          >
            {toolbarVisible ? <X size={16} /> : <FilePenLine size={16} />}
            {toolbarVisible ? 'Ocultar Formato' : 'Mostrar Formato'}
          </Button>
        </div>
      )}
      
      {/* Barra de herramientas personalizada */}
      {showToolbar && (toolbarVisible || window.innerWidth >= 768) && (
        <div className="border-b p-2 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-1 flex-wrap">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Type size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bold size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Italic size={16} />
            </Button>
            <div className="h-full border-r mx-1 dark:border-gray-700" />
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <LinkIcon size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ImageIcon size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Video size={16} />
            </Button>
            <div className="h-full border-r mx-1 dark:border-gray-700" />
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <ListOrdered size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <List size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Quote size={16} />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Code size={16} />
            </Button>
          </div>
        </div>
      )}
      
      {/* Editor Quill con tema personalizado */}
      <div className="quill-editor-container">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={quillFormats}
          className="bg-transparent border-none"
          style={{ 
            minHeight,
            maxHeight: '550px',
            overflowY: 'auto',
            border: 'none' 
          }}
        />
      </div>
      
      {/* Botón de envío */}
      {onSubmit && (
        <div className="flex justify-end p-2 border-t bg-gray-50 dark:bg-gray-900">
          <Button 
            onClick={onSubmit} 
            type="button"
            disabled={submitting || !value.trim()}
            size="sm"
            className="flex items-center gap-1"
          >
            {submitting ? 'Publicando...' : 'Publicar'}
            <Send className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
