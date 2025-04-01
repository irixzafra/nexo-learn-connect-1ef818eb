
import React from 'react';
import UniversalEditableElement from './UniversalEditableElement';

interface InlineEditProps {
  table: string;
  id: string;
  field: string;
  value: string;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  onSave?: (value: string) => Promise<boolean>;
  disableAI?: boolean;
  elementType?: string;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  table,
  id,
  field,
  value,
  className,
  multiline = false,
  placeholder,
  tags = [],
  onTagsChange,
  onSave,
  disableAI = false,
  elementType = 'text'
}) => {
  return (
    <UniversalEditableElement
      id={id}
      table={table}
      field={field}
      initialValue={value}
      className={className}
      multiline={multiline}
      tags={tags}
      onTagsChange={onTagsChange}
      onSave={onSave}
      disableAI={disableAI}
      elementType={elementType}
    >
      {value || placeholder || "Haz clic para editar"}
    </UniversalEditableElement>
  );
};

export default InlineEdit;
