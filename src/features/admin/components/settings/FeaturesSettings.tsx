
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  ToggleRight, 
  Users, 
  BookOpen, 
  Medal, 
  Award, 
  Route, 
  Edit, 
  MousePointer, 
  BarChart3, 
  Bot, 
  Paintbrush, 
  Loader2,
  Bell,
  Globe,
  LockKeyhole,
  Shield,
  Search,
  UserCog,
  CreditCard,
  FileText,
  LineChart,
  Palette
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { Badge } from '@/components/ui/badge';
import { useLocation, useNavigate } from 'react-router-dom';

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
  beta?: boolean;
  coming_soon?: boolean;
  toggle?: (value: boolean) => void;
  category: 'core' | 'module' | 'security' | 'ui' | 'content';
  menuPath?: string; // Ruta del menú asociada
}

interface FeaturesSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const FeaturesSettings: React.FC<FeaturesSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading
}) => {
  const { designFeatureEnabled, toggleDesignFeature } = useDesignSystem();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const navigate = useNavigate();
  const location = useLocation();

  // Lista completa de funcionalidades del sistema
  const allFeatures: Feature[] = [
    // Características básicas de la plataforma
    {
      id: 'design_system',
      name: 'Sistema de Diseño',
      description: 'Personalización visual y temas personalizados',
      enabled: designFeatureEnabled,
      icon: <Paintbrush className="h-5 w-5" />,
      toggle: toggleDesignFeature,
      category: 'core',
      menuPath: '/admin/design'
    },
    {
      id: 'theme_switcher',
      name: 'Selector de temas',
      description: 'Permite a los usuarios cambiar entre tema claro y oscuro',
      enabled: featuresConfig.enableThemeSwitcher || false,
      icon: <ToggleRight className="h-5 w-5" />,
      toggle: (value: boolean) => onToggleFeature('enableThemeSwitcher', value),
      category: 'ui'
    },
    {
      id: 'multi_language',
      name: 'Soporte multilenguaje',
      description: 'Habilita el soporte para múltiples idiomas',
      enabled: featuresConfig.enableMultiLanguage || false,
      icon: <Globe className="h-5 w-5" />,
      toggle: (value: boolean) => onToggleFeature('enableMultiLanguage', value),
      category: 'core'
    },
    {
      id: 'notifications',
      name: 'Notificaciones Globales',
      description: 'Habilita el sistema de notificaciones en la plataforma',
      enabled: featuresConfig.enableNotifications || false,
      icon: <Bell className="h-5 w-5" />,
      toggle: (value: boolean) => onToggleFeature('enableNotifications', value),
      category: 'core'
    },
    // Módulos principales
    {
      id: 'community',
      name: 'Comunidad',
      description: 'Habilita funciones sociales como grupos, foros y publicaciones',
      enabled: true,
      icon: <Users className="h-5 w-5" />,
      category: 'module',
      menuPath: '/community'
    },
    {
      id: 'finances',
      name: 'Pagos/Finanzas',
      description: 'Activa procesamiento de pagos, suscripciones y facturación',
      enabled: true,
      icon: <CreditCard className="h-5 w-5" />,
      category: 'module',
      menuPath: '/admin/billing'
    },
    {
      id: 'learning_paths',
      name: 'Rutas de Aprendizaje',
      description: 'Crea secuencias estructuradas de cursos y contenido',
      enabled: true,
      icon: <Route className="h-5 w-5" />,
      category: 'module',
      menuPath: '/admin/learning-paths'
    },
    {
      id: 'courses',
      name: 'Cursos',
      description: 'Sistema de gestión de cursos y lecciones',
      enabled: true,
      icon: <BookOpen className="h-5 w-5" />,
      category: 'module',
      menuPath: '/admin/courses'
    },
    {
      id: 'analytics',
      name: 'Analíticas',
      description: 'Panel de analíticas y reportes',
      enabled: true,
      icon: <LineChart className="h-5 w-5" />,
      category: 'module',
      menuPath: '/admin/analytics'
    },
    {
      id: 'content_management',
      name: 'Gestión de Contenido',
      description: 'Sistema para administrar páginas y contenido del sitio',
      enabled: true,
      icon: <FileText className="h-5 w-5" />,
      category: 'content',
      menuPath: '/admin/pages'
    },
    // Funcionalidades interactivas
    {
      id: 'inline_editing',
      name: 'Edición Inline',
      description: 'Edita contenido directamente sin cambiar de página',
      enabled: true,
      icon: <Edit className="h-5 w-5" />,
      category: 'ui'
    },
    {
      id: 'drag_drop_reordering',
      name: 'Reordenamiento Drag & Drop',
      description: 'Arrastra y suelta para reorganizar contenido',
      enabled: true,
      icon: <MousePointer className="h-5 w-5" />,
      category: 'ui'
    },
    {
      id: 'onboarding_tutorial',
      name: 'Tutorial de Onboarding',
      description: 'Guía paso a paso para nuevos usuarios',
      enabled: featuresConfig.enableOnboardingSystem || false,
      icon: <Search className="h-5 w-5" />,
      toggle: (value: boolean) => onToggleFeature('enableOnboardingSystem', value),
      category: 'ui'
    },
    // Funcionalidades de seguridad
    {
      id: 'role_management',
      name: 'Gestión de Roles',
      description: 'Sistema de roles y permisos para usuarios',
      enabled: featuresConfig.enableRoleManagement || false,
      icon: <UserCog className="h-5 w-5" />,
      toggle: (value: boolean) => onToggleFeature('enableRoleManagement', value),
      category: 'security',
      menuPath: '/admin/roles'
    },
    {
      id: 'social_login',
      name: 'Registro con redes sociales',
      description: 'Permite iniciar sesión con Google, Facebook, etc.',
      enabled: false,
      icon: <Users className="h-5 w-5" />,
      category: 'security'
    },
    {
      id: 'multi_factor_auth',
      name: 'Autenticación de múltiples factores',
      description: 'Requiere verificación adicional durante el inicio de sesión',
      enabled: false,
      icon: <Shield className="h-5 w-5" />,
      category: 'security',
      coming_soon: true
    },
    {
      id: 'password_policies',
      name: 'Políticas de contraseñas',
      description: 'Establece requisitos mínimos para contraseñas seguras',
      enabled: false,
      icon: <LockKeyhole className="h-5 w-5" />,
      category: 'security'
    },
    // Funcionalidades en desarrollo
    {
      id: 'gamification',
      name: 'Gamificación',
      description: 'Puntos, insignias, niveles y tablas de clasificación',
      enabled: false,
      icon: <Medal className="h-5 w-5" />,
      category: 'module',
      coming_soon: true
    },
    {
      id: 'certificates',
      name: 'Certificados',
      description: 'Emite certificados digitales para cursos completados',
      enabled: false,
      icon: <Award className="h-5 w-5" />,
      category: 'module',
      coming_soon: true
    },
    {
      id: 'advanced_analytics',
      name: 'Analíticas Avanzadas',
      description: 'Estadísticas detalladas y reportes avanzados',
      enabled: false,
      icon: <BarChart3 className="h-5 w-5" />,
      category: 'module',
      coming_soon: true
    },
    {
      id: 'ai_assistant',
      name: 'Asistente IA',
      description: 'Integración de asistentes inteligentes en la plataforma',
      enabled: false,
      icon: <Bot className="h-5 w-5" />,
      category: 'module',
      coming_soon: true
    }
  ];

  // Filtrar características por categoría
  const getFilteredFeatures = () => {
    if (activeCategory === 'all') {
      return allFeatures;
    }
    return allFeatures.filter(feature => feature.category === activeCategory);
  };

  const filteredFeatures = getFilteredFeatures();

  // Obtener categorías únicas para los filtros
  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'core', name: 'Básicas' },
    { id: 'module', name: 'Módulos' },
    { id: 'security', name: 'Seguridad' },
    { id: 'ui', name: 'Interfaz' },
    { id: 'content', name: 'Contenido' }
  ];

  // Gestionar el cambio de estado de una funcionalidad
  const handleToggleFeature = (feature: Feature, value: boolean) => {
    if (feature.toggle) {
      feature.toggle(value);
    } else {
      console.log(`Toggle feature ${feature.id} to ${value}`);
      // Simular el cambio para demostración
      toast.success(`Funcionalidad "${feature.name}" ${value ? 'activada' : 'desactivada'}`);

      // Si la funcionalidad tiene una ruta de menú asociada, mostrar alerta adicional
      if (feature.menuPath) {
        if (!value) {
          toast.info(`El elemento de menú "${feature.name}" será ocultado`);
        } else {
          toast.info(`El elemento de menú "${feature.name}" será visible`);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeCategory === category.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tarjetas de características */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFeatures.map((feature) => (
          <div 
            key={feature.id}
            className="flex flex-col justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  {feature.icon}
                </div>
                <div className="flex items-center space-x-2">
                  {feature.beta && (
                    <Badge variant="outline" className="text-xs">Beta</Badge>
                  )}
                  {feature.coming_soon && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border-blue-200">Próximamente</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">{feature.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              {feature.menuPath && (
                <button 
                  onClick={() => navigate(feature.menuPath as string)}
                  className="text-xs text-primary hover:underline"
                >
                  Configurar
                </button>
              )}
              
              <div className="flex items-center ml-auto">
                {isLoading && (
                  <Loader2 className="h-3 w-3 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch 
                  checked={feature.enabled} 
                  disabled={feature.coming_soon || isLoading}
                  onCheckedChange={(checked) => handleToggleFeature(feature, checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSettings;
