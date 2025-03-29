
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/types/comments";
import { Loader2, Send, X } from "lucide-react";

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => void;
  isSubmitting: boolean;
  replyingTo?: Comment | null;
  onCancelReply?: () => void;
  placeholder?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  isSubmitting,
  replyingTo,
  onCancelReply,
  placeholder = "Añade un comentario...",
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    onSubmit(content, replyingTo?.id);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {replyingTo && (
        <div className="flex items-center mb-2 text-sm bg-muted p-2 rounded">
          <span className="flex-1">
            Respondiendo a <strong>{replyingTo.user_name || "Usuario"}</strong>
          </span>
          {onCancelReply && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancelReply}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancelar respuesta</span>
            </Button>
          )}
        </div>
      )}
      
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={isSubmitting}
        className="resize-none"
      />
      
      <div className="flex justify-end mt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting || !content.trim()}
          size="sm"
          className="gap-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Enviar
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
