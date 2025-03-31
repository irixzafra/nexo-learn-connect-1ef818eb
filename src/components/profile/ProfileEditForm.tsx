
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

const ProfileEditForm: React.FC = () => {
  const { user } = useAuth();
  
  // Este es un formulario básico, se puede expandir según se necesite
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name" 
                defaultValue={user?.user_metadata?.name || ''} 
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue={user?.email || ''} 
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input 
                id="username" 
                defaultValue={user?.user_metadata?.username || ''} 
                placeholder="Nombre de usuario"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Input 
                id="bio" 
                defaultValue={user?.user_metadata?.bio || ''} 
                placeholder="Cuéntanos sobre ti"
              />
            </div>
          </div>
          
          <Button type="submit">Guardar Cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
