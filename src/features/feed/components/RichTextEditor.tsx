
import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button } from '@/components/ui/button';
import { Loader2, Bold, Italic, Link, Image, Video, List, ListOrdered, AlignLeft, Smile, AtSign, Send } from 'lucide-react';
import { quillModules, quillFormats, handleImageUpload, createVideoModule } from '../utils/quillModules';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onSubmit?: () => void;
  submitting?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Escribe tu contenido aquí...',
  minHeight = '200px',
  onSubmit,
  submitting = false
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  // Custom handler setup for editor toolbar
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      
      // Set up image handler
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', () => {
        handleImageUpload(quill);
      });
      
      // Set up video embed functionality
      createVideoModule(quill);
    }
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  // Custom toolbar component
  const CustomToolbar = () => {
    if (!quillRef.current) return null;
    
    const quill = quillRef.current.getEditor();
    
    const applyFormat = (format: string, value?: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format(format, value || !quill.getFormat(range)[format]);
      }
    };
    
    const insertEmbed = (type: string) => {
      if (type === 'image') {
        handleImageUpload(quill);
      } else if (type === 'video') {
        // The video handler is already implemented via the toolbar config
        const toolbar = quill.getModule('toolbar');
        toolbar.handlers['video']();
      }
    };
    
    return (
      <div className="flex flex-wrap items-center gap-1 py-2 bg-muted/20 rounded-lg px-2 mb-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('link', prompt('Enter link URL:'))}>
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertEmbed('image')}>
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertEmbed('video')}>
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('list', 'bullet')}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('list', 'ordered')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyFormat('align', 'center')}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AtSign className="h-4 w-4" />
        </Button>
      </div>
    );
  };
  
  return (
    <div className={`quill-editor-container rounded-lg border bg-card ${isFocused ? 'ring-1 ring-primary' : ''}`} style={{ minHeight }}>
      {isFocused && <CustomToolbar />}
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={quillModules}
        formats={quillFormats}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      
      {isFocused && onSubmit && (
        <div className="flex justify-end py-2 px-3 bg-muted/10 border-t">
          <Button 
            onClick={onSubmit} 
            disabled={!value.trim() || submitting} 
            size="sm"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Send className="h-4 w-4 mr-1" />}
            Publicar
          </Button>
        </div>
      )}
    </div>
  );
};
