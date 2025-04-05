
import React from 'react';
import { TableDrawer } from '@/components/global-table/TableDrawer';
import { Feature } from '@/data/features';
import { TableColumn } from '@/components/global-table/types';

interface FeatureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFeature: Feature | null;
  columns: TableColumn<Feature>[];
  onSubmit: (data: Feature) => Promise<void>;
  isLoading: boolean;
}

export const FeatureDrawer: React.FC<FeatureDrawerProps> = ({
  isOpen,
  onClose,
  selectedFeature,
  columns,
  onSubmit,
  isLoading
}) => {
  return (
    <TableDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={selectedFeature ? "Editar Funcionalidad" : "Crear Funcionalidad"}
      data={selectedFeature}
      columns={columns}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
