
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onSubmit?: () => void;
  submitting?: boolean;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  minHeight = '120px',
  onSubmit,
  submitting = false,
  className,
}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          shiftKey: false,
          handler: (range: any, context: any) => {
            if (onSubmit && value.trim() !== '') {
              onSubmit();
              return false;
            }
            return true;
          }
        }
      }
    }
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <div className={cn("rich-text-editor", className)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ 
          minHeight: minHeight,
          fontSize: '1rem'
        }}
        readOnly={submitting}
      />
      <style jsx global>{`
        .rich-text-editor .ql-editor {
          min-height: ${minHeight};
          font-size: 1rem;
          padding: 0.5rem 0;
        }
        .rich-text-editor .ql-container {
          border: none !important;
          font-family: inherit;
        }
        .rich-text-editor .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
          padding: 0.5rem 0;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: hsl(var(--muted-foreground));
        }
      `}</style>
    </div>
  );
};
