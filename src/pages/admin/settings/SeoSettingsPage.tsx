
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Globe, Zap, FileText, BarChart3 } from 'lucide-react';
import SEOManager from '@/components/admin/seo/SEOManager';
import { useFeatures } from '@/contexts/features/FeaturesContext';

const SeoSettingsPage: React.FC = () => {
  const { featuresConfig } = useFeatures();
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configuración SEO</h1>
          <p className="text-muted-foreground mt-1">
            Administra la configuración SEO global y por página
          </p>
        </div>
        
        <Button variant="outline">
          <BarChart3 className="h-4 w-4 mr-2" />
          Ver Analíticas SEO
        </Button>
      </div>
      
      <Tabs defaultValue="global">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Configuración Global
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Páginas
          </TabsTrigger>
          <TabsTrigger value="indexing" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Indexación
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="global">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SEOManager 
                pageUrl="/" 
                pageName="Página Principal"
              />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Estado SEO
                  </CardTitle>
                  <CardDescription>
                    Resumen del estado SEO de tu sitio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Puntuación global:</span>
                      <span className="font-medium text-green-600">85/100</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Meta títulos optimizados:</span>
                        <span>90%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Meta descripciones optimizadas:</span>
                        <span>75%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>URLs amigables:</span>
                        <span>100%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span>Imágenes optimizadas:</span>
                        <span>65%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Características SEO</CardTitle>
                  <CardDescription>
                    Funciones SEO habilitadas en tu plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <div className={`w-3 h-3 rounded-full mr-2 ${featuresConfig.enableHreflangTags ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Soporte multi-idioma (hreflang)</span>
                    </li>
                    
                    <li className="flex items-center text-sm">
                      <div className={`w-3 h-3 rounded-full mr-2 ${featuresConfig.enableStructuredData ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Datos estructurados (Schema.org)</span>
                    </li>
                    
                    <li className="flex items-center text-sm">
                      <div className={`w-3 h-3 rounded-full mr-2 ${featuresConfig.enableRegionalContent ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Contenido regional</span>
                    </li>
                    
                    <li className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                      <span>URLs canónicas</span>
                    </li>
                    
                    <li className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                      <span>Meta tags redes sociales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>SEO por Página</CardTitle>
              <CardDescription>
                Configuración SEO para páginas individuales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">Página</th>
                      <th scope="col" className="px-6 py-3">URL</th>
                      <th scope="col" className="px-6 py-3">Puntuación SEO</th>
                      <th scope="col" className="px-6 py-3">Estado</th>
                      <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">Página Principal</td>
                      <td className="px-6 py-4">/</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-green-600 font-medium">90/100</span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Indexada</span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">Catálogo de Cursos</td>
                      <td className="px-6 py-4">/courses</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-amber-600 font-medium">75/100</span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Indexada</span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">Sobre Nosotros</td>
                      <td className="px-6 py-4">/about-us</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-red-600 font-medium">60/100</span>
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendiente</span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm">Editar</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="indexing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Indexación</CardTitle>
                <CardDescription>
                  Controla cómo los motores de búsqueda indexan tu sitio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="font-medium">Archivo robots.txt</label>
                  <textarea 
                    className="w-full p-2 border rounded-md font-mono text-sm h-48"
                    defaultValue={`User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
`}
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button>Guardar robots.txt</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sitemap XML</CardTitle>
                <CardDescription>
                  Configura el sitemap para una mejor indexación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="font-medium">URL del Sitemap:</p>
                  <p className="text-blue-600 underline">https://nexolearning.com/sitemap.xml</p>
                </div>
                
                <div className="space-y-2">
                  <label className="font-medium">Opciones del Sitemap</label>
                  
                  <div className="space-y-2 ml-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="include-courses" className="mr-2" defaultChecked />
                      <label htmlFor="include-courses">Incluir páginas de cursos</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="include-blog" className="mr-2" defaultChecked />
                      <label htmlFor="include-blog">Incluir artículos del blog</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="include-categories" className="mr-2" defaultChecked />
                      <label htmlFor="include-categories">Incluir páginas de categorías</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="include-authors" className="mr-2" defaultChecked />
                      <label htmlFor="include-authors">Incluir páginas de instructores</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline">Vista previa del Sitemap</Button>
                  <Button>Regenerar Sitemap</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoSettingsPage;
