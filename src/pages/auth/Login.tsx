
import React, { useState, useEffect } from 'react';
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
import { Toaster } from '@/components/ui/sonner';
import { Checkbox } from '@/components/ui/checkbox';

// Esquema de validación
const loginSchema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  remember: z.boolean().optional().default(false)
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { user, session, isLoading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  console.log("Login component rendered, auth state:", { user, session, authLoading });
  
  useEffect(() => {
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
      remember: false
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    console.log('****** ONSUBMIT DISPARADO ******'); // <-- AÑADIR ESTO
    console.log("Intentando iniciar sesión con:", data);
    setIsLoading(true);
    
    try {
      const result = await login(data.email, data.password, data.remember);
      console.log("Resultado del login:", result);
      
      if (result.success) {
        toast.success('Inicio de sesión exitoso');
        navigate('/app/dashboard', { replace: true });
      } else {
        console.error("Error en login:", result.error);
        toast.error('Error al iniciar sesión', {
          description: result.error || 'Verifica tus credenciales e intenta de nuevo',
        });
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo',
      });
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
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="remember"
                        />
                      </FormControl>
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600 cursor-pointer"
                      >
                        Recordarme
                      </label>
                    </FormItem>
                  )}
                />
                
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
      <Toaster />
    </AuthLayout>
  );
};

export default Login;
