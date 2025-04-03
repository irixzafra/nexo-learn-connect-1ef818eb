
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Globe, Share2, FileText, Settings, BarChart3,
  AlertTriangle, Check, Loader2, Wand2
} from 'lucide-react';
import { toast } from 'sonner';
import { useFeatures } from '@/contexts/features/FeaturesContext';

interface SEOManagerProps {
  pageUrl?: string;
  pageName?: string;
}

const SEOManager: React.FC<SEOManagerProps> = ({ 
  pageUrl = '/example-page', 
  pageName = 'Página de Ejemplo' 
}) => {
  const { toggleExtendedFeature, featuresConfig } = useFeatures();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  
  const [metaTitle, setMetaTitle] = useState(pageName);
  const [metaDescription, setMetaDescription] = useState('Esta es una descripción de ejemplo para la página. Debería ser lo suficientemente descriptiva y contener palabras clave relevantes.');
  const [keywords, setKeywords] = useState('ejemplo, página, nexo learning');
  const [canonicalUrl, setCanonicalUrl] = useState(`https://nexolearning.com${pageUrl}`);
  
  const handleToggleFeature = async (featureId: string, enabled: boolean) => {
    try {
      await toggleExtendedFeature(featureId as any, enabled);
      toast.success(`Función ${enabled ? 'activada' : 'desactivada'} correctamente`);
    } catch (error) {
      console.error('Error toggling feature:', error);
      toast.error('Error al cambiar la configuración');
    }
  };
  
  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    try {
      // Simular análisis SEO
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Análisis SEO completado');
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      toast.error('Error al analizar SEO');
    } finally {
      setAnalyzing(false);
    }
  };
  
  const handleGenerateWithAI = async () => {
    setLoading(true);
    
    try {
      // Simular generación con IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMetaTitle(`${pageName} | Aprende en línea con expertos`);
      setMetaDescription('Descubre cómo puedes mejorar tus habilidades profesionales con nuestros cursos especializados, impartidos por expertos de la industria. Aprende a tu propio ritmo y obtén certificaciones reconocidas.');
      setKeywords('educación en línea, cursos profesionales, certificaciones, aprendizaje, desarrollo profesional');
      
      toast.success('Metadatos SEO generados con IA');
    } catch (error) {
      console.error('Error generating SEO with AI:', error);
      toast.error('Error al generar SEO con IA');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = () => {
    toast.success('Configuración SEO guardada correctamente');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle>Administrador SEO</CardTitle>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analizar
                </>
              )}
            </Button>
          </div>
          <CardDescription>
            Gestiona y optimiza la configuración SEO para "{pageName}"
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="basic">
          <TabsList className="mx-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Básico
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Avanzado
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGenerateWithAI}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generar con IA
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Título Meta</Label>
                  <Input 
                    id="meta-title" 
                    value={metaTitle} 
                    onChange={(e) => setMetaTitle(e.target.value)}
                    maxLength={60}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={`${metaTitle.length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {metaTitle.length}/60 caracteres
                    </span>
                    {metaTitle.length > 40 && metaTitle.length <= 60 ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Longitud óptima
                      </span>
                    ) : metaTitle.length > 60 ? (
                      <span className="text-destructive flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Demasiado largo
                      </span>
                    ) : (
                      <span className="text-amber-500 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Demasiado corto
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Descripción Meta</Label>
                  <Textarea 
                    id="meta-description" 
                    value={metaDescription} 
                    onChange={(e) => setMetaDescription(e.target.value)}
                    maxLength={160}
                    rows={3}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={`${metaDescription.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {metaDescription.length}/160 caracteres
                    </span>
                    {metaDescription.length > 120 && metaDescription.length <= 160 ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Longitud óptima
                      </span>
                    ) : metaDescription.length > 160 ? (
                      <span className="text-destructive flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Demasiado largo
                      </span>
                    ) : (
                      <span className="text-amber-500 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Demasiado corto
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Palabras Clave</Label>
                  <Input 
                    id="keywords" 
                    value={keywords} 
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="palabra1, palabra2, palabra3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separa las palabras clave con comas
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canonical-url">URL Canónica</Label>
                  <Input 
                    id="canonical-url" 
                    value={canonicalUrl} 
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="social">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="og-title">Título Open Graph</Label>
                <Input 
                  id="og-title" 
                  defaultValue={metaTitle}
                  placeholder="Título para compartir en redes sociales"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="og-description">Descripción Open Graph</Label>
                <Textarea 
                  id="og-description" 
                  defaultValue={metaDescription}
                  placeholder="Descripción para compartir en redes sociales"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="og-image">Imagen Open Graph</Label>
                <div className="flex gap-2">
                  <Input 
                    id="og-image" 
                    placeholder="URL de la imagen para redes sociales"
                    defaultValue="https://nexolearning.com/images/og-default.jpg"
                  />
                  <Button variant="outline">Subir</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tamaño recomendado: 1200x630 píxeles
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter-card">Tipo de Twitter Card</Label>
                <select 
                  id="twitter-card" 
                  className="w-full p-2 rounded-md border"
                  defaultValue="summary_large_image"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="app">App</option>
                  <option value="player">Player</option>
                </select>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="advanced">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="structured-data">Datos Estructurados</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar Schema.org markup para esta página
                  </p>
                </div>
                <Switch 
                  id="structured-data"
                  checked={featuresConfig.enableStructuredData || false}
                  onCheckedChange={(checked) => handleToggleFeature('enableStructuredData', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="hreflang">Etiquetas Hreflang</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar soporte para múltiples idiomas en esta página
                  </p>
                </div>
                <Switch 
                  id="hreflang"
                  checked={featuresConfig.enableHreflangTags || false}
                  onCheckedChange={(checked) => handleToggleFeature('enableHreflangTags', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="regional">Contenido Regional</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar contenido específico para regiones
                  </p>
                </div>
                <Switch 
                  id="regional"
                  checked={featuresConfig.enableRegionalContent || false}
                  onCheckedChange={(checked) => handleToggleFeature('enableRegionalContent', checked)}
                />
              </div>
              
              <div className="pt-4">
                <Label htmlFor="robots">Directivas para Robots</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="index" defaultChecked />
                    <label htmlFor="index" className="text-sm">Index</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="follow" defaultChecked />
                    <label htmlFor="follow" className="text-sm">Follow</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="noarchive" />
                    <label htmlFor="noarchive" className="text-sm">noarchive</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="noimageindex" />
                    <label htmlFor="noimageindex" className="text-sm">noimageindex</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 pt-0 flex justify-end">
          <Button onClick={handleSave}>
            Guardar Configuración SEO
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SEOManager;
