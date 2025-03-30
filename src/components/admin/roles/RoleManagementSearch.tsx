
import React from 'react';
import { Input } from "@/components/ui/input";

interface RoleManagementSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const RoleManagementSearch: React.FC<RoleManagementSearchProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Buscar por nombre o rol..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default RoleManagementSearch;
