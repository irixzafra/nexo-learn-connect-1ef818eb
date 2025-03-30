
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Comment } from '../hooks/useComments';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface CommentItemProps {
  comment: Comment;
  onDelete: (commentId: string) => void;
  isDeletingComment: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  onDelete,
  isDeletingComment
}) => {
  const { user } = useAuth();
  const isAuthor = user?.id === comment.user_id;
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: es });
    } catch (e) {
      return dateString;
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      onDelete(comment.id);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={comment.user?.avatar_url} />
            <AvatarFallback>
              {comment.user?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="font-medium">{comment.user?.full_name || 'Usuario'}</div>
            <div className="text-xs text-muted-foreground">
              {formatDate(comment.created_at)}
            </div>
          </div>
        </div>
        
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={handleDelete}
                disabled={isDeletingComment}
                className="text-destructive focus:text-destructive"
              >
                {isDeletingComment ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="mr-2 h-4 w-4" />
                )}
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <div className="mt-3 text-sm whitespace-pre-wrap">
        {comment.content}
      </div>
    </div>
  );
};
