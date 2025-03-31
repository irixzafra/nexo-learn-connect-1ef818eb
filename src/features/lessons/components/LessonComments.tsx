
import React from "react";
import { CommentWithReplies } from "@/types/comments";
import { useComments } from "../hooks/useComments";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface LessonCommentsProps {
  lessonId: string;
}

export const LessonComments: React.FC<LessonCommentsProps> = ({ lessonId }) => {
  const { user } = useAuth();
  const {
    comments,
    isLoading,
    addComment,
    deleteComment,
    isAddingComment,
    replyingTo,
    startReply,
    cancelReply,
  } = useComments(lessonId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios ({comments.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {user && (
          <>
            <CommentForm
              onSubmit={addComment}
              isSubmitting={isAddingComment}
              replyingTo={replyingTo}
              onCancelReply={cancelReply}
            />
            <Separator className="my-4" />
          </>
        )}

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment: CommentWithReplies) => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  onReply={startReply}
                  onDelete={deleteComment}
                />
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        onReply={startReply}
                        onDelete={deleteComment}
                        isNested
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No hay comentarios en esta lección. ¡Sé el primero en comentar!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
