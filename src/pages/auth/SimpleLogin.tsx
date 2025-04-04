
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const SimpleLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Importamos directamente de useAuth
  const auth = useAuth();
  console.log("SimpleLogin: Auth context state:", {
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    user: auth.user ? "exists" : "null"
  });
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SimpleLogin: Intento de login con:", email);
    
    // Activamos el estado de carga LOCAL para este componente
    setIsLoading(true);
    
    try {
      const result = await auth.login(email, password, false);
      console.log("SimpleLogin: Resultado login:", result);
      
      if (result.success) {
        toast.success("Login exitoso!");
        navigate('/app/dashboard');
      } else {
        toast.error("Error de login", {
          description: result.error || "Credenciales inválidas"
        });
      }
    } catch (err: any) {
      console.error("SimpleLogin: Error en login:", err);
      toast.error("Error de login", {
        description: err.message || "Error desconocido"
      });
    } finally {
      // Garantizamos que isLoading local se desactiva SIEMPRE
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login Simplificado</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Login'}
            </Button>
            
            <div className="text-sm text-center text-gray-500 mt-4">
              {auth.isLoading ? 'Cargando estado de autenticación...' : 
                auth.isAuthenticated ? 'Ya has iniciado sesión' : 'No has iniciado sesión'}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleLogin;
