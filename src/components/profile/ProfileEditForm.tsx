
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
import { UserProfile, UserRoleType } from '@/types/auth';
import { useProfileEdit } from '@/hooks/use-profile-edit';

// Define allowed roles to prevent the type error with the enum
const allowedRoles = [
  'admin', 'instructor', 'student', 'sistemas', 'anonimo', 'moderator', 
  'content_creator', 'guest', 'beta_tester'
] as const;

const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  role: z.enum(allowedRoles).default('student'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  profile: UserProfile | null;
  user_id: string | undefined;
  onSuccess: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, user_id, onSuccess }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      role: (profile?.role && allowedRoles.includes(profile.role as any)) 
        ? (profile.role as any) 
        : 'student',
    },
  });
  
  const profileMutation = useProfileEdit(user_id);

  const onSubmit = async (data: ProfileFormValues) => {
    profileMutation.mutate(
      { full_name: data.full_name },
      { onSuccess }
    );
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
                <Input 
                  placeholder="Introduce tu nombre completo" 
                  {...field}
                  disabled={profileMutation.isPending} 
                />
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
                  <SelectItem value="sistemas">Sistemas</SelectItem>
                  <SelectItem value="anonimo">Anónimo</SelectItem>
                  <SelectItem value="moderator">Moderador</SelectItem>
                  <SelectItem value="content_creator">Creador de Contenido</SelectItem>
                  <SelectItem value="guest">Invitado</SelectItem>
                  <SelectItem value="beta_tester">Beta Tester</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={profileMutation.isPending}
          >
            {profileMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
