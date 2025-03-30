
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { RichTextEditor } from './RichTextEditor';
import { useCreatePost, usePostCategories } from '../hooks/useCommunityFeed';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Smile, Image, AtSign } from 'lucide-react';

export const EnhancedCreatePostForm: React.FC = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createPost } = useCreatePost();
  const queryClient = useQueryClient();
  const { data: categories = [] } = usePostCategories();

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await createPost({
        user_id: user.id,
        content,
        category_id: categoryId,
      });
      
      setContent('');
      setCategoryId(null);
      
      // Invalidate the query to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['communityFeed'] });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-6 text-center">
          <p>Inicia sesión para publicar en la comunidad</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3 pt-4 px-4 flex flex-row space-y-0 gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Avatar" />
          <AvatarFallback>{user.email?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</p>
          <Select value={categoryId || ''} onValueChange={(value) => setCategoryId(value || null)}>
            <SelectTrigger className="h-7 text-xs px-2 my-1 w-[140px] border-muted bg-muted/30">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 px-4">
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="¿Qué quieres compartir?"
          minHeight="150px"
        />
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0 px-4 pb-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Image className="h-4 w-4 mr-1" />
            Imagen
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Smile className="h-4 w-4 mr-1" />
            Emoji
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <AtSign className="h-4 w-4 mr-1" />
            Mencionar
          </Button>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!content.trim() || isSubmitting}
          size="sm"
        >
          Publicar
        </Button>
      </CardFooter>
    </Card>
  );
};
