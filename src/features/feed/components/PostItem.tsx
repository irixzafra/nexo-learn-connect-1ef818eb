
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/types/community';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count);
  
  const isPostOwner = user?.id === post.user_id;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { 
    addSuffix: true, 
    locale: es 
  });
  
  const handleLike = () => {
    // Toggle like state
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
    
    // In a real app, you would call an API to like/unlike the post
    toast.success(liked ? 'Post unliked' : 'Post liked');
  };
  
  const handleReportPost = () => {
    toast.success('Post reported');
  };
  
  const handleDeletePost = () => {
    // In a real app, you would call an API to delete the post
    toast.success('Post deleted');
  };

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row space-y-0 items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`} alt="Avatar" />
          <AvatarFallback>{post.profiles?.full_name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{post.profiles?.full_name || 'Usuario'}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                {timeAgo}
                {post.category && (
                  <>
                    <span className="mx-1">•</span>
                    <Badge variant="outline" className="text-[10px] py-0 h-4 px-1.5">
                      {post.category}
                    </Badge>
                  </>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isPostOwner ? (
                  <>
                    <DropdownMenuItem>Editar publicación</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleDeletePost}>
                      Eliminar publicación
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleReportPost}>Reportar publicación</DropdownMenuItem>
                    <DropdownMenuItem>Ocultar publicación</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-2">
        {post.title && <h3 className="font-semibold text-lg mb-2">{post.title}</h3>}
        <div 
          className="whitespace-pre-wrap overflow-hidden"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t flex justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-muted-foreground flex items-center gap-1",
              liked && "text-red-500"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            <span>{likeCount > 0 ? likeCount : ''}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comment_count > 0 ? post.comment_count : ''}</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <Share2 className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Compartir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
