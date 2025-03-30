
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CourseSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const CourseSearchBar: React.FC<CourseSearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar cursos..."
        className="pl-8 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default CourseSearchBar;
