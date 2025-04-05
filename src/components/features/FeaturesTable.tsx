
import React, { useState } from 'react';
import { GlobalDataTable } from '@/components/global-table';
import { useToast } from '@/components/ui/use-toast';
import { Feature } from '@/data/features';
import { createFeatureColumns } from './FeatureColumns';
import { FeatureDrawer } from './FeatureDrawer';
import { FeatureEmptyState } from './FeatureEmptyState';

interface FeaturesTableProps {
  features: Feature[];
}

export const FeaturesTable: React.FC<FeaturesTableProps> = ({ features }) => {
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const columns = createFeatureColumns();

  const handleCreate = () => {
    setSelectedFeature(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setIsLoading(true);
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      toast({
        title: "Estado actualizado",
        description: `La funcionalidad ha cambiado a "${newStatus === 'active' ? 'Activa' : 'Inactiva'}"`,
      });
      
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la funcionalidad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Feature) => {
    setIsLoading(true);
    try {
      if (selectedFeature) {
        toast({
          title: "Funcionalidad actualizada",
          description: "La funcionalidad ha sido actualizada correctamente",
        });
      } else {
        toast({
          title: "Funcionalidad creada",
          description: "La funcionalidad ha sido creada correctamente",
        });
      }
      
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error al guardar funcionalidad:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la funcionalidad",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalDataTable
        tableName="features"
        title="Funcionalidades del Sistema"
        description="Lista completa de funcionalidades disponibles"
        columns={columns}
        data={features}
        searchPlaceholder="Buscar funcionalidades..."
        searchColumn="name"
        showSearch={true}
        exportable={true}
        exportFilename="funcionalidades-sistema"
        onCreate={handleCreate}
        onEdit={handleEdit}
        createButtonLabel="Agregar Funcionalidad"
        emptyState={<FeatureEmptyState />}
      />
      
      <FeatureDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedFeature={selectedFeature}
        columns={columns}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};
