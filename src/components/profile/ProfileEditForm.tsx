
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UserProfile, UserRole } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  role: z.enum(['admin', 'instructor', 'student']).default('student'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  profile: UserProfile | null;
  user_id: string | undefined;
  onSuccess: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, user_id, onSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      role: profile?.role || 'student',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!user_id) {
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
          role: data.role,
          updated_at: new Date().toISOString()
        })
        .eq('id', user_id);
      
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
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select 
                defaultValue={field.value} 
                onValueChange={field.onChange}
                disabled={true}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Estudiante</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
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
