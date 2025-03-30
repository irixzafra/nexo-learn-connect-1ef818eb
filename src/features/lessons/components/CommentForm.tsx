
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  isSubmitting 
}) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  if (!user) {
    return (
      <div className="bg-muted p-4 rounded-md text-center text-muted-foreground">
        Debes iniciar sesión para poder comentar.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Escribe tu comentario aquí..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
        disabled={isSubmitting}
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Publicar comentario'
          )}
        </Button>
      </div>
    </form>
  );
};
