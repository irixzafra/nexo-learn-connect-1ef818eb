
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Comment, CommentWithReplies } from "@/types/comments";
import { useAuth } from "@/contexts/AuthContext";

export const useComments = (lessonId?: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  // Fetch comments for the lesson
  const {
    data: comments = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["lessonComments", lessonId],
    queryFn: async () => {
      if (!lessonId) return [];

      try {
        // First get all comments for this lesson
        const { data: commentsData, error: commentsError } = await supabase
          .from("comments")
          .select(`
            *,
            profiles:user_id(full_name)
          `)
          .eq("lesson_id", lessonId)
          .order("created_at", { ascending: false });

        if (commentsError) throw commentsError;

        // Process comments to include user names and organize into thread structure
        const processedComments = commentsData.map((comment: any) => ({
          ...comment,
          user_name: comment.profiles?.full_name || "Usuario",
        }));

        // Organize into parent comments and replies
        const parentComments: CommentWithReplies[] = [];
        const replies: { [key: string]: Comment[] } = {};

        processedComments.forEach((comment: Comment) => {
          if (comment.parent_comment_id) {
            // This is a reply
            if (!replies[comment.parent_comment_id]) {
              replies[comment.parent_comment_id] = [];
            }
            replies[comment.parent_comment_id].push(comment);
          } else {
            // This is a parent comment
            parentComments.push({ ...comment, replies: [] });
          }
        });

        // Add replies to their parent comments
        parentComments.forEach((parentComment) => {
          if (replies[parentComment.id]) {
            parentComment.replies = replies[parentComment.id].sort(
              (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
          }
        });

        return parentComments;
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    enabled: !!lessonId,
  });

  // Add a new comment
  const addCommentMutation = useMutation({
    mutationFn: async ({ content, parentId }: { content: string; parentId?: string }) => {
      if (!user || !lessonId) {
        throw new Error("User must be logged in and lesson ID is required");
      }

      const newComment = {
        user_id: user.id,
        lesson_id: lessonId,
        content,
        parent_comment_id: parentId || null,
      };

      const { data, error } = await supabase
        .from("comments")
        .insert(newComment)
        .select(`
          *,
          profiles:user_id(full_name)
        `)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        user_name: data.profiles?.full_name || "Usuario",
      };
    },
    onSuccess: () => {
      // Invalidate and refetch the comments query
      queryClient.invalidateQueries({ queryKey: ["lessonComments", lessonId] });
      toast({
        title: "Comentario publicado",
        description: "Tu comentario ha sido publicado correctamente",
      });
      setReplyingTo(null);
    },
    onError: (error: any) => {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "No se pudo publicar el comentario",
        variant: "destructive",
      });
    },
  });

  // Delete a comment
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
      return commentId;
    },
    onSuccess: (commentId) => {
      queryClient.invalidateQueries({ queryKey: ["lessonComments", lessonId] });
      toast({
        title: "Comentario eliminado",
        description: "El comentario ha sido eliminado correctamente",
      });
    },
    onError: (error: any) => {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el comentario",
        variant: "destructive",
      });
    },
  });

  const startReply = (comment: Comment) => {
    setReplyingTo(comment);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  return {
    comments,
    isLoading,
    error,
    addComment: (content: string, parentId?: string) => 
      addCommentMutation.mutate({ content, parentId }),
    deleteComment: (commentId: string) => deleteCommentMutation.mutate(commentId),
    isAddingComment: addCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending,
    replyingTo,
    startReply,
    cancelReply,
    refetchComments: refetch,
  };
};
