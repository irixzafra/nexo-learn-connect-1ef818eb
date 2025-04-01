
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomPromptInputProps {
  prompt: string;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomPromptInput: React.FC<CustomPromptInputProps> = ({
  prompt,
  onPromptChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="custom-prompt">Prompt personalizado</Label>
      <Textarea
        id="custom-prompt"
        placeholder="Describe el contenido que deseas generar..."
        value={prompt}
        onChange={onPromptChange}
        rows={5}
        className="resize-none"
      />
      <p className="text-xs text-muted-foreground">
        Proporciona detalles específicos sobre lo que deseas generar.
      </p>
    </div>
  );
};

export default CustomPromptInput;
