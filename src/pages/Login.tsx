
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { useLogin } from '@/hooks/use-login';
import PublicLayout from '@/layouts/PublicLayout';
import { Loader2, Mail, LockKeyhole } from 'lucide-react';

const Login: React.FC = () => {
  const { login, isLoading } = useLogin();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };
  
  return (
    <PublicLayout hideNav={false} hideFooter={false}>
      <div className="min-h-[calc(100vh-170px)] flex flex-col md:flex-row">
        {/* Sección de Bienvenida / Imagen */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-center items-center p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-blue-300"></div>
            <div className="absolute top-40 right-40 w-16 h-16 rounded-full bg-blue-200"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-blue-400"></div>
          </div>
          
          <div className="z-10 max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">Bienvenido a Nexo</h1>
            <p className="text-xl mb-8">
              El ecosistema creativo y tecnológico para tu formación profesional
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg">Cursos especializados en creatividad y tecnología</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg">Comunidad activa de profesionales</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg">Becas y ayudas para potenciar tu talento</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sección del Formulario */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-4 py-10 md:p-12 bg-slate-50/50">
          <Card className="w-full max-w-md border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center text-base">
                Ingresa tus credenciales para acceder a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      <input type="checkbox" id="remember" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                      <label htmlFor="remember" className="text-sm text-gray-600">Recordarme</label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-md" 
                    disabled={isLoading}
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
                <p className="text-base text-muted-foreground">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                    Regístrate
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
