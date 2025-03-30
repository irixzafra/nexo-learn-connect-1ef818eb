
import React, { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageSquare } from 'lucide-react';

interface LessonCommentsProps {
  lessonId: string;
}

export const LessonComments: React.FC<LessonCommentsProps> = ({ lessonId }) => {
  const {
    comments,
    isLoading,
    addComment,
    deleteComment,
    isAddingComment,
    isDeletingComment
  } = useComments(lessonId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comentarios
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CommentForm onSubmit={addComment} isSubmitting={isAddingComment} />
        
        {comments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map(comment => (
              <CommentItem 
                key={comment.id}
                comment={comment}
                onDelete={deleteComment}
                isDeletingComment={isDeletingComment}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
