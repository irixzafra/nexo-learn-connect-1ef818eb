
import React from "react";
import PublicLayout from "@/layouts/PublicLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen, Calendar, ArrowRight, Globe, Users, Target, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Scholarships: React.FC = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <svg className="absolute left-[calc(50%-30rem)] top-[calc(50%-30rem)] transform-gpu blur-3xl" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
              <defs>
                <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9089FC" />
                  <stop offset="1" stopColor="#4878f0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 mb-6">
                <GraduationCap className="h-5 w-5" />
                <span className="font-medium">Programa de Becas 2023</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Impulsamos tu talento creativo
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Descubre nuestras oportunidades de becas diseñadas para democratizar el acceso al conocimiento y potenciar el desarrollo de nuevos talentos.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="group shadow-md" asChild>
                  <a href="#scholarships">
                    Ver becas disponibles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <a href="#application">Solicitar beca</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-4xl font-bold text-blue-600 mb-2">350+</h3>
                <p className="text-muted-foreground">Becas otorgadas</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">85%</h3>
                <p className="text-muted-foreground">Tasa de finalización</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <h3 className="text-4xl font-bold text-purple-600 mb-2">25</h3>
                <p className="text-muted-foreground">Países participantes</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-4xl font-bold text-pink-600 mb-2">€500K</h3>
                <p className="text-muted-foreground">Fondos destinados</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Scholarships Section */}
        <section id="scholarships" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">Becas Disponibles</h2>
              <p className="text-lg text-muted-foreground">
                Ofrecemos diferentes programas adaptados a distintos perfiles y necesidades.
                Encuentra la beca que mejor se ajuste a tus objetivos profesionales.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Scholarship Card 1 */}
              <motion.div variants={item}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    100% Financiada
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>Beca de Excelencia Académica</CardTitle>
                    </div>
                    <CardDescription>
                      Programa de Becas 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Fecha límite:</p>
                          <p className="text-sm text-muted-foreground">30 de Junio, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Descripción:</p>
                          <p className="text-sm text-muted-foreground">
                            Beca completa para estudiantes con excelente rendimiento académico en programas de desarrollo web y programación.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Requisitos:</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                            <li>Expediente académico destacado</li>
                            <li>Carta de motivación</li>
                            <li>Proyecto de portfolio</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group" asChild>
                      <a href="#application">
                        Solicitar ahora
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              {/* Scholarship Card 2 */}
              <motion.div variants={item}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    75% Financiada
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        <Award className="h-6 w-6 text-indigo-600" />
                      </div>
                      <CardTitle>Beca para Nuevos Talentos</CardTitle>
                    </div>
                    <CardDescription>
                      Programa de Becas 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Fecha límite:</p>
                          <p className="text-sm text-muted-foreground">15 de Julio, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Descripción:</p>
                          <p className="text-sm text-muted-foreground">
                            Programa dirigido a jóvenes talentos que buscan formarse en el ámbito de la tecnología y desarrollo de software.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Requisitos:</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                            <li>Menos de 25 años</li>
                            <li>Proyecto personal</li>
                            <li>Entrevista personal</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group" asChild>
                      <a href="#application">
                        Solicitar ahora
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              {/* Scholarship Card 3 */}
              <motion.div variants={item}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                    50% Financiada
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle>Beca de Diversidad en Tech</CardTitle>
                    </div>
                    <CardDescription>
                      Programa de Becas 2023
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Fecha límite:</p>
                          <p className="text-sm text-muted-foreground">30 de Julio, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Descripción:</p>
                          <p className="text-sm text-muted-foreground">
                            Programa dirigido a promover la diversidad en el mundo tecnológico, ofreciendo oportunidades de formación en desarrollo de software.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Requisitos:</p>
                          <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                            <li>Grupos subrepresentados en tech</li>
                            <li>Carta de motivación</li>
                            <li>Evaluación de competencias</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full group" asChild>
                      <a href="#application">
                        Solicitar ahora
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">Beneficios exclusivos</h2>
              <p className="text-lg text-muted-foreground">
                Nuestros becarios obtienen acceso a una serie de ventajas y recursos adicionales
                que potencian su experiencia de aprendizaje y desarrollo profesional.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-1">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <img 
                      src="/lovable-uploads/69a3f68a-63d6-4fa4-a8aa-9cd3023f201a.png" 
                      alt="Beneficios para becarios" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mentoría Personalizada</h3>
                    <p className="text-muted-foreground">
                      Asignación de un mentor experto en la industria que te guiará durante todo el programa, 
                      proporcionando retroalimentación y consejos personalizados.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Networking Privilegiado</h3>
                    <p className="text-muted-foreground">
                      Acceso a eventos exclusivos con líderes de la industria, oportunidades de conexión 
                      con empresas asociadas y una red global de talento.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Recursos Premium</h3>
                    <p className="text-muted-foreground">
                      Herramientas y recursos exclusivos, acceso a bibliotecas de contenido avanzado 
                      y software especializado para complementar tu formación.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-pink-100 p-3 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certificación Reconocida</h3>
                    <p className="text-muted-foreground">
                      Al finalizar tu formación, recibirás una certificación especial que acredita 
                      tu participación en el programa de becas, valorada por empresas del sector.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Application Section */}
        <section id="application" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">¿Quieres solicitar una beca?</h2>
              <p className="text-xl mb-10 text-white/80">
                Completa el formulario de solicitud y nuestro equipo se pondrá en contacto contigo para ofrecerte más información y guiarte en el proceso.
              </p>
              <Button size="lg" variant="secondary" className="text-blue-600 font-medium" asChild>
                <Link to="/contact">
                  Solicitar información
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
