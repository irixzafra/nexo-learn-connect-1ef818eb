
import React from 'react';

// This is a placeholder component since inline editing has been removed
const InlineEdit: React.FC<{
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}> = ({ value }) => {
  return <span>{value}</span>;
};

export default InlineEdit;
