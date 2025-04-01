
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { motion } from 'framer-motion';
import { AwardIcon, CalendarIcon, GraduationCap, Clock, FileCheck, Globe, HelpCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Scholarships: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-16 pb-24 bg-gradient-to-b from-primary/10 to-background relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <AwardIcon className="h-7 w-7 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold">Programa de Becas</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 md:text-2xl max-w-3xl">
                Impulsamos el talento y facilitamos el acceso a educación de calidad a través de nuestras becas y ayudas al estudio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg" variant="default">
                  <Link to="/scholarships/apply">
                    Solicitar beca
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="#scholarships-types">
                    Ver tipos de becas
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mt-8 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Estudiantes becados" 
                className="w-full h-auto object-cover rounded-xl aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-xl font-medium">Nuestra misión es eliminar las barreras económicas en el acceso a la educación</p>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 top-24 right-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 bottom-12 left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </section>
        
        {/* Main content */}
        <section className="py-16" id="scholarships-types">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Tipos de Becas Disponibles</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ofrecemos diversas modalidades de becas adaptadas a diferentes perfiles y necesidades.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Beca Talento",
                  icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
                  description: "Para estudiantes con alto rendimiento académico demostrable",
                  discount: "60%",
                  spots: 40,
                  remaining: 12,
                  deadline: "15 de Noviembre, 2023"
                },
                {
                  title: "Beca Digital",
                  icon: <GraduationCap className="h-10 w-10 text-sky-500" />,
                  description: "Especializada en programas de tecnología y transformación digital",
                  discount: "45%",
                  spots: 70,
                  remaining: 23,
                  deadline: "30 de Noviembre, 2023"
                },
                {
                  title: "Beca Internacional",
                  icon: <Globe className="h-10 w-10 text-emerald-500" />,
                  description: "Para estudiantes internacionales que buscan formación especializada",
                  discount: "50%",
                  spots: 25,
                  remaining: 8,
                  deadline: "10 de Diciembre, 2023"
                },
                {
                  title: "Beca Mujer en Tech",
                  icon: <FileCheck className="h-10 w-10 text-purple-500" />,
                  description: "Enfocada en impulsar la presencia femenina en carreras tecnológicas",
                  discount: "70%",
                  spots: 30,
                  remaining: 15,
                  deadline: "20 de Diciembre, 2023"
                },
                {
                  title: "Beca Emprendimiento",
                  icon: <Lightbulb className="h-10 w-10 text-orange-500" />,
                  description: "Para proyectos emprendedores con potencial de impacto",
                  discount: "55%",
                  spots: 20,
                  remaining: 7,
                  deadline: "5 de Enero, 2024"
                },
                {
                  title: "Beca Inclusión",
                  icon: <HelpCircle className="h-10 w-10 text-indigo-500" />,
                  description: "Diseñada para personas con diversidad funcional o en riesgo de exclusión",
                  discount: "80%",
                  spots: 15,
                  remaining: 9,
                  deadline: "15 de Enero, 2024"
                }
              ].map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {scholarship.icon}
                        </div>
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                          {scholarship.discount} descuento
                        </div>
                      </div>
                      <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{scholarship.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Plazas disponibles</span>
                            <span className="font-medium">{scholarship.remaining} de {scholarship.spots}</span>
                          </div>
                          <Progress value={(scholarship.remaining / scholarship.spots) * 100} className="h-2" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Fecha límite: {scholarship.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Resolución: 15-30 días</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Ver requisitos</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How to Apply */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Proceso de Solicitud</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seguir estos pasos te ayudará a completar tu solicitud de beca correctamente.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-8">
                  {[
                    { number: "01", title: "Registrarte en la plataforma", description: "Crea una cuenta gratuita y verifica tu dirección de correo electrónico" },
                    { number: "02", title: "Completa tu perfil", description: "Asegúrate de que tu información personal esté actualizada y sea precisa" },
                    { number: "03", title: "Elige el tipo de beca", description: "Selecciona la beca que mejor se adapte a tu perfil y necesidades actuales" },
                    { number: "04", title: "Adjunta documentación", description: "Sube los documentos requeridos que respalden tu solicitud" },
                    { number: "05", title: "Envía la solicitud", description: "Revisa toda la información y envía tu solicitud para evaluación" }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Estudiante completando solicitud" 
                  className="w-full h-full object-cover rounded-2xl aspect-[3/4] md:aspect-[4/3]"
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute top-4 right-4 bg-background p-4 rounded-xl shadow-lg max-w-xs"
                >
                  <p className="font-medium text-sm">
                    "La beca de Nexo Learning me permitió acceder a una formación que de otro modo no habría podido costear. Hoy trabajo en lo que me apasiona gracias a ello."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                    <div>
                      <p className="text-sm font-medium">Ana Martínez</p>
                      <p className="text-xs text-muted-foreground">Desarrolladora Web</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resolvemos tus dudas sobre el programa de becas y el proceso de solicitud.
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "¿Quién puede solicitar una beca?",
                    answer: "Nuestras becas están abiertas a estudiantes de todos los niveles educativos y profesionales que cumplan con los requisitos específicos de cada programa. No hay restricciones de edad ni nacionalidad para la mayoría de nuestras becas."
                  },
                  {
                    question: "¿Cuándo sabré si me han concedido la beca?",
                    answer: "El proceso de evaluación suele durar entre 15 y 30 días desde el cierre de la convocatoria. Te notificaremos por correo electrónico tanto si tu solicitud ha sido aceptada como si ha sido denegada."
                  },
                  {
                    question: "¿Puedo solicitar más de una beca a la vez?",
                    answer: "Puedes solicitar diferentes tipos de becas, pero solo podrás beneficiarte de una beca por programa formativo. Recomendamos que te centres en aquella que mejor se adapte a tu perfil para aumentar tus posibilidades."
                  },
                  {
                    question: "¿Qué documentación necesito presentar?",
                    answer: "La documentación requerida varía según el tipo de beca. Generalmente solicitamos: documento de identidad, CV actualizado, carta de motivación, certificado de estudios o títulos académicos y, en algunos casos, documentación económica."
                  },
                  {
                    question: "¿La beca cubre el 100% del curso?",
                    answer: "La mayoría de nuestras becas cubren entre el 40% y el 80% del coste total del programa, dependiendo del tipo de beca y tu situación particular. Algunas becas especiales pueden cubrir hasta el 100% en casos excepcionales."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <AccordionItem value={`item-${index}`} className="border rounded-lg p-2">
                      <AccordionTrigger className="text-left text-lg font-medium px-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-4 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-3xl">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para dar el siguiente paso?</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                No dejes que los obstáculos económicos te impidan alcanzar tus metas profesionales. Solicita tu beca hoy.
              </p>
              <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full">
                <Link to="/scholarships/apply">
                  Solicitar beca ahora
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Scholarships;
