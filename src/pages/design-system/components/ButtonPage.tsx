
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, PlusCircle, Trash, ChevronRight, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ButtonPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="flex items-center mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-2" 
          onClick={() => navigate('/design-system')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold">Button</h1>
      </div>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Descripción</CardTitle>
            <CardDescription>
              El componente Button permite a los usuarios realizar acciones y tomar decisiones con un solo clic o toque.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Los botones le comunican a los usuarios las acciones que pueden realizar. Son normalmente colocados en UI como formularios, diálogos, modales y tarjetas.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Vista previa</TabsTrigger>
            <TabsTrigger value="code">Código</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 border rounded-md mt-2">
            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Variantes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="default">Default Explicit</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Material Design Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="filled">Filled</Button>
                  <Button variant="tonal">Tonal</Button>
                  <Button variant="text">Text</Button>
                  <Button variant="outlinedMaterial">Outlined</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Tamaños</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg">Large</Button>
                  <Button>Default</Button>
                  <Button size="sm">Small</Button>
                  <Button size="icon"><PlusCircle className="h-4 w-4" /></Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Estados</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                  <Button>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Con iconos</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline">
                    Login
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code" className="p-4 border rounded-md mt-2 bg-slate-950 text-white overflow-auto">
            <pre className="text-sm">
{`// Importación
import { Button } from "@/components/ui/button"

// Ejemplos básicos
<Button>Default</Button>
<Button variant="default">Default Explicit</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Material Design Variants
<Button variant="filled">Filled</Button>
<Button variant="tonal">Tonal</Button>
<Button variant="text">Text</Button>
<Button variant="outlinedMaterial">Outlined</Button>

// Tamaños
<Button size="lg">Large</Button>
<Button>Default</Button>
<Button size="sm">Small</Button>
<Button size="icon"><PlusCircle className="h-4 w-4" /></Button>

// Estados
<Button disabled>Disabled</Button>
<Button>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>

// Con iconos
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Email
</Button>`}
            </pre>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Propiedades</CardTitle>
            <CardDescription>
              API del componente Button
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-auto">
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr className="text-left">
                    <th className="p-2 font-medium">Prop</th>
                    <th className="p-2 font-medium">Tipo</th>
                    <th className="p-2 font-medium">Default</th>
                    <th className="p-2 font-medium">Descripción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-2 align-top">variant</td>
                    <td className="p-2 align-top text-sm">
                      <code className="bg-muted px-1 py-0.5 rounded">
                        'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'filled' | 'tonal' | 'text' | 'outlinedMaterial'
                      </code>
                    </td>
                    <td className="p-2 align-top text-sm"><code>'default'</code></td>
                    <td className="p-2 align-top text-sm">Estilo visual del botón</td>
                  </tr>
                  <tr>
                    <td className="p-2 align-top">size</td>
                    <td className="p-2 align-top text-sm">
                      <code className="bg-muted px-1 py-0.5 rounded">
                        'default' | 'sm' | 'lg' | 'icon'
                      </code>
                    </td>
                    <td className="p-2 align-top text-sm"><code>'default'</code></td>
                    <td className="p-2 align-top text-sm">Tamaño del botón</td>
                  </tr>
                  <tr>
                    <td className="p-2 align-top">asChild</td>
                    <td className="p-2 align-top text-sm">
                      <code className="bg-muted px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="p-2 align-top text-sm"><code>false</code></td>
                    <td className="p-2 align-top text-sm">Renderiza el componente como un hijo, aplicando los estilos a él</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm">
            <p>El componente Button también acepta todos los atributos HTML estándar para el elemento button.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ButtonPage;
