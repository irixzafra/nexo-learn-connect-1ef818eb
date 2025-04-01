
import React from 'react';

interface EditableContentProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  table?: string;
  id?: string;
  field?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  contentType?: string;
}

// Simplified component that just displays content without editing functionality
const InlineEdit: React.FC<EditableContentProps> = ({ 
  value, 
  onChange = () => {},
  className = "",
  placeholder = "",
  multiline = false,
  tags = [],
  onTagsChange = () => {}
}) => {
  if (multiline) {
    return <div className={className}>{value || placeholder}</div>;
  }

  return <span className={className}>{value || placeholder}</span>;
};

export default InlineEdit;
