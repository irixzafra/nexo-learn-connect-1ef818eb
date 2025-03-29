
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

const Scholarships: React.FC = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Becas y Ayudas
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            En Nexo estamos comprometidos en hacer la educación accesible para todos
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-6">Programa de Becas Nexo</h2>
            <p className="text-muted-foreground mb-4">
              Nuestro programa de becas está diseñado para apoyar a estudiantes talentosos que 
              enfrentan barreras financieras para acceder a educación de calidad.
            </p>
            <p className="text-muted-foreground mb-6">
              Ofrecemos becas que cubren desde el 25% hasta el 100% del costo de nuestros cursos,
              dependiendo de la situación individual de cada estudiante y su potencial.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Becas por Mérito Académico</h3>
                  <p className="text-sm text-muted-foreground">Para estudiantes con excelente rendimiento académico.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Becas por Necesidad Económica</h3>
                  <p className="text-sm text-muted-foreground">Ayuda financiera basada en la situación económica del solicitante.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Becas para Grupos Subrepresentados</h3>
                  <p className="text-sm text-muted-foreground">Apoyo especial para incrementar la diversidad en tecnología y creatividad.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
              <Card className="relative bg-card border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="h-8 w-8 text-primary" />
                    <CardTitle>Solicita tu Beca</CardTitle>
                  </div>
                  <CardDescription>
                    Completa este formulario para iniciar tu solicitud de beca
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nombre completo
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Correo electrónico
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full p-2 rounded-md border border-input bg-background"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="scholarship-type" className="text-sm font-medium">
                          Tipo de beca
                        </label>
                        <select
                          id="scholarship-type"
                          className="w-full p-2 rounded-md border border-input bg-background"
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="merit">Mérito Académico</option>
                          <option value="financial">Necesidad Económica</option>
                          <option value="diversity">Grupos Subrepresentados</option>
                        </select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar Solicitud
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-accent rounded-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6">Otras Opciones de Financiación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Plan de Pago Flexible</h3>
              <p className="text-muted-foreground mb-4">Divide el costo de tu curso en pagos mensuales sin intereses.</p>
              <Button variant="outline" size="sm">Más Información</Button>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Descuentos Grupales</h3>
              <p className="text-muted-foreground mb-4">Inscríbete con amigos o colegas y obtén descuentos especiales.</p>
              <Button variant="outline" size="sm">Más Información</Button>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Financiación Empresarial</h3>
              <p className="text-muted-foreground mb-4">Opciones especiales para empresas que quieren formar a sus empleados.</p>
              <Button variant="outline" size="sm">Más Información</Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cuáles son los requisitos para solicitar una beca?</AccordionTrigger>
              <AccordionContent>
                Los requisitos varían según el tipo de beca. En general, valoramos la motivación, potencial y situación personal.
                Para becas académicas, consideramos tu historial educativo. Para becas económicas, evaluamos tu situación financiera.
                Te recomendamos completar la solicitud con toda la información relevante para aumentar tus posibilidades.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cuándo sabré si me han concedido la beca?</AccordionTrigger>
              <AccordionContent>
                El proceso de evaluación normalmente toma entre 2-3 semanas. Te notificaremos por correo electrónico
                sobre el resultado de tu solicitud. Si tienes alguna pregunta durante el proceso, no dudes en contactar
                con nuestro equipo de becas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Puedo solicitar una beca para cualquier curso?</AccordionTrigger>
              <AccordionContent>
                Sí, nuestro programa de becas aplica a todos los cursos disponibles en la plataforma.
                Sin embargo, algunas becas especiales pueden estar dirigidas a programas específicos.
                Te recomendamos revisar los detalles de cada beca antes de solicitarla.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Qué pasa si recibo una beca parcial y no puedo pagar el resto?</AccordionTrigger>
              <AccordionContent>
                Si recibes una beca parcial, también puedes aplicar a nuestros planes de pago flexible para dividir
                el costo restante en pagos mensuales sin intereses. Nuestro objetivo es encontrar una solución que
                funcione para ti, así que no dudes en contactarnos para discutir tus opciones.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div 
          className="text-center py-10 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">¿Tienes Más Preguntas?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nuestro equipo está disponible para ayudarte con cualquier duda sobre nuestro programa de becas y ayudas financieras.
          </p>
          <Button size="lg">Contactar con el Equipo de Becas</Button>
        </motion.div>
      </div>
    </PublicLayout>
  );
};

export default Scholarships;
