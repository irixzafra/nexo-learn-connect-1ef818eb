
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth';
import { Loader2, Mail, LockKeyhole } from 'lucide-react';
import { toast } from 'sonner';
import AuthLayout from '@/layouts/AuthLayout';

// Esquema de validación
const loginSchema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { user, session, isLoading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  
  React.useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && session) {
      console.log("Usuario ya autenticado, redirigiendo a dashboard");
      navigate('/app/dashboard', { replace: true });
    }
  }, [user, session, navigate]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Intentando iniciar sesión con:", data.email);
      
      // Primero intentamos con la autenticación real
      await login(data.email, data.password);
      
      // Si llegamos hasta aquí, el inicio de sesión fue exitoso
      toast.success('Inicio de sesión exitoso');
      
      // Redirigimos al dashboard inmediatamente después del login exitoso
      navigate('/app/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      
      // Si falla la autenticación real, mostramos el error
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo',
      });
      
      // Como estamos en desarrollo, podemos intentar con un mock
      try {
        const { mockSignIn } = await import('@/lib/supabase');
        const result = await mockSignIn(data.email, data.password);
        
        if (!result.error) {
          toast.success('Inicio de sesión simulado exitoso (modo desarrollo)');
          navigate('/app/dashboard', { replace: true });
        }
      } catch (mockError) {
        console.log('No se pudo usar autenticación simulada');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Introduce tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base">Correo Electrónico</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder="usuario@ejemplo.com" 
                          autoComplete="email" 
                          className="pl-10 py-6 text-base"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-base">Contraseña</FormLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          placeholder="••••••••" 
                          autoComplete="current-password" 
                          className="pl-10 py-6 text-base"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded border-gray-300 text-primary" 
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">Recordarme</label>
                </div>
                <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6 text-base" 
                disabled={isLoading || authLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link to="/auth/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;
