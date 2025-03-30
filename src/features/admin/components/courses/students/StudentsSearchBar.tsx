
import React from 'react';
import { Input } from '@/components/ui/input';

interface StudentsSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  totalStudents: number;
}

const StudentsSearchBar: React.FC<StudentsSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  totalStudents
}) => {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Buscar por nombre..."
        className="max-w-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="text-sm text-muted-foreground">
        Total: <span className="font-semibold">{totalStudents} estudiantes</span>
      </div>
    </div>
  );
};

export default StudentsSearchBar;
