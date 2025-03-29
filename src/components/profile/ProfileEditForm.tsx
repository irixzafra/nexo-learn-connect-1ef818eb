
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UserProfile } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  profile: UserProfile | null;
  onSuccess: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!profile?.id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo identificar el perfil de usuario.",
        });
        return;
      }
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: data.full_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);
      
      if (error) {
        console.error('Error al actualizar el perfil:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.",
        });
        return;
      }
      
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente.",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error en el envío del formulario:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar el perfil.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Introduce tu nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
