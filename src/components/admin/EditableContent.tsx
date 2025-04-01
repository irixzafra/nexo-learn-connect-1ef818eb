
import React from 'react';

interface EditableContentProps {
  table: string;
  id: string;
  field: string;
  value: string;
  multiline?: boolean;
  className?: string;
  contentType?: string;
  tags?: string[];
  onUpdate: (newValue: string) => Promise<boolean>;
}

// Simplified component that just displays content without editing functionality
const EditableContent: React.FC<EditableContentProps> = ({ 
  value, 
  className = "",
  multiline = false
}) => {
  if (multiline) {
    return <div className={className}>{value}</div>;
  }

  return <span className={className}>{value}</span>;
};

export default EditableContent;
