
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCreatePost, usePostCategories } from '../hooks/useCommunityFeed';
import { ImagePlus, Send, ChevronDown } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

interface FormValues {
  title?: string;
  content: string;
  category_id?: string;
}

export const EnhancedCreatePostForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createPost } = useCreatePost();
  const { data: categories = [] } = usePostCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [richTextContent, setRichTextContent] = useState('');

  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      category_id: 'general',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: 'Se requiere autenticación',
        description: 'Debes iniciar sesión para crear una publicación',
        variant: 'destructive',
      });
      return;
    }

    // Use rich text content instead of plain text
    values.content = richTextContent;

    if (!values.content.trim()) {
      toast({
        title: 'Contenido requerido',
        description: 'Por favor escribe algo para publicar',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createPost({
        user_id: user.id,
        title: values.title || undefined,
        content: values.content,
        category_id: values.category_id,
      });

      form.reset();
      setRichTextContent('');
      setIsDialogOpen(false);
      
      toast({
        title: 'Publicación creada',
        description: 'Tu publicación ha sido creada exitosamente',
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error al crear publicación',
        description: 'No se pudo crear la publicación. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected category information
  const selectedCategory = categories.find(cat => cat.id === form.watch('category_id'));

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
              <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="h-12 rounded-full w-full justify-start text-muted-foreground font-normal px-5"
              >
                ¿Qué quieres compartir?
              </Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>
      
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Crear nueva publicación</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
            <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <span className="font-medium">{user?.user_metadata?.full_name || 'Usuario'}</span>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>publicando en</span>
              <Select 
                value={form.watch('category_id')} 
                onValueChange={(value) => form.setValue('category_id', value)}
              >
                <SelectTrigger className="border-none h-auto p-0 pl-1 shadow-none">
                  <SelectValue placeholder="Selecciona una categoría">
                    <span className="font-medium text-primary">{selectedCategory?.name || 'General'}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon && <span className="mr-2">{category.icon}</span>}
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Título (opcional)" 
                      className="text-lg font-medium border-none shadow-none px-0 focus-visible:ring-0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              rules={{ required: 'El contenido es obligatorio' }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor 
                      value={richTextContent}
                      onChange={setRichTextContent}
                      placeholder="¿Qué quieres compartir?"
                      minHeight="250px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between items-center pt-4">
              <Button type="button" variant="outline" size="icon">
                <ImagePlus className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !richTextContent.trim()}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
