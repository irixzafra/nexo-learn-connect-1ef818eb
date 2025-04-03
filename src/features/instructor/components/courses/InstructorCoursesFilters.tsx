
import React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface InstructorCoursesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const InstructorCoursesFilters: React.FC<InstructorCoursesFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
      <div className="relative w-full sm:w-auto sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cursos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="published">Publicados</TabsTrigger>
          <TabsTrigger value="drafts">Borradores</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
