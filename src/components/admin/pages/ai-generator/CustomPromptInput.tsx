
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface CustomPromptInputProps {
  prompt: string;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  prompt,
  onPromptChange,
}) => {
  return (
    <div>
      <FormLabel>Prompt personalizado</FormLabel>
      <Textarea 
        placeholder="Describe el contenido que quieres generar..."
        className="min-h-24 resize-none"
        value={prompt}
        onChange={onPromptChange}
      />
      <p className="text-sm text-muted-foreground mt-1">
        Describe en detalle el contenido que deseas generar
      </p>
    </div>
  );
};

export default CustomPromptInput;
