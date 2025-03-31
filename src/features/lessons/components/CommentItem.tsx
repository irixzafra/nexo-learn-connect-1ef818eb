
import React from "react";
import { Comment } from "@/types/comments";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { MessageSquare, Trash2 } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
  onReply: (comment: Comment) => void;
  onDelete: (commentId: string) => void;
  isNested?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onDelete,
  isNested = false,
}) => {
  const { user, userRole } = useAuth();
  
  const canDelete =
    user?.id === comment.user_id || userRole === "admin" || userRole === "instructor";
  
  const formattedDate = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: es,
  });

  return (
    <Card className={`p-4 ${isNested ? "ml-6 mt-2 bg-muted/50" : "mb-4"}`}>
      <div className="flex justify-between">
        <div className="font-medium">{comment.user_name || "Usuario"}</div>
        <div className="text-xs text-muted-foreground">{formattedDate}</div>
      </div>
      <div className="mt-2 text-sm">{comment.content}</div>
      <div className="mt-2 flex gap-2 justify-end">
        {!isNested && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => onReply(comment)}
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Responder
          </Button>
        )}
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-destructive hover:text-destructive"
            onClick={() => onDelete(comment.id)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Eliminar
          </Button>
        )}
      </div>
    </Card>
  );
};
