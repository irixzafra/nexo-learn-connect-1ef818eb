
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
import { Loader2, Mail, LockKeyhole, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <PublicLayout hideNavigation={false} hideFooter={false}>
      <div className="min-h-[calc(100vh-170px)] flex flex-col md:flex-row">
        {/* Sección de Bienvenida / Imagen - Lado izquierdo */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white flex-col justify-center items-center p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10">
            {/* Animación de fondo con formas y líneas */}
            <svg 
              width="100%" 
              height="100%" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern 
                  id="dot-pattern" 
                  x="0" 
                  y="0" 
                  width="30" 
                  height="30" 
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
          </div>
          
          {/* Elementos decorativos */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-blue-300/20 blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div 
            className="absolute top-40 right-40 w-20 h-20 rounded-full bg-indigo-200/20 blur-lg"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Contenido principal */}
          <motion.div
            className="z-10 max-w-md text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              variants={itemVariants}
            >
              Bienvenido a{' '}
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Nexo
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-10 text-blue-100 leading-relaxed"
              variants={itemVariants}
            >
              El ecosistema creativo y tecnológico para tu formación profesional
            </motion.p>

            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center text-left"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-lg">Cursos especializados en creatividad y tecnología</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-left"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-lg">Comunidad activa de profesionales</p>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-left"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <p className="text-lg">Becas y ayudas para potenciar tu talento</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Sección del Formulario - Lado derecho */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-4 py-10 md:p-12 bg-gradient-to-b from-slate-50 to-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="space-y-2 pb-6">
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
                                className="pl-10 py-6 text-base shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                                className="pl-10 py-6 text-base shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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
                          className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/25 focus:ring-opacity-50" 
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">Recordarme</label>
                      </div>
                      <a href="#" className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg" 
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
                    </motion.div>
                  </form>
                </Form>
                
                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-base text-muted-foreground">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/auth/register" className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors">
                      Regístrate
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
