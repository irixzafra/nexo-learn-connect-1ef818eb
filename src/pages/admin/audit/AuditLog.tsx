
import React, { useState } from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" className="h-8 gap-1">
        <Calendar className="h-3.5 w-3.5" />
        <span>Seleccionar Fecha</span>
      </Button>
    </div>
  );
};

const AuditLog: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <SectionPageLayout
      header={{
        title: "Registro de Auditoría",
        description: "Consulte las actividades y cambios realizados en el sistema",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex space-x-2">
          <DatePicker onDateChange={handleStartDateChange} />
          <DatePicker onDateChange={handleEndDateChange} />
        </div>
      </div>

      <PageSection
        title="Actividad Reciente"
        description="Últimas acciones realizadas en el sistema"
        variant="card"
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default AuditLog;
