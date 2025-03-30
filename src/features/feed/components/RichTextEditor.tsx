
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Bold, Italic, Link, Image, List, ListOrdered, Quote, FileImage, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
  minHeight?: string;
  showToolbar?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = 'Escribe algo...',
  value,
  onChange,
  onSubmit,
  className,
  minHeight = '200px',
  showToolbar = true,
}) => {
  const modules = {
    toolbar: showToolbar ? {
      container: '#toolbar',
    } : false,
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image', 'video',
    'code-block', 'blockquote',
  ];
  
  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      {showToolbar && (
        <div id="toolbar" className="border-b p-2 flex items-center gap-2 flex-wrap bg-background">
          <button className="ql-bold hover:bg-muted rounded p-1">
            <Bold size={18} />
          </button>
          <button className="ql-italic hover:bg-muted rounded p-1">
            <Italic size={18} />
          </button>
          <button className="ql-link hover:bg-muted rounded p-1">
            <Link size={18} />
          </button>
          <button className="ql-image hover:bg-muted rounded p-1">
            <Image size={18} />
          </button>
          <div className="border-r h-6 mx-1" />
          <button className="ql-list value=ordered hover:bg-muted rounded p-1">
            <ListOrdered size={18} />
          </button>
          <button className="ql-list value=bullet hover:bg-muted rounded p-1">
            <List size={18} />
          </button>
          <button className="ql-blockquote hover:bg-muted rounded p-1">
            <Quote size={18} />
          </button>
        </div>
      )}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        className="bg-background"
        style={{ minHeight }}
      />
      
      {onSubmit && (
        <div className="flex justify-end p-2 border-t">
          <Button onClick={onSubmit} type="button">
            <Send className="mr-2 h-4 w-4" />
            Publicar
          </Button>
        </div>
      )}
    </div>
  );
};
