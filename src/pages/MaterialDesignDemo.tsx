
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MaterialButton } from "@/components/ui/material-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Moon, 
  Sun, 
  Box, 
  Palette, 
  Type, 
  Layout, 
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Check,
  X
} from "lucide-react";

const MaterialDesignDemo: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMaterialMode, setIsMaterialMode] = useState(true);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    document.documentElement.classList.toggle('dark', newMode);
  };
  
  const toggleMaterialMode = () => {
    const newMode = !isMaterialMode;
    setIsMaterialMode(newMode);
    
    document.documentElement.classList.toggle('material', newMode);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold">Material Design 3</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleDarkMode} 
              className={isMaterialMode ? "md-switch" : ""}
            />
            <Moon className="h-4 w-4" />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Estándar</span>
            <Switch 
              checked={isMaterialMode} 
              onCheckedChange={toggleMaterialMode} 
              className={isMaterialMode ? "md-switch" : ""}
            />
            <span className="text-sm">Material</span>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Explora el sistema de diseño Material 3 de Google implementado con Tailwind CSS y shadcn/ui.
        Este sistema sigue las directrices oficiales de Material Design 3 para crear una interfaz moderna y consistente.
      </p>
      
      <Tabs defaultValue="buttons" className="space-y-8">
        <TabsList className="flex overflow-auto mb-4">
          <TabsTrigger value="buttons" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            Botones
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Tipografía
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colores
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Componentes
          </TabsTrigger>
          <TabsTrigger value="animations" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Animaciones
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buttons" className="space-y-6">
          <Card className={isMaterialMode ? "md-card" : ""}>
            <CardHeader>
              <CardTitle>Botones Material Design 3</CardTitle>
              <CardDescription>
                Versiones de botones siguiendo las directrices de Material Design 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Variantes de Botones</h3>
                <div className="flex flex-wrap gap-4">
                  <MaterialButton variant="filled">
                    Filled
                  </MaterialButton>
                  <MaterialButton variant="tonal">
                    Tonal
                  </MaterialButton>
                  <MaterialButton variant="outlinedMaterial">
                    Outlined
                  </MaterialButton>
                  <MaterialButton variant="text">
                    Text
                  </MaterialButton>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Con Iconos</h3>
                <div className="flex flex-wrap gap-4">
                  <MaterialButton variant="filled">
                    <Check className="mr-2 h-4 w-4" />
                    Aceptar
                  </MaterialButton>
                  <MaterialButton variant="outlinedMaterial">
                    <X className="mr-2 h-4 w-4" />
                    Cancelar
                  </MaterialButton>
                  <MaterialButton variant="tonal">
                    Siguiente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </MaterialButton>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Con Efecto Ripple</h3>
                <div className="flex flex-wrap gap-4">
                  <MaterialButton variant="filled" ripple>
                    Con Ripple
                  </MaterialButton>
                  <MaterialButton variant="tonal" ripple>
                    Con Ripple
                  </MaterialButton>
                  <MaterialButton variant="outlinedMaterial" ripple>
                    Con Ripple
                  </MaterialButton>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Elevación</h3>
                <div className="flex flex-wrap gap-4">
                  <MaterialButton variant="filled" elevation="none">
                    Sin Elevación
                  </MaterialButton>
                  <MaterialButton variant="filled" elevation="low">
                    Elevación Baja
                  </MaterialButton>
                  <MaterialButton variant="filled" elevation="medium">
                    Elevación Media
                  </MaterialButton>
                  <MaterialButton variant="filled" elevation="high">
                    Elevación Alta
                  </MaterialButton>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Interacciones</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className={isMaterialMode ? "md-hover-scale" : ""}>
                    Escala en Hover
                  </Button>
                  <Button className={isMaterialMode ? "md-hover-elevate" : ""}>
                    Elevación en Hover
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="typography" className="space-y-6">
          <Card className={isMaterialMode ? "md-card" : ""}>
            <CardHeader>
              <CardTitle>Tipografía Material Design 3</CardTitle>
              <CardDescription>
                Sistema tipográfico según las directrices de Material Design 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isMaterialMode ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="md-headline-large">Headline Large</h2>
                    <p className="text-xs text-muted-foreground">md-headline-large</p>
                  </div>
                  <div>
                    <h2 className="md-headline-medium">Headline Medium</h2>
                    <p className="text-xs text-muted-foreground">md-headline-medium</p>
                  </div>
                  <div>
                    <h2 className="md-headline-small">Headline Small</h2>
                    <p className="text-xs text-muted-foreground">md-headline-small</p>
                  </div>
                  <div>
                    <h3 className="md-title-large">Title Large</h3>
                    <p className="text-xs text-muted-foreground">md-title-large</p>
                  </div>
                  <div>
                    <h3 className="md-title-medium">Title Medium</h3>
                    <p className="text-xs text-muted-foreground">md-title-medium</p>
                  </div>
                  <div>
                    <h3 className="md-title-small">Title Small</h3>
                    <p className="text-xs text-muted-foreground">md-title-small</p>
                  </div>
                  <div>
                    <p className="md-body-large">Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie.</p>
                    <p className="text-xs text-muted-foreground">md-body-large</p>
                  </div>
                  <div>
                    <p className="md-body-medium">Body Medium - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie.</p>
                    <p className="text-xs text-muted-foreground">md-body-medium</p>
                  </div>
                  <div>
                    <p className="md-body-small">Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie.</p>
                    <p className="text-xs text-muted-foreground">md-body-small</p>
                  </div>
                  <div>
                    <span className="md-label-large">Label Large</span>
                    <p className="text-xs text-muted-foreground">md-label-large</p>
                  </div>
                  <div>
                    <span className="md-label-medium">Label Medium</span>
                    <p className="text-xs text-muted-foreground">md-label-medium</p>
                  </div>
                  <div>
                    <span className="md-label-small">Label Small</span>
                    <p className="text-xs text-muted-foreground">md-label-small</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Activa el modo Material para ver los estilos tipográficos de Material Design 3.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-6">
          <Card className={isMaterialMode ? "md-card" : ""}>
            <CardHeader>
              <CardTitle>Paleta de Colores Material Design 3</CardTitle>
              <CardDescription>
                Sistema de colores según las directrices de Material Design 3
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className={isMaterialMode ? "md-title-medium mb-3" : "text-sm font-medium mb-3"}>Colores Primarios</h3>
                  <div className="space-y-2">
                    <div className="h-12 w-full bg-primary rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-primary/80 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Primary (80%)</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-primary/40 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Primary (40%)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className={isMaterialMode ? "md-title-medium mb-3" : "text-sm font-medium mb-3"}>Colores Secundarios</h3>
                  <div className="space-y-2">
                    <div className="h-12 w-full bg-secondary rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Secondary</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-secondary/80 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Secondary (80%)</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-secondary/40 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Secondary (40%)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className={isMaterialMode ? "md-title-medium mb-3" : "text-sm font-medium mb-3"}>Colores de Acento</h3>
                  <div className="space-y-2">
                    <div className="h-12 w-full bg-accent rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Accent</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-accent/80 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Accent (80%)</p>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="h-12 w-full bg-accent/40 rounded-md"></div>
                    <p className="text-xs text-muted-foreground">Accent (40%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-6">
          <Card className={isMaterialMode ? "md-card" : ""}>
            <CardHeader>
              <CardTitle>Componentes Material Design 3</CardTitle>
              <CardDescription>
                Implementación de componentes según Material Design 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Tarjetas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={isMaterialMode ? "md-card" : ""}>
                    <CardContent className="p-4">
                      <h3 className={isMaterialMode ? "md-title-small" : "text-base font-medium"}>
                        Tarjeta Estándar
                      </h3>
                      <p className={isMaterialMode ? "md-body-small mt-2" : "text-sm mt-2 text-muted-foreground"}>
                        Una tarjeta simple sin elevación.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className={isMaterialMode ? "md-card-elevated" : "shadow"}>
                    <CardContent className="p-4">
                      <h3 className={isMaterialMode ? "md-title-small" : "text-base font-medium"}>
                        Tarjeta Elevada
                      </h3>
                      <p className={isMaterialMode ? "md-body-small mt-2" : "text-sm mt-2 text-muted-foreground"}>
                        Una tarjeta con elevación y sombra.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className={isMaterialMode ? "md-card-outlined" : "border"}>
                    <CardContent className="p-4">
                      <h3 className={isMaterialMode ? "md-title-small" : "text-base font-medium"}>
                        Tarjeta con Borde
                      </h3>
                      <p className={isMaterialMode ? "md-body-small mt-2" : "text-sm mt-2 text-muted-foreground"}>
                        Una tarjeta con borde sin elevación.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Campos de Entrada</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={isMaterialMode ? "md-label-medium" : ""}>
                      Nombre
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Ingresa tu nombre" 
                      className={isMaterialMode ? "transition-all focus:border-primary/80 focus:ring-primary/40" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className={isMaterialMode ? "md-label-medium" : ""}>
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ejemplo@correo.com" 
                      className={isMaterialMode ? "transition-all focus:border-primary/80 focus:ring-primary/40" : ""}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className={isMaterialMode ? "md-title-medium" : "text-sm font-medium"}>Switch</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="material-switch" 
                    className={isMaterialMode ? "md-switch" : ""}
                  />
                  <Label htmlFor="material-switch" className={isMaterialMode ? "md-body-medium" : ""}>
                    Interruptor Material Design
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="animations" className="space-y-6">
          <Card className={isMaterialMode ? "md-card" : ""}>
            <CardHeader>
              <CardTitle>Animaciones Material Design 3</CardTitle>
              <CardDescription>
                Efectos y animaciones según Material Design 3
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {isMaterialMode ? (
                <>
                  <div className="space-y-4">
                    <h3 className="md-title-medium">Efectos Hover</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="md-hover-scale p-4 cursor-pointer">
                        <p className="md-body-medium">Hover Scale</p>
                        <p className="md-body-small text-muted-foreground">Hover para ver el efecto de escala</p>
                      </Card>
                      
                      <Card className="md-hover-elevate p-4 cursor-pointer">
                        <p className="md-body-medium">Hover Elevate</p>
                        <p className="md-body-small text-muted-foreground">Hover para ver el efecto de elevación</p>
                      </Card>
                      
                      <Card className="p-4 cursor-pointer">
                        <p className="md-body-medium">Estado Hover</p>
                        <Button variant="filled" className="mt-2 md-state-hover">Hover State</Button>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="md-title-medium">Animaciones Continuas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="md-animate-pulse p-4">
                        <p className="md-body-medium">Pulse Animation</p>
                        <p className="md-body-small text-muted-foreground">Efecto de pulso continuo</p>
                      </Card>
                      
                      <Card className="p-4 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 md-animate-rotate text-primary" />
                      </Card>
                      
                      <Card className="md-shine p-4">
                        <p className="md-body-medium">Shine Effect</p>
                        <p className="md-body-small text-muted-foreground">Efecto de brillo que recorre el elemento</p>
                      </Card>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4">
                  <p>Activa el modo Material para ver las animaciones de Material Design 3.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialDesignDemo;
