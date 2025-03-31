
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import DesignSystemTabs from '@/features/design/components/DesignSystemTabs';
import { DesignSystemProvider, useDesignSystem } from '@/contexts/DesignSystemContext';
import { Button } from '@/components/ui/button';
import { Undo2, Save } from 'lucide-react';
import { toast } from 'sonner';

const DesignSystemContent: React.FC = () => {
  const { theme, saveTheme, resetTheme, isPreviewing, endPreview, isLoading } = useDesignSystem();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveTheme(theme);
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
  
  return (
    <div className="space-y-6">
      {isPreviewing && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
          <div className="flex items-center justify-between">
            <p className="text-yellow-800">
              Estás viendo una vista previa del diseño. Los cambios no se han guardado.
            </p>
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
      
      <div className="flex justify-end gap-2">
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
      
      <DesignSystemTabs />
    </div>
  );
};

const DesignSystem: React.FC = () => {
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
