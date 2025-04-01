
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import DesignSystemTabs from '@/features/design/components/DesignSystemTabs';
import { DesignSystemProvider, useDesignSystem } from '@/contexts/DesignSystemContext';
import { Button } from '@/components/ui/button';
import { Undo2, Save, Eye, Paintbrush, PowerOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import type { FeaturesConfig } from '@/contexts/features/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Componente para el switch de activación/desactivación del sistema de diseño
const DesignSystemToggle: React.FC = () => {
  const { designFeatureEnabled, toggleDesignFeature, isLoading } = useDesignSystem();
  
  const handleToggle = async () => {
    try {
      await toggleDesignFeature(!designFeatureEnabled);
      toast.success(designFeatureEnabled 
        ? 'Sistema de Diseño desactivado correctamente' 
        : 'Sistema de Diseño activado correctamente'
      );
      
      // Recargar la página para aplicar los cambios
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error toggling design system:', error);
      toast.error('Error al cambiar el estado del Sistema de Diseño');
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5 text-primary" />
            <CardTitle>Sistema de Diseño</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="design-system-toggle" className="text-sm">
              {designFeatureEnabled ? 'Activado' : 'Desactivado'}
            </Label>
            <Switch
              id="design-system-toggle"
              checked={designFeatureEnabled}
              onCheckedChange={handleToggle}
              disabled={isLoading}
            />
          </div>
        </div>
        <CardDescription>
          Controla la disponibilidad del sistema de diseño para toda la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`flex items-center gap-4 p-4 rounded-lg ${designFeatureEnabled ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200' : 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'}`}>
          {designFeatureEnabled ? (
            <>
              <Paintbrush className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">El Sistema de Diseño está habilitado</p>
                <p className="text-sm opacity-80">
                  Los cambios que realices afectarán a toda la plataforma. Usa las opciones de vista previa antes de guardar.
                </p>
              </div>
            </>
          ) : (
            <>
              <PowerOff className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="font-medium">El Sistema de Diseño está deshabilitado</p>
                <p className="text-sm opacity-80">
                  Los usuarios no podrán realizar cambios en el diseño de la plataforma hasta que lo actives.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const DesignSystemContent: React.FC = () => {
  const { theme, saveTheme, resetTheme, isPreviewing, endPreview, isLoading, designFeatureEnabled } = useDesignSystem();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveTheme(theme);
      
      // Recargar la página para aplicar los cambios
      toast.success('Cambios guardados. Recargando la página...');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Error al guardar la configuración de diseño');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleReset = async () => {
    try {
      setIsSaving(true);
      await resetTheme();
      
      // Recargar la página para aplicar los cambios
      toast.success('Configuración restablecida. Recargando la página...');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error resetting theme:', error);
      toast.error('Error al restablecer la configuración de diseño');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancelPreview = () => {
    endPreview();
    toast.info('Vista previa cancelada');
  };
  
  const handleForceRefresh = () => {
    window.location.reload();
    toast.info('Recargando la página...');
  };
  
  return (
    <div className="space-y-6">
      <DesignSystemToggle />
      
      {designFeatureEnabled && (
        <>
          {isPreviewing && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4 dark:bg-yellow-900/20 dark:border-yellow-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-yellow-800 dark:text-yellow-300">
                    Estás viendo una vista previa del diseño. Los cambios no se han guardado.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancelPreview}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Aplicar Cambios
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleForceRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Recargar página
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isSaving || isLoading}
                className="gap-2"
              >
                <Undo2 className="h-4 w-4" />
                Restablecer
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving || isLoading || !isPreviewing}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
          
          <DesignSystemTabs />
        </>
      )}
    </div>
  );
};

const DesignSystem: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  
  useEffect(() => {
    // Verificar que los estilos estén cargados
    console.log('Design System page loaded, checking styles');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (!html.classList.contains(currentTheme)) {
      console.log('Fixing theme class:', currentTheme);
      html.classList.remove('light', 'dark', 'futuristic');
      html.classList.add(currentTheme);
    }
  }, []);
  
  return (
    <AdminPageLayout
      title="Sistema de Diseño"
      subtitle="Administra el diseño y estilos de la plataforma"
    >
      <DesignSystemProvider>
        <DesignSystemContent />
      </DesignSystemProvider>
    </AdminPageLayout>
  );
};

export default DesignSystem;
