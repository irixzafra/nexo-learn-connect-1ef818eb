
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Post } from '@/types/community';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Pin 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLikePost, usePostCategories } from '../hooks/useCommunityFeed';

interface PostItemProps {
  post: Post;
  onCommentClick?: (postId: string) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onCommentClick }) => {
  const { user } = useAuth();
  const { toggleLike } = useLikePost();
  const [liked, setLiked] = React.useState(false);
  const [localLikeCount, setLocalLikeCount] = React.useState(post.like_count);
  const { data: categories = [] } = usePostCategories();
  
  // Find the category for this post
  const category = categories.find(cat => cat.id === post.category_id);

  const handleLikeToggle = async () => {
    if (!user) return;
    
    try {
      const isLiked = await toggleLike(post.id, user.id);
      setLiked(isLiked);
      setLocalLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Card className={cn(
      "mb-4 overflow-hidden transition-all hover:shadow-md",
      post.is_pinned && "border-primary/30 bg-primary/5"
    )}>
      <CardHeader className="px-4 py-3 flex flex-row items-start gap-3 space-y-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`} alt="Avatar" />
          <AvatarFallback>{post.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.profiles?.full_name || 'Unknown User'}</span>
            {post.is_pinned && (
              <Pin className="h-4 w-4 text-primary rotate-45" />
            )}
            {post.user_level && (
              <Badge variant="outline" style={{ color: post.user_level.color }}>
                {post.user_level.icon} {post.user_level.level_name}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { 
              addSuffix: true,
              locale: es
            })}
          </p>
        </div>
        
        {category && (
          <Badge 
            variant="secondary" 
            className="ml-auto"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
          >
            {category.icon} {category.name}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="px-4 py-3">
        {post.title && (
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        )}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Media content would go here */}
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t flex items-center justify-between">
        <div className="flex gap-1 text-sm text-muted-foreground">
          <span>{localLikeCount} likes</span>
          <span>•</span>
          <span>{post.comment_count} comments</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLikeToggle}
            className={cn(liked && "text-red-500")}
          >
            <Heart className="h-4 w-4 mr-1" />
            Like
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onCommentClick?.(post.id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </Button>
          
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
