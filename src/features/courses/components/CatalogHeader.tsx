
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CatalogHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Catálogo de Cursos</h1>
        <p className="text-muted-foreground">
          Explora nuestros cursos y comienza a aprender hoy mismo
        </p>
      </div>
      <div className="relative mt-4 md:mt-0 md:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar cursos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};
