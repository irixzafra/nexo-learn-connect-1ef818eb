
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Comment {
  id: string;
  lesson_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  parent_comment_id?: string;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

export const useComments = (lessonId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['lessonComments', lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:profiles(full_name, avatar_url)
        `)
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!lessonId,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('comments')
        .insert({
          lesson_id: lessonId,
          user_id: user.id,
          content,
        })
        .select(`
          *,
          user:profiles(full_name, avatar_url)
        `)
        .single();
      
      if (error) throw error;
      return data as Comment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonComments', lessonId] });
      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado.",
      });
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo publicar tu comentario.",
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return commentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonComments', lessonId] });
      toast({
        title: "Comentario eliminado",
        description: "Tu comentario ha sido eliminado.",
      });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el comentario.",
      });
    },
  });

  return {
    comments,
    isLoading,
    error,
    addComment: (content: string) => addCommentMutation.mutate(content),
    deleteComment: (commentId: string) => deleteCommentMutation.mutate(commentId),
    isAddingComment: addCommentMutation.isPending,
    isDeletingComment: deleteCommentMutation.isPending
  };
};
