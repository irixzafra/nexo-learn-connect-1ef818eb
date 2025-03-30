
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Post, PostCategory } from '@/types/community';
import { toast } from 'sonner';

export const useCommunityFeed = (categoryId: string | null = null) => {
  return useQuery({
    queryKey: ['communityFeed', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            role,
            avatar_url
          ),
          user_level:user_id (
            level_number,
            level_name,
            icon,
            color
          )
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Error fetching posts');
      }

      return data as Post[];
    },
    refetchOnWindowFocus: false,
  });
};

export const usePostCategories = () => {
  return useQuery({
    queryKey: ['postCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('post_categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
      }

      // Define default categories if none exist in the database
      if (!data || data.length === 0) {
        const defaultCategories: PostCategory[] = [
          { id: '1', name: 'General', icon: '💬', color: '#3b82f6', created_at: new Date().toISOString() },
          { id: '2', name: 'Debates', icon: '🔥', color: '#ef4444', created_at: new Date().toISOString() },
          { id: '3', name: 'Empleos', icon: '💼', color: '#10b981', created_at: new Date().toISOString() },
          { id: '4', name: 'Eventos', icon: '📅', color: '#f59e0b', created_at: new Date().toISOString() },
          { id: '5', name: 'Preguntas', icon: '❓', color: '#8b5cf6', created_at: new Date().toISOString() },
          { id: '6', name: 'Proyectos', icon: '🚀', color: '#ec4899', created_at: new Date().toISOString() },
          { id: '7', name: 'Recursos', icon: '📚', color: '#14b8a6', created_at: new Date().toISOString() },
          { id: '8', name: 'Tutoriales', icon: '📝', color: '#6366f1', created_at: new Date().toISOString() }
        ];
        return defaultCategories;
      }

      return data as PostCategory[];
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

interface CreatePostParams {
  user_id: string;
  content: string;
  title?: string;
  category_id?: string | null;
}

export const useCreatePost = () => {
  const createPost = async (params: CreatePostParams) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        user_id: params.user_id,
        content: params.content,
        title: params.title || null,
        category_id: params.category_id || null,
      }])
      .select();

    if (error) {
      console.error('Error creating post:', error);
      throw new Error('Error creating post');
    }

    // Si tenemos categoria, obtener los detalles de la categoría
    if (params.category_id) {
      const { data: categoryData, error: categoryError } = await supabase
        .from('post_categories')
        .select('name')
        .eq('id', params.category_id)
        .single();
      
      if (!categoryError && categoryData) {
        return { ...data[0], category: categoryData.name };
      }
    }

    return data[0];
  };

  return {
    createPost,
  };
};

interface PostLikeParams {
  post_id: string;
  user_id: string;
}

export const usePostLike = () => {
  return useMutation({
    mutationFn: async (params: PostLikeParams) => {
      const { data: existingLike, error: checkError } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', params.post_id)
        .eq('user_id', params.user_id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking like:', checkError);
        throw new Error('Error checking like');
      }

      if (existingLike) {
        // Unlike
        const { error: deleteError } = await supabase
          .from('post_likes')
          .delete()
          .eq('id', existingLike.id);

        if (deleteError) {
          console.error('Error unliking post:', deleteError);
          throw new Error('Error unliking post');
        }

        return { liked: false };
      } else {
        // Like
        const { error: insertError } = await supabase
          .from('post_likes')
          .insert([{
            post_id: params.post_id,
            user_id: params.user_id,
          }]);

        if (insertError) {
          console.error('Error liking post:', insertError);
          throw new Error('Error liking post');
        }

        return { liked: true };
      }
    },
    onSuccess: (data) => {
      toast.success(data.liked ? 'Post liked' : 'Post unliked');
    },
    onError: () => {
      toast.error('Error updating like');
    },
  });
};
