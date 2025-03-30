
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { UserRoleType } from "@/types/auth";
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, RefreshCw, UserPlus, Users } from 'lucide-react';

interface TestUser {
  fullName: string;
  email: string;
  password: string;
  role: UserRoleType;
}

const defaultTestUsers: TestUser[] = [
  {
    fullName: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    fullName: 'Carlos López',
    email: 'carlos.lopez@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    fullName: 'María García',
    email: 'maria.garcia@example.com',
    password: 'password123',
    role: 'instructor'
  },
  {
    fullName: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    fullName: 'Elena Fernández',
    email: 'elena.fernandez@example.com',
    password: 'password123',
    role: 'admin'
  }
];

const TestUsersGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [newUser, setNewUser] = useState<TestUser>({
    fullName: '',
    email: '',
    password: 'password123',
    role: 'student'
  });

  const generateTestUsers = async () => {
    setIsGenerating(true);
    setGeneratedCount(0);
    let successCount = 0;

    try {
      for (const user of defaultTestUsers) {
        try {
          // Primero creamos el usuario en Authentication
          const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true, // Auto-confirmar email para pruebas
            user_metadata: {
              full_name: user.fullName,
              role: user.role
            }
          });

          if (authError) {
            console.error('Error creando usuario auth:', authError);
            // Si el usuario ya existe, podemos intentar actualizar su rol
            if (authError.message.includes('already exists')) {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', user.email)
                .single();
              
              if (profileData) {
                await supabase
                  .from('profiles')
                  .update({ role: user.role })
                  .eq('id', profileData.id);
                
                successCount++;
                setGeneratedCount(successCount);
              }
            }
            continue;
          }

          // La función trigger ya debería haber creado el perfil automáticamente
          successCount++;
          setGeneratedCount(successCount);
        } catch (error) {
          console.error('Error en la generación de usuario:', error);
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} usuarios de prueba generados correctamente`);
      } else {
        toast.info('No se generó ningún usuario nuevo. Posiblemente ya existan todos.');
      }
    } catch (error) {
      console.error('Error general:', error);
      toast.error('Error al generar usuarios de prueba');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddCustomUser = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.password) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    setIsGenerating(true);
    try {
      // Crear el usuario en Authentication
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          full_name: newUser.fullName,
          role: newUser.role
        }
      });

      if (authError) {
        console.error('Error creando usuario personalizado:', authError);
        toast.error(`Error: ${authError.message}`);
        return;
      }

      // La función trigger ya debería crear el perfil
      toast.success(`Usuario ${newUser.fullName} creado correctamente`);
      
      // Resetear el formulario
      setNewUser({
        fullName: '',
        email: '',
        password: 'password123',
        role: 'student'
      });
    } catch (error) {
      console.error('Error general al crear usuario personalizado:', error);
      toast.error('Error al crear el usuario personalizado');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Generador de Usuarios de Prueba
          </CardTitle>
          <CardDescription>
            Crea rápidamente usuarios de prueba con diferentes roles para probar la aplicación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Usuarios predefinidos:</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                {defaultTestUsers.map((user, index) => (
                  <li key={index}>
                    <span className="font-medium">{user.fullName}</span> - {user.email} ({user.role})
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={generateTestUsers} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando ({generatedCount}/{defaultTestUsers.length})
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generar Usuarios Predefinidos
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Crear Usuario Personalizado
          </CardTitle>
          <CardDescription>
            Crea un nuevo usuario con datos personalizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input 
                  id="fullName" 
                  value={newUser.fullName} 
                  onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                  placeholder="María López" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newUser.email} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="usuario@ejemplo.com" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={newUser.password} 
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select 
                  defaultValue={newUser.role} 
                  onValueChange={(value: any) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddCustomUser} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Crear Usuario
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestUsersGenerator;
