
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useProfileEdit } from '@/hooks/use-profile-edit';

export const ProfileStep: React.FC = () => {
  const { user, profile } = useAuth();
  const initialName = user?.user_metadata?.full_name || profile?.full_name || '';
  const profileMutation = useProfileEdit(user?.id);
  
  const [name, setName] = useState(initialName);
  
  const handleSave = () => {
    if (name.trim()) {
      profileMutation.mutate(
        { full_name: name },
        {
          onSuccess: () => {
            toast.success('Perfil actualizado correctamente');
          },
        }
      );
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      role="region"
      aria-label="Completar perfil"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto"
        >
          <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
            <AvatarImage src={profile?.avatar_url || ''} alt={initialName || 'Foto de perfil'} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary" aria-label="Iniciales del perfil">
              {getInitials(initialName)}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <motion.h2 
          className="mt-4 text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Personaliza tu perfil
        </motion.h2>
        
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Completa tu información para que la comunidad pueda conocerte mejor
        </motion.p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form 
            className="space-y-4" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            aria-label="Formulario de perfil"
          >
            <div className="space-y-2">
              <Label htmlFor="fullName" id="fullName-label">Nombre completo</Label>
              <Input
                id="fullName"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-labelledby="fullName-label"
                aria-required="true"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" id="email-label">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-muted/50"
                aria-labelledby="email-label"
                aria-readonly="true"
              />
              <p className="text-xs text-muted-foreground" id="email-description">Tu correo electrónico no puede ser modificado</p>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit"
                variant="outline"
                className="w-full focus-visible:ring-2 focus-visible:ring-primary"
                disabled={profileMutation.isPending}
                aria-busy={profileMutation.isPending}
              >
                {profileMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileStep;
