
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor introduce un correo electrónico válido.",
  }),
  subject: z.string().min(2, {
    message: "Por favor selecciona un asunto.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
});

const ContactPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Mensaje enviado", {
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl font-bold mb-4">Contacta con Nosotros</h1>
              <p className="text-xl text-muted-foreground">
                Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros para cualquier consulta.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Dirección</h3>
                      <p className="text-muted-foreground">
                        Calle Principal 123<br />
                        28001 Madrid, España
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Teléfono</h3>
                      <p className="text-muted-foreground">+34 91 123 45 67</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">info@nexo.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Horario de Atención</h3>
                      <p className="text-muted-foreground">
                        Lunes - Viernes: 9:00 - 18:00<br />
                        Sábados: 10:00 - 14:00
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="mt-8 bg-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Mapa interactivo</p>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Envíanos un Mensaje</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="tu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asunto</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un asunto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="info">Información general</SelectItem>
                              <SelectItem value="courses">Información sobre cursos</SelectItem>
                              <SelectItem value="support">Soporte técnico</SelectItem>
                              <SelectItem value="billing">Facturación</SelectItem>
                              <SelectItem value="partnership">Colaboraciones</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="¿En qué podemos ayudarte?" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar mensaje
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default ContactPage;
