
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Post, PostCategory } from '@/types/community';
import { useToast } from '@/hooks/use-toast';

export const useCommunityFeed = (categoryId?: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['communityFeed', categoryId],
    queryFn: async (): Promise<Post[]> => {
      try {
        let query = supabase
          .from('posts')
          .select(`
            *,
            profiles (full_name, role)
          `)
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false });

        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching community feed:', error);
          throw error;
        }

        return data as Post[];
      } catch (error: any) {
        toast({
          title: 'Error loading feed',
          description: error.message || 'Could not load community feed',
          variant: 'destructive',
        });
        return [];
      }
    },
    refetchInterval: 30000, // Auto refresh every 30 seconds
  });
};

export const usePostCategories = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['postCategories'],
    queryFn: async (): Promise<PostCategory[]> => {
      try {
        const { data, error } = await supabase
          .from('post_categories')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching post categories:', error);
          throw error;
        }

        return data as PostCategory[];
      } catch (error: any) {
        toast({
          title: 'Error loading categories',
          description: error.message || 'Could not load post categories',
          variant: 'destructive',
        });
        return [];
      }
    },
  });
};

export const useCreatePost = () => {
  const { toast } = useToast();

  const createPost = async (post: Partial<Post>) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: 'Error creating post',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      toast({
        title: 'Post created',
        description: 'Your post has been published successfully',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Error creating post',
        description: error.message || 'There was an error creating your post',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return { createPost };
};

export const useLikePost = () => {
  const toggleLike = async (postId: string, userId: string) => {
    try {
      // First check if the user already liked this post
      const { data: existingLike, error: checkError } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingLike) {
        // Unlike the post
        const { error: unlikeError } = await supabase
          .from('post_likes')
          .delete()
          .eq('id', existingLike.id);

        if (unlikeError) throw unlikeError;
        return false; // Return false to indicate post was unliked
      } else {
        // Like the post
        const { error: likeError } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: userId,
          });

        if (likeError) throw likeError;
        return true; // Return true to indicate post was liked
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  };

  return { toggleLike };
};
