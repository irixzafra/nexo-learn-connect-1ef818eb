
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import '../styles/quill-custom.css';

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
      {/* Custom inline styles - these are now in the quill-custom.css file */}
    </div>
  );
};
